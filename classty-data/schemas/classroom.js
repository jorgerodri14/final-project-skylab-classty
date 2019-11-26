const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

 module.exports = new Schema({
     name: {
         type:String,
         required:true
     },
     mentor: { type: ObjectId, ref: 'User'},
     teachers: [ { type: ObjectId, ref: 'User', required: true} ],
     students: [ { type: ObjectId, ref: 'User' } ]
 })