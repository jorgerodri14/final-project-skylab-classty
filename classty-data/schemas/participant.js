const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({
    user:{
        type: ObjectId,
        required: true
    },
    delivery:{
        type: Boolean,
        default: false,
        required: true
    }
})