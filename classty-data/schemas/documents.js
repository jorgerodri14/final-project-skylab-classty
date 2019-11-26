const mongoose = require('mongoose')
const { Schema , SchemaTypes: { ObjectId } } = mongoose

module.exports = new Schema ({
    title:{
        type: String,
    },
    subject: { type: ObjectId, ref: 'Subject'},
    type:{ type: ObjectId } 
})