const mongoose = require('mongoose')
const { Schema , SchemaTypes: { ObjectId } } = mongoose

const Delivery = require('./delivery')


module.exports = new Schema({
    title:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    expiry:{
        type: Date
    },
    delivery:[ Delivery ]
})