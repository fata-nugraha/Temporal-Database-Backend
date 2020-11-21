const express = require('express')
  , router = express.Router()
  , db = require("../database");

router.use('/api/test', async (req, res) => {
  const query = { babies: 0 };
  const options = {
    sort: { checkin_date: -1 },
  };
  result = await db.findOne(query, options);
  res.send(result)
})

router.use('/api/test2', async (req, res) => {
  const query = { babies: 0 };
  const options = {
    sort: { checkin_date: -1 },
  };
  result = await db.find(query, options);
  res.send(result);
})

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
  const query = { id: req.id };
  const options = {
  };
  result = await db.find(query, options);
  res.send(result);
})


router.use('/api/insert', async (req, res) => {
  const query = { 
    hotel: req.hotel,
    adults: req.adults,
    children: req.children,
    babies: req.babies,
    checkin_date: req.checkin_date,
    checkout_date: req.checkout_date,
    is_canceled: false
   };
  const options = {
  };
  result = await db.insertOne(query);
  res.send(result);

})
router.use('/api/update', async (req, res) => {
  const query = { 
    hotel: req.hotel,
    adults: req.adults,
    children: req.children,
    babies: req.babies,
    checkin_date: req.checkin_date,
    checkout_date: req.checkout_date,
    is_canceled: false
   };
  result = await db.updateOne(
    { id:req.id },
    { $set: query });
  res.send(result);
})

// soft delete, update is_canceled & deleted_at
router.use('/api/delete', async (req, res) => {
  const query = { 
    is_canceled: true
   };
  result = await db.updateOne(
    { id:req.id },
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
    checkin_date: req.checkin_date
   };
  result = await db.aggregate(
    { 
      $match : { "is_canceled": false }
    },
    { 
      $project:{ id: "$id", count: {$checkin_date:"$checkin_date"}}
    },
    {
      $sort : {count : -1}
    },
    {
      $limit : 1 
    });
  res.send(result);
})

router.use('/api/max_cancel', async (req, res) => {
  const query = { 
    checkin_date: req.checkin_date
   };
  result = await db.aggregate(
    { 
      $match : { "is_canceled": true }
    },
    { 
      $project:{ id: "$id", count: {$checkin_date:"$checkin_date"}}
    },
    {
      $sort : {count : -1}
    },
    {
      $limit : 1 
    });
  res.send(result);
})

router.use('/api/count_checkin', async (req, res) => {
  const query = { 
    checkin_date: req.checkin_date
   };
  result = await db.aggregate(
    { 
      $match : { "checkin_date": { $e: req.checkin_date } }
    },
    { 
      $count: "checkin_date"
    });
  res.send(result);
})

// X sebelum Y (preceed)
// X berakhir saat Y dimulai (meets)
// X melewati Y (overlaps)
// X mulai sama dengan Y (starts)
// X saat Y (during - contains)
// X berakhir sama dengan Y (ends - finished by)
// X sama dengan Y (equals)

module.exports = router