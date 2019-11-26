require('dotenv').config()

const { expect } = require('chai')
const retrieveSubjectToStudent = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve subject to user', () => {

    before(() => database.connect(DB_URL_TEST))

    let student, idS1, teacher, idT1, subject1, subject2, subject3, subject4

    beforeEach(async () => {
        student = {
            name: `student1-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        teacher = {
            name: `teacher1-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }
        const student1 = await User.create(student)
        idS1 = student1.id
        const teacher1 = await User.create(teacher)
        idT1 = teacher1.id

        await User.deleteMany()
        subject1 = {
            name: `subjec1-${Math.random()}`,
            students:[idS1],
            teachers: [idT1]
        }
        subject2 = {
            name: `subject2-${Math.random()}`,
            students:[idS1],
            teachers: [idT1]
        }
        subject3 = {
            name: `subject3-${Math.random()}`,
            students:[],
            teachers: [idT1]
        }
        subject4 = {
            name: `subject4-${Math.random()}`,
            students:[idS1],
            teachers: [idT1]
        }
        
        Promise.all([
            Subject.create(subject1),
            Subject.create(subject2),
            Subject.create(subject3),
            Subject.create(subject4)
        ])
        await Subject.deleteMany()
    })

    it('should succeed on correct data', async () => {

        const subjects = await retrieveSubjectToStudent(idS1)

        expect(subjects).to.exist
        expect(subjects.length).to.equal(3)

    })

    after(() => database.disconnect())
})