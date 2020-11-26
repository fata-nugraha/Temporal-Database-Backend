const Router = require('express-promise-router')
const allen = require('../api/allen.js')
const queries = require('../api/queries.js')
const router = new Router()
module.exports = router

router.get('/api/project', queries.project)
router.get('/api/select', queries.select)
router.get('/api/union', queries.union)
router.get('/api/tempdiff', queries.tempdiff)

// Join on overlapping valid times
router.get('/api/tempjoin', queries.tempjoin)

// Assuming transaction time = checkin_date and 1 chronon = 1 day
router.get('/api/transaction-timeslice', queries.transactiontimeslice)

// Returns transaction time (checkin_date is this case) and 1 chronon = 1 day
router.get('/api/valid-timeslice', queries.validtimeslice)

router.post('/api/insert', queries.insert)
router.post('/api/modify', queries.modify)
router.delete('/api/delete', queries.delete)


// Allen's 13 queries

// Start (Find all X which starts with Y; Y is selected_visitor)
router.get('/api/start', allen.start)

// Started by (Find all Y which started-by X; X is selected_visitor)
router.get('/api/started-by', allen.started_by)

// Finish (Find all X which finish with Y; Y is selected_visitor)
router.get('/api/finish', allen.finish)

// Finished-by (Find all Y which finished-by X; X is selected_visitor)
router.get('/api/finished-by', allen.finished_by)

// Contains (Find all X which contains Y; Y is selected_visitor)
router.get('/api/contains', allen.contains)

// Overlaps (Find all X which overlaps Y; Y is selected_visitor)
router.get('/api/overlaps', allen.overlaps)

// Before (Find all X which before Y; Y is selected_visitor)
router.get('/api/before', allen.before)

// After (Find all X which after Y; Y is selected_visitor)
router.get('/api/after', allen.after)

// Meets (Find all X which meets Y; Y is selected_visitor)
router.get('/api/meets', allen.meets)

// Met by (Find all X which met by Y; Y is selected_visitor)
router.get('/api/met-by', allen.met_by)

// Overlapped by (Find all X which overlapped by Y; Y is selected_visitor)
router.get('/api/overlapped-by', allen.overlapped_by)

// During (Find all X which during Y; Y is selected_visitor)
router.get('/api/during', allen.during)

// Equals (Find all X which equals Y; Y is selected_visitor)
router.get('/api/equals', allen.equals)

