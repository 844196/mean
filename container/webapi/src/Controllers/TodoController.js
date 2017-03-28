var Todo = require('../Models/Todo')

class TodoController
{
  getList(req, res)
  {
    Todo
      .find({})
      .then((entities) => {
        res.status(200).json(entities)
      })
      .catch(TodoController.commonErrorHandler(res))
  }

  get(req, res)
  {
    Todo
      .findById(req.params.id)
      .then((entity) => {
        res.status(200).json(entity)
      })
      .catch(TodoController.commonErrorHandler(res))
  }

  create(req, res)
  {
    let entity = new Todo({
      name: req.body.name,
      isDone: req.body.isDone
    })

    entity
      .save()
      .then((createdEntity) => {
        res.status(201).location(`/todos/${createdEntity.id}`).json(createdEntity)
      })
      .catch(TodoController.commonErrorHandler(res))
  }

  patch(req, res)
  {
    Todo
      .updateByIdAndPatch(req.params.id, req.body)
      .then((updatedEntity) => {
        res.status(200).json(updatedEntity)
      })
      .catch(TodoController.commonErrorHandler(res))
  }

  delete(req, res)
  {
    Todo
      .findByIdAndRemove(req.params.id)
      .then((result) => {
        res.sendStatus(204)
      })
      .catch(TodoController.commonErrorHandler(res))
  }

  static commonErrorHandler(res)
  {
    return (err) => {
      switch (err.name) {
        case 'DocumentNotFound':
          res.status(404).json({'reason': 'ID wrong or data not found'})
          break
        default:
          res.sendStatus(500)
          break
      }
    }
  }
}

module.exports = TodoController
