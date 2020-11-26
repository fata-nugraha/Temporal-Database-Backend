const db = require('../database')

exports.project = async (req, res) => {
  //columns : name, parent, babies etc
  let columns = req.query.columns
  let query  = (` SELECT ${columns}, checkin_date, checkout_date FROM visitor`);
  const { rows } = await db.query(query).catch(e => console.error(e.stack))
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

exports.select = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}

//waktu dimana orang tersebut checkin tapi gaada manager yang jaga di waktu tersebut
exports.tempdiff = async (req, res) => {
  let name = req.query.name
  let query  = 
      ` SELECT checkin_date, checkout_date FROM visitor WHERE name = $1 EXCEPT SELECT checkin_date, checkout_date FROM manager `
  const { rows } = await db.query(query, [name]).catch(e => console.error(e.stack))
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

exports.timeslice = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
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

exports.modify = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}