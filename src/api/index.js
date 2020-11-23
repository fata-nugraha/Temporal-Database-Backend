const express = require('express')
  , router = express.Router()
  , db = require("../database");

router.use('/api/test', async (req, res) => {
  const query = { babies: 0 };
  const options = {
    sort: { checkin_date: -1 },
  };
  await db.exec(async (collection) => {
    const result = await collection.findOne(query, options);
    await res.send(result)
  });
})

router.use('/api/test2', async (req, res) => {
  const query = { babies: 0 };
  const options = {
    sort: { checkin_date: -1 },
  };
  await db.exec(async (collection) => {
    const cursor = await collection.find(query, options).limit(5);
    result = [];
    await cursor.forEach((data)=> result.push(data));
    res.send(result);
  });
})
/*

// C R U D
router.use('/api/find-all', async (req, res) => {
  const query = { };
  const options = {
    sort: { checkin_date: -1 },
  };
  result = await db.find(query, options);
  res.send(result);
})

router.use('/api/get-by-id', async (req, res) => {
  const query = { "id": req.body.booking_id };
  const options = {
  };
  result = await db.find(query, options);
  res.send(result);
})


router.use('/api/insert', async (req, res) => {
  const query = { 
    hotel: req.body.hotel,
    adults: req.body.adults,
    children: req.body.children,
    babies: req.body.babies,
    checkin_date: req.body.checkin_date,
    checkout_date: req.body.checkout_date,
    is_canceled: false
   };
  const options = {
  };
  result = await db.insertOne(query);
  res.send(result);
})
router.use('/api/update', async (req, res) => {
  const query = { 
    hotel: req.body.hotel,
    adults: req.body.adults,
    children: req.body.children,
    babies: req.body.babies,
    checkin_date: req.body.checkin_date,
    checkout_date: req.body.checkout_date,
    is_canceled: false
   };
  result = await db.updateOne(
    { id:req.body.id },
    { $set: query });
  res.send(result);
})

 // soft delete, update is_canceled & deleted_at
router.use('/api/delete', async (req, res) => {
  const query = { 
    is_canceled: true
   };
  result = await db.updateOne(
    { id:req.body.id },
    { 
      $set: query,
      $currentDate: {deleted_at: true}
    });
  res.send(result);
})

// 1. Hari dimana checkin terbanyak -> max count check_in_date 
// 2. Hari dimana cancel terbanyak
// 3. Jumlah checkin tiap harinya (jadi nnti dibuat slider time gitu, jdi nti tiap dislide, akan berubah trs)
router.use('/api/max_checkin', async (req, res) => {
  const query = { 
   };
  result = await db.max(
    { 
      $match : { "is_canceled": false }
    },
    { 
      "$group" : {_id:"$checkin_date", count:{$sum:1}}
    },
    {
      $sort : {count : -1}
    },
    {});
  res.send(result);
})

router.use('/api/max_cancel', async (req, res) => {
  const query = { 
   };
  result = await db.max(
    { 
      $match : { "is_canceled": true }
    },
    { 
      "$group" : {_id:"$checkin_date", count:{$sum:1}}
    },
    {
      $sort : {count : -1}
    },
    {});
  res.send(result);
})

router.use('/api/count_checkin', async (req, res) => {
  const query = { 
    checkin_date: req.body.checkin_date
   };
  result = await db.aggregate(
    { 
      $match : { "checkin_date": req.body.checkin_date }
    },
    { 
      "$group" : {_id:"$checkin_date", count:{$sum:1}}
    });
  res.send(result);
})

// X sebelum Y (preceed)

router.use('/api/preceed', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
  objectA = await db.findOne(query);
  result = await db.aggregate(
    [
    { 
      $match : { "checkin_date": { $gt: objectA.checkout_date } }
    }
  ]);
  console.log(result)
  res.send(result);
})

router.use('/api/preceeded-by', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
   objectA = await db.findOne(query);

  result = await db.aggregate(
    [
    { 
      $match : { "checkout_date": { $lt: objectA.checkin_date } }
    }]);
  res.send(result);
})
// X berakhir saat Y dimulai (meets)
router.use('/api/meets', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
   objectA = await db.findOne(query);

  result = await db.aggregate([
    { 
      $match : { "checkin_date": objectA.checkout_date }
    }]);
  res.send(result);
})

router.use('/api/met-by', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
   objectA = await db.findOne(query);

  result = await db.aggregate([
    { 
      $match : { "checkout_date": objectA.checkin_date }
    }]);
  res.send(result);
})
// X melewati Y (overlaps)

// X mulai sama dengan Y (starts)

router.use('/api/starts', async (req, res) => {
  const query = { 
    id: parseInt(req.query.id)
  };

  async function getElement(query){
      let result = null
      await db.exec(async (collection) =>{
        result = await collection.findOne(query);
      })
      return result;
  }  
  
  const item = await getElement(query);
  await db.exec(async (collection) => {
    const data_final = await collection.find({
      checkin_date: {
        $gt: item.checkin_date
      },
    }).limit(10);
    result = [];
    await data_final.forEach((data)=> result.push(data));
    console.log(result);
    res.send(result);
  });  
})

// X saat Y (during - contains)

// X berakhir sama dengan Y (ends - finished by)
router.use('/api/ends', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
   objectA = await db.findOne(query);

  result = await db.aggregate([
    { 
      $match : { 
        "checkin_date": { $lt: objectA.checkin_date },
        "checkout_date":objectA.checkout_date
       }
    }]);
  res.send(result);
})

router.use('/api/finished-by', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
   objectA = await db.findOne(query);

  result = await db.aggregate([
    { 
      $match : { 
        "checkin_date": { $gt: objectA.checkin_date },
        "checkout_date": objectA.checkout_date 
       }
    }]);
  res.send(result);
})
// X sama dengan Y (equals)
router.use('/api/equals', async (req, res) => {
  const query = { 
    id: req.body.id
   };
  
  objectA = await db.find(query);
  result = await db.aggregate([
    { 
      $match : { 
        "checkin_date":  objectA.checkin_date,
        "checkout_date": objectA.checkout_date 
     }
    }]);
  res.send(result);
})

*/
// // Jofi
// router.use('/api/ends', async (req, res) => {
//   // Contoh querynya /api/end?id=10
//   const query = { 
//     id: parseInt(req.query.id)
//   };

//   async function getElement(query){
//       let result = null
//       await db.exec(async (collection) =>{
//         result = await collection.findOne(query);
//       })
//       return result;
//   }  
  
//   const item = await getElement(query);
//   await db.exec(async (collection) => {
//     const data_final = await collection.findOne({
//       checkin_date: {
//         $lt: item.checkin_date
//       },
//       checkout_date: item.checkout_date
//     })
//     console.log(data_final)
//     res.send(data_final)
//   });  
// })

// Jofi
// router.use('/api/preceed', async (req, res) => {
//   const query = { 
//     id: parseInt(req.query.id)
//   };

//   async function getElement(query){
//       let result = null
//       await db.exec(async (collection) =>{
//         result = await collection.findOne(query);
//       })
//       return result;
//   }  
  
//   const item = await getElement(query);
//   await db.exec(async (collection) => {
//     const data_final = await collection.find({
//       checkin_date: {
//         $gt: item.checkout_date
//       },
//     }).limit(10);
//     result = [];
//     await data_final.forEach((data)=> result.push(data));
//     console.log(result);
//     res.send(result);
//   });  
// })
module.exports = router