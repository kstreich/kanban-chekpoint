let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'
let Comments = require('./comment')

let schema = new Schema({
  description: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
})

//schema.pre('remove', )
schema.pre('remove', function (next) {
  this._id
  // @ts-ignore
  Promise.all([
    Comments.deleteMany({ taskId: this._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

module.exports = mongoose.model(schemaName, schema)