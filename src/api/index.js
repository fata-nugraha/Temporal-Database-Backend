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

module.exports = router