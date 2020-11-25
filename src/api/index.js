const Router = require('express-promise-router')
const db = require('../database')
const router = new Router()
module.exports = router

router.get('/api/test', async (req, res) => {
  const query = 'SELECT * FROM visitor WHERE checkin_date<$1 LIMIT 10';
  const values = ['2016-01-01'];
  const { rows } = await db.query(query, values);
  res.json({ data: rows });
})

// Allen's 13 queries

// Start
router.get('/api/start', async (req, res) => {
  let id = req.query.id
  console.log('id: ', id)
  let query  = 
      ` SELECT * FROM visitor WHERE checkin_date >= (
        SELECT checkin_date from visitor WHERE id = $1
      ) LIMIT 10`;
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})

// Contains (Find all X which contains Y; Y is selected_visitor)
router.get('/api/contains', async (req, res) => {
  let id = req.query.id
  let query = `
      SELECT * FROM visitor, (
        SELECT * FROM visitor
        WHERE id = $1
      ) selected_visitor
      WHERE visitor.checkin_date < selected_visitor.checkin_date
      AND visitor.checkout_date > selected_visitor.checkout_date
      LIMIT 10;`
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})

// Overlaps (Find all X which overlaps Y; Y is selected_visitor)
router.get('/api/overlaps', async (req, res) => {
  let id = req.query.id
  let query = `
      SELECT * FROM visitor, (
        SELECT * FROM visitor
        WHERE id = $1
      ) selected_visitor
      WHERE visitor.checkin_date < selected_visitor.checkin_date
      AND visitor.checkin_date < selected_visitor.checkout_date
      AND visitor.checkout_date > selected_visitor.checkout_date
      LIMIT 10;`
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})