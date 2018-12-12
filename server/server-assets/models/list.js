let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'
let Tasks = require('./tasks')


let schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

schema.pre('remove', function (next) {
  this._id
  // @ts-ignore
  Promise.all([
    Tasks.deleteMany({ listId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})


module.exports = mongoose.model(schemaName, schema)