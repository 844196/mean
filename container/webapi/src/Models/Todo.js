var mongoose = require('mongoose')
var Schema = mongoose.Schema
var DocumentNotFoundException = require('../Exceptions/DocumentNotFoundException')

var TodoSchema = new Schema({
  name: String,
  isDone: Boolean,
})

TodoSchema.options.toJSON = {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

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

TodoSchema.statics.updateByEntity = (entity) => {
  return Todo
    .findByIdAndUpdate(
      entity.id,
      {$set: {name: entity.name, isDone: entity.isDone}},
      {new: false}
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
