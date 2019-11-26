const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerUser, retrieveUser, unregisterUser, updateUser, authenticateUser, retrieveAll } = require('./user')
const { registerClass, retrieveClasses, retrieveClass, addStudent, unregisterClass, unregisterType } = require('./class')
const { registerSubject, retrieveStudents, retrieveSubjects, retrieveSubjectTeacher, retrieveAllSubjectToStudent, addTeacher, addStudentSub, unregisterSubject, retrieveST } = require('./subject')
const { registerHomework, retrieveHomework, retrieveNotDeliv, delivery, notDelivery, unregisterHomework, retrieveDeliv } = require('./homework')
const { registerExam, retrieveAllExam, retrieve, addNote, unregisterExam } = require('./exam')
const { createPost, retrievePost, removePost } = require('./post')
const { createConversation, addMessage, consultSend, retrieveMessages } = require('./conversation')
const uploadPhoto = require('./upload-photo')
const router = Router()

const jsonBodyParser = bodyParser.json()

//USERS
router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.get('/users-all/:type', [tokenMiddleware, jsonBodyParser], retrieveAll)

router.patch('/users/', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)

//CLASSES
router.post('/class', [tokenMiddleware, jsonBodyParser], registerClass)

router.get('/classes', [tokenMiddleware, jsonBodyParser], retrieveClasses)

router.get('/class/:name', [tokenMiddleware, jsonBodyParser], retrieveClass)

router.post('/addStudent', [tokenMiddleware, jsonBodyParser], addStudent)

router.delete('/class', [tokenMiddleware, jsonBodyParser], unregisterClass)

router.delete('/classStu', [tokenMiddleware, jsonBodyParser], unregisterType)

//SUBJECTS
router.post('/subject', [tokenMiddleware, jsonBodyParser], registerSubject)

router.get('/subjects', [tokenMiddleware, jsonBodyParser], retrieveSubjects)

router.get('/subjects/:idSub', [tokenMiddleware, jsonBodyParser], retrieveStudents)

router.get('/subjectTe', [tokenMiddleware, jsonBodyParser], retrieveSubjectTeacher)

router.get('/subjectStu', [tokenMiddleware, jsonBodyParser], retrieveAllSubjectToStudent)

router.get('/subjectT', [tokenMiddleware, jsonBodyParser], retrieveST)

router.post('/addTeacher/:id', [tokenMiddleware, jsonBodyParser], addTeacher)

router.post('/addSubStudent/:idSub', [tokenMiddleware, jsonBodyParser], addStudentSub)

router.delete('/subject/:name', [tokenMiddleware, jsonBodyParser], unregisterSubject)

//HOMEWORK
router.post('/homeworks/:idSub', [tokenMiddleware, jsonBodyParser], registerHomework)

router.get('/homeworks/:idS', [tokenMiddleware, jsonBodyParser], retrieveHomework)

router.get('/homeworksNot/:idS', [tokenMiddleware, jsonBodyParser], retrieveNotDeliv)

router.get('/homeworksDev/:idS', [tokenMiddleware, jsonBodyParser], retrieveDeliv)

router.post('/delivery/:idSub/:idH', [tokenMiddleware, jsonBodyParser], delivery)

router.delete('/notdelivery/:idSub/:idH', [tokenMiddleware, jsonBodyParser], notDelivery)

router.delete('/homeworks/:idSub/:idH', [tokenMiddleware, jsonBodyParser], unregisterHomework)

//EXAM
router.post('/exams/:idSub', [tokenMiddleware, jsonBodyParser], registerExam)

router.get('/exam/:idSub', [tokenMiddleware, jsonBodyParser], retrieve)

router.get('/exams/:idSub', [tokenMiddleware, jsonBodyParser], retrieveAllExam)

router.post('/addNote/:idSub/:idEx', [tokenMiddleware, jsonBodyParser], addNote)

router.delete('/exam', [tokenMiddleware, jsonBodyParser], unregisterExam)

//POST
router.post('/post/:idSub', [tokenMiddleware, jsonBodyParser], createPost)

router.get('/post/:idSub', [tokenMiddleware, jsonBodyParser], retrievePost)

router.delete('/post/:idSub/:idP', [tokenMiddleware, jsonBodyParser], removePost)

//CONVERSATION
router.post('/conversation', [tokenMiddleware, jsonBodyParser], createConversation)

router.post('/addMessage', [tokenMiddleware, jsonBodyParser], addMessage)

router.get('/consult', [tokenMiddleware, jsonBodyParser], consultSend)

router.get('/conver/:id',[tokenMiddleware, jsonBodyParser], retrieveMessages)

//PHOTO
router.post('/upload', [tokenMiddleware, jsonBodyParser], uploadPhoto)


module.exports = router