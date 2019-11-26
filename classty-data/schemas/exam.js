const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose
const Note = require('./note')

module.exports = new Schema({

    title:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    notes: [Note]
})