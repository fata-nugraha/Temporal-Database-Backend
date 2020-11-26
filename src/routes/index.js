const Router = require('express-promise-router')
const allen = require('../api/allen.js')
const queries = require('../api/queries.js')
const router = new Router()
module.exports = router

// Select

router.get('/api/select', queries.select)



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