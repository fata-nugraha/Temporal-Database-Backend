require('dotenv').config()
const express = require('express')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , routes = require('./routes')
  , app = express()
  , port = process.env.PORT || 3001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

app.listen(port, () => console.log(`Listening on port ${port}`))