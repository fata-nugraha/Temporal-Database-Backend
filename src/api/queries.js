const db = require('../database')

exports.project = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.select = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.union = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.modify = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.tempdiff = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.select = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.tempjoin = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.transactiontimeslice = async (req, res) => {
  let time = req.query.time
  let query  = 
    ` SELECT
        visitor.id, hotel, adults, children, babies, is_canceled, "name",
        array_agg(generatedtimes ORDER BY generatedtimes) timeseries
      FROM (
        SELECT 
          selected_visitor.id, 
          generate_series(
            selected_visitor.checkin_date,
            selected_visitor.checkout_date,
            '1 day'::interval
          ) generatedtimes 
        FROM (
          SELECT *
          FROM visitor
          WHERE checkin_date = $1
        ) selected_visitor
      ) selected_visitor_timeseries
      JOIN visitor ON selected_visitor_timeseries.id = visitor.id
      GROUP BY visitor.id
      LIMIT 10`
  const { rows } = await db.query(query, [time]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.validtimeslice = async (req, res) => {
  let time = req.query.time
  let query  = 
      ` SELECT * FROM visitor WHERE checkin_date = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.insert = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.update = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.delete = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}
