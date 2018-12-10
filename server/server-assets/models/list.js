let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'List'

let schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
})

module.exports = mongoose.model(schemaName, schema)