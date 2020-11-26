const db = require('../database')

exports.project = async (req, res) => {
  const query  = `SELECT id, name, adults, checkin_date, checkout_date FROM visitor`;
  const { rows } = await db.query(query).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.select = async (req, res) => {
  const id = req.query.id 
  const query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.union = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

//waktu dimana orang tersebut checkin tapi gaada manager yang jaga di waktu tersebut
exports.tempdiff = async (req, res) => {
  const name = req.query.name
  const query  = 
      ` SELECT checkin_date, checkout_date FROM visitor WHERE name = $1 EXCEPT SELECT checkin_date, checkout_date FROM manager `
  const { rows } = await db.query(query, [name]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.tempjoin = async ({}, res) => {
  const query  = 
      `
      SELECT *
      FROM (
         (SELECT
            visitor.id, visitor.hotel, visitor.adults, visitor.children,
            visitor.babies, manager.checkin_date "checkin_date", visitor.checkout_date "checkout_date",
            visitor.is_canceled, deleted_at, visitor."name", manager_id, manager."name"
         FROM visitor, manager
         WHERE visitor.checkin_date <= manager.checkin_date
         AND visitor.checkout_date <= manager.checkout_date
         AND visitor.checkout_date >= manager.checkin_date
         LIMIT 10)
         UNION
         (SELECT
            visitor.id, visitor.hotel, visitor.adults, visitor.children,
            visitor.babies, visitor.checkin_date "checkin_date", manager.checkout_date "checkout_date",
            visitor.is_canceled, deleted_at, visitor."name", manager_id, manager."name"
         FROM visitor, manager
         WHERE visitor.checkin_date >= manager.checkin_date
         AND visitor.checkout_date >= manager.checkout_date
         AND manager.checkout_date >= visitor.checkin_date
         LIMIT 10)
      ) joinedtables
      LIMIT 10`
  const { rows } = await db.query(query).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.transactiontimeslice = async (req, res) => {
  const time = req.query.time
  const query  = 
    ` SELECT
        visitor.id, hotel, adults, children, babies, is_canceled, "name",
        array_agg(generatedtimes ORDER BY generatedtimes) valid_times
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
  const time = req.query.time
  const query  = 
      ` SELECT 
          visitor.id, hotel, adults, children, babies, is_canceled, "name",
          checkin_date as transaction_time
        FROM visitor
        WHERE $1 >= checkin_date
        AND $1 <= checkout_date
        LIMIT 10`
  const { rows } = await db.query(query, [time]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.insert = async (req, res) => {
  const values = [
    req.body.hotel,
    req.body.adults,
    req.body.children,
    req.body.babies,
    req.body.checkin_date,
    req.body.checkout_date,
    req.body.name,
  ]
  const query  = 
      ` INSERT INTO visitor
      (hotel, adults, children, babies, checkin_date, checkout_date, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.modify = async (req, res) => {
  const values = [
    req.body.id,
    req.body.hotel,
    req.body.adults,
    req.body.children,
    req.body.babies,
    req.body.checkin_date,
    req.body.checkout_date,
    req.body.name,
  ]
  const query  = 
      ` UPDATE visitor SET 
        hotel = $2,
        adults = $3,
        children = $4,
        babies = $5,
        checkin_date = $6,
        checkout_date = $7,
        name = $8
        WHERE id = $1
      `
  const { rows } = await db.query(query, values).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.delete = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` DELETE FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}
