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

// 1. Projection
// 2. Selection
// 3. Union
// 4. Temporal Difference
// 5. Temporal Join
// 6. Transaction-Timeslice
// 7. Insert
// 8. ts_update
// 9. delete
// 10. modify
// 11. preceed
// 12. preceeded by
// 13. start
router.get('/api/start', async (req, res) => {
  let id = req.query.id
  let query  = `select * from visitor where checkin_date >= (select checkin_date from visitor where id = $1)`;
  db.query(query, [id])
  .then(result => res.status(200).send(result.rows))
  .catch(error => console.error(error.stack))
})
// 14. started by
// 15. meets
// 16. met by
// 17. overlaps
// 18. overlapped by
// 19. during
// 20. contains
// 21. finish
// 22. finished by
// 23. equal
router.get('/api/equals', async (req, res) => {
  let id = req.query.id
  let query  = `select * from (select checkin_date, checkout_date from visitor where id = $1) as visitorA, visitor where visitor.checkin_date = visitorA.checkin_date and visitor.checkout_date = visitorA.checkout_date and id != $1`;
  db.query(query, [id])
  .then(result => res.status(200).send(result.rows))
  .catch(error => console.error(error.stack))
})
// 24. max checkin
router.get('/api/max-checkin', async (req, res) => {
  let query  = `select checkin_date, (count(checkin_date)) as count_checkin from visitor where is_canceled= false group by checkin_date order by count_checkin desc limit 1`;
  const { rows } = await db.query(query);
  res.send(rows);
})
// 25. max canceled
router.get('/api/max-canceled', async (req, res) => {
  let query  = `select checkin_date, (count(checkin_date)) as count_checkin from visitor where is_canceled= true group by checkin_date order by count_checkin desc limit 1`;
  const { rows } = await db.query(query);
  res.send(rows);
})
// 26. checkin suatu tanggal
router.get('/api/count-checkin', async (req, res) => {
  let checkin_date = req.query.checkin_date
  let query  = `select count(id) from visitor where checkin_date = $1 and is_canceled = false`;
  db.query(query, [checkin_date])
  .then(result => res.status(200).send(result.rows))
  .catch(error => console.error(error.stack))
})

//---------------------------------------------------
router.get('/api/findbyid', async (req, res) => {
  let id = req.query.id
  let query  = `select * from visitor where id = $1`;
  db.query(query, [id])
  .then(result => res.status(200).send(result.rows))
  .catch(error => console.error(error.stack))
})
router.get('/api/find', async (req, res) => {
  let query  = `select * from visitor limit 10`;
  const { rows } = await db.query(query);
  res.send(rows);
})

