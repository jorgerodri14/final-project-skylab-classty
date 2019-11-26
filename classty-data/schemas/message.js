const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema({
    
    body:{
        type: String,
        required: true
    }

})