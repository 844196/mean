var mongoose = require('mongoose')
var Schema = mongoose.Schema
var NotFoundError = require('../Errors/NotFoundError')

var TodoSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
})

TodoSchema.options.toJSON = {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}
TodoSchema.options.strict = true

TodoSchema.statics.getById = (id) => {
  return Todo
    .findById(id)
    .then((entity) => {
      return new Promise((resolve, reject) => {
        (entity === null) ? reject(new NotFoundError()) : resolve(entity)
      })
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        (err.name === 'CastError') ? reject(new NotFoundError()) : reject(err)
      })
    })
}

TodoSchema.statics.updateByIdAndPatch = (id, patch) => {
  return Todo
    .findByIdAndUpdate(
      id,
      {$set: patch},
      {new: true, runValidators: true}
    )
    .then((updatedEntity) => {
      return new Promise((resolve, reject) => {
        (updatedEntity === null) ? reject(new NotFoundError()) : resolve(updatedEntity)
      })
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        (err.name === 'CastError') ? reject(new NotFoundError()) : reject(err)
      })
    })
}

var Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
