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

router.get('/api/start', async (req, res) => {
  let id = req.query.id
  let query  = `select * from visitor where checkin_date >= (select checkin_date from visitor where id = $1)`;
  db.query(query, [id])
  .then(result => res.status(200).send(result.rows))
  .catch(error => console.error(error.stack))
})