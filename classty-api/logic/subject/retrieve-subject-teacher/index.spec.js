require('dotenv').config()

const { expect } = require('chai')
const retrieveSubject = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve subject', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, student2, teacher1, teacher2, subject, idS11,idS22, idT11, idT22, idSub

    beforeEach(async () => {
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

        await User.deleteMany()

        const student11 = await User.create(student1)
        idS11 = student11.id
        const student22 = await User.create(student2)
        idS22 = student22.id
        const teacher11 = await User.create(teacher1)
        idT11 = teacher11.id
        const teacher22 = await User.create(teacher2)
        idT22 = teacher22.id

        subject = {
            name: `name-${Math.random()}`,
            students:[idS11, idS22],
            teachers: [idT11, idT22]
        }

        const subject1 = await Subject.create(subject)
        idSub = subject1.name
    })

    it('should succeed on correct data', async () => {

        const subject = await retrieveSubject(idT11)
debugger
        expect(subject).to.exist
        expect(subject.name).to.equal(subject.name)

    })

    after(() => database.disconnect())
})