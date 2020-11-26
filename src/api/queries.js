const db = require('../database')

exports.select = async (req, res) => {
  let id = req.query.id
  let query  = 
      ` SELECT * FROM visitor WHERE id = $1`
  const { rows } = await db.query(query, [id]).catch(e => console.error(e.stack))
  res.json(rows)
}
