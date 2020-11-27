const db = require('../database')

exports.start = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT visitor.* FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkin_date = selected_visitor.checkin_date 
      AND selected_visitor.checkout_date > visitor.checkout_date LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.started_by = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT visitor.* FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
        WHERE visitor.checkin_date = selected_visitor.checkin_date
        AND selected_visitor.checkout_date < visitor.checkout_date LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.finish = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT visitor.* FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkout_date = selected_visitor.checkin_date
      AND selected_visitor.checkin_date > visitor.checkin_date LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.finished_by = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT visitor.* FROM visitor, (SELECT * from visitor where id = $1) as selected_visitor
      WHERE visitor.checkout_date = selected_visitor.checkout_date
      AND selected_visitor.checkin_date < visitor.checkout_date LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.contains = async (req, res) => {
  const id = req.query.id
  const query = `
      SELECT visitor.* FROM visitor, (
        SELECT * FROM visitor
        WHERE id = $1
      ) selected_visitor
      WHERE visitor.checkin_date < selected_visitor.checkin_date
      AND visitor.checkout_date > selected_visitor.checkout_date
      LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.overlaps = async (req, res) => {
  const id = req.query.id
  const query = `
    SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE visitor.checkin_date < selected_visitor.checkin_date
    AND visitor.checkout_date > selected_visitor.checkin_date 
    AND visitor.checkout_date < selected_visitor.checkout_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.before = async (req, res) => {
  const id = req.query.id
  const query  = `
    SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE selected_visitor.checkout_date < visitor.checkin_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.after = async (req, res) => {
  const id = req.query.id
  const query  = `
    SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE visitor.checkout_date < selected_visitor.checkin_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.meets = async (req, res) => {
  const id = req.query.id
  const query  = `
    SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE selected_visitor.checkout_date = visitor.checkin_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.met_by = async (req, res) => {
  const id = req.query.id
  const query  = `
    SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE visitor.checkout_date = selected_visitor.checkin_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.overlapped_by = async (req, res) => {
  const id = req.query.id
  const query  = 
    ` SELECT visitor.* FROM visitor, (
      SELECT * FROM visitor
      WHERE id = $1
    ) selected_visitor
    WHERE visitor.checkin_date > selected_visitor.checkin_date
    AND visitor.checkout_date < selected_visitor.checkin_date 
    AND visitor.checkout_date > selected_visitor.checkout_date
    LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.during = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT visitor.* FROM visitor, (
        SELECT * FROM visitor
        WHERE id = $1
      ) selected_visitor
      WHERE visitor.checkin_date > selected_visitor.checkin_date
      AND visitor.checkout_date < selected_visitor.checkout_date
      LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

exports.equals = async (req, res) => {
  const id = req.query.id
  const query  = 
      ` SELECT * 
      FROM (SELECT checkin_date, checkout_date FROM visitor WHERE id = $1) AS visitorA, visitor 
      WHERE visitor.checkin_date = visitorA.checkin_date 
      AND visitor.checkout_date = visitorA.checkout_date 
      AND id != $1 LIMIT 10`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}