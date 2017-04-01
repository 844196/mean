var express = require('express')
var router = express.Router()
var Todo = require('../Models/Todo')

router.get('/', (req, res, next) => {
  Todo
    .find({})
    .then((entities) => {
      res.status(200).json(entities)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Todo
    .findById(req.params.id)
    .then((entity) => {
      res.status(200).json(entity)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  let entity = new Todo({
    name: req.body.name,
    isDone: req.body.isDone
  })

  entity
    .save()
    .then((createdEntity) => {
      res.status(201).location(`/todos/${createdEntity.id}`).json(createdEntity)
    })
    .catch(next)
})

router.patch('/:id', (req, res, next) => {
  Todo
    .updateByIdAndPatch(req.params.id, req.body)
    .then((updatedEntity) => {
      res.status(200).json(updatedEntity)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Todo
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.sendStatus(204)
    })
    .catch(next)
})

module.exports = router
