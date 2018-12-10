let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  description: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model(schemaName, schema)