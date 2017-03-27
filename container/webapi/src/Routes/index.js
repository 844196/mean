var express = require('express')
var router = express.Router()
var TodoController = require('../Controllers/TodoController.js')

let todoController = new TodoController()

router.get('/api/v1/todos', todoController.getList)
router.get('/api/v1/todos/:id', todoController.get)
router.post('/api/v1/todos', todoController.create)
router.put('/api/v1/todos/:id', todoController.update)
router.delete('/api/v1/todos/:id', todoController.delete)

module.exports = router
