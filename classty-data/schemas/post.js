const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Message = require('./message')

module.exports = new Schema({
    user: {type: ObjectId, ref:'User'},
    name: {type:String},
    surname: {type:String},
    message: Message
 })