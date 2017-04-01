var mongoose = require('mongoose')
var Schema = mongoose.Schema
var DocumentNotFoundException = require('../Exceptions/DocumentNotFoundException')

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
        (entity === null) ? reject(new DocumentNotFoundException()) : resolve(entity)
      })
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        (err.name === 'CastError') ? reject(new DocumentNotFoundException()) : reject(err)
      })
    })
}

TodoSchema.statics.updateByIdAndPatch = (id, patch) => {
  return Todo
    .findByIdAndUpdate(
      id,
      {$set: patch},
      {new: true}
    )
    .then((updatedEntity) => {
      return new Promise((resolve, reject) => {
        (updatedEntity === null) ? reject(new DocumentNotFoundException()) : resolve(updatedEntity)
      })
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        (err.name === 'CastError') ? reject(new DocumentNotFoundException()) : reject(err)
      })
    })
}

var Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
