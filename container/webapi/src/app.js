var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var router = require('./Routes')
var db = require('../config/db')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

module.exports = app
