var express = require('express')
var router = express.Router()
var Todos = require('./Todos')

router.use('/api/v1/todos', Todos)

module.exports = router
