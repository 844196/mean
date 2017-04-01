var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
var router = require('./Routes')
var db = require('../config/db')
var errorHandler = require('./Middlewares/ErrorHandler')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(router)

// error handler
app.use(errorHandler.jsonParseErrorHandler)
app.use(errorHandler.schemaValidationErrorHandler)
app.use(errorHandler.notFoundErrorHandler)
app.use((req, res) => {
  res.sendStatus(404)
})

module.exports = app
