const Router = require('express-promise-router')
const db = require('../database')
const router = new Router()
module.exports = router

router.get('/api/test', async (req, res) => {
  const query = 'SELECT * FROM visitor WHERE checkin_date<$1 LIMIT 10';
  const values = ['2016-01-01'];
  const { rows } = await db.query(query, values);
  res.send(rows);
})