const mongoose = require('mongoose')
const { Schema, SchemaTypes: { ObjectId } } = mongoose

const Homework = require('./homework')
const Exam = require('./exam')
const Post = require('./post')


module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [
        {type: ObjectId, ref: 'User'}
    ],
    teachers: [
        {type: ObjectId, ref: 'User'}
    ],
    homeworks: [Homework],
    exams: [Exam],
    post: [Post]
})