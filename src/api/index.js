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

// Start (Find all X which starts with Y; Y is selected_visitor)
router.get('/api/start', async (req, res) => {
  let id = req.query.id
  console.log('id: ', id)
  let query  = 
      ` SELECT * FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkin_date = selected_visitor.checkin_date LIMIT 10;`
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})

// Started by (Find all Y which started-by X; X is selected_visitor)
router.get('/api/started-by', async (req, res) => {
  let id = req.query.id
  console.log('id: ', id)
  let query  = 
      ` SELECT * FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
        WHERE visitor.checkin_date = selected_visitor.checkin_date
        AND selected_visitor.checkout_date < visitor.checkout_date LIMIT 10;`
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})

// Finish (Find all X which finish with Y; Y is selected_visitor)
router.get('/api/finish', async (req, res) => {
  let id = req.query.id
  console.log('id: ', id)
  let query  = 
      ` SELECT * FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkout_date = selected_visitor.checkin_date
      AND selected_visitor.checkin_date > visitor.checkin_date LIMIT 10;`
  const { rows } = await db.query(query, [id]).catch(error => console.error(error.stack))
  res.json(rows)
})

// Finished-by (Find all Y which finished-by X; X is selected_visitor)
router.get('/api/finished-by', async (req, res) => {
  let id = req.query.id
  console.log('id: ', id)
  let query  = 
      ` SELECT * FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkout_date = selected_visitor.checkout_date
      AND selected_visitor.checkin_date < visitor.checkout_date LIMIT 10;`
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