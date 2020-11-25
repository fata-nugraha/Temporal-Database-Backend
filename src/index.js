require('dotenv').config()
const express = require('express')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , app = express()
  , port = process.env.PORT || 3001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(require('./api'))

app.listen(port, () => console.log(`Listening on port ${port}`))