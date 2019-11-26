require('dotenv').config()

const { expect } = require('chai')
const unregisterClass = require('.')
const { database, models: { User, Classroom } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - register subject', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, name, student2, teacher1, teacher2, students, teachers, mentor

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
            name: `mentor-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'mentor'
        }

        await User.deleteMany()
        
        const student11 = await User.create(student1)
        idS11 = student11.id
        const student22 = await User.create(student2)
        idS22 = student22.id
        const teacher11 = await User.create(teacher1)
        idT11 = teacher11.id
        const teacher22 = await User.create(teacher2)
        idT22 = teacher22.id
        const mentor1 = await User.create(mentor)
        idM = mentor1.id

        students = [idS11, idS22]
        teachers = [idT11, idT22]

        await Classroom.create({name, mentor1, students, teachers})
    })

    it('should succeed on correct data', async () => {
        
        await unregisterClass(idM, name)

        const _class =  await Classroom.findOne({name})

        expect(_class).not.to.exist

    })

    after(() => database.disconnect())
})