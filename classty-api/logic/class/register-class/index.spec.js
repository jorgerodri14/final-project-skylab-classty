require('dotenv').config()

const { expect } = require('chai')
const registerClass = require('.')
const { database, models: { User, Classroom } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - register class', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, student2, mentor, teacher1, teacher2, idM, students, teachers, name

    beforeEach(async () => {
        name = `class-${Math.random()}`
        student1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        student2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        teacher1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }
        teacher2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }
        mentor = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'mentor'
        }

        await User.deleteMany()

        Promise.all([
            User.create(student1),
            User.create(student2),
            User.create(teacher1),
            User.create(teacher2)
        ])
        const mentor1 = await User.create(mentor)
        idM = mentor1.id
        students = await User.find({type: 'student'})
        teachers = await User.find({type: 'teacher'})

    })

    it('should succeed on correct data', async () => {
        
        await registerClass(idM, name, students, teachers)

        const _class =  await Classroom.findOne({name})

        expect(_class).to.exist
        expect(_class.name).to.equal(name)
        expect(_class.students.length).to.equal(students.length)
        expect(_class.teachers.length).to.equal(teachers.length)

    })

    after(() => database.disconnect())
})