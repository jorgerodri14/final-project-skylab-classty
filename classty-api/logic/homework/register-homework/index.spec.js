require('dotenv').config()

const { expect } = require('chai')
const resgisterHomework = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register homework', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, student2, teacher1, teacher2, subject, idS11,idS22, idT11, idT22, homework, idSub

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
        idSub = subject1.id

        homework = {
            title: `title-${Math.random()}`,
            comment: `comment-${Math.random()}`,
            expiry: `1${Math.random()}/2${Math.random()}/200${Math.random()}`,
            delivery:[idS11, idS22]
        }
    })

    it('should succeed on correct data', async () => {

        const _subject = await resgisterHomework(idSub, homework)

        expect(_subject).to.exist
        expect(_subject.homeworks[0].title).to.equal(homework.title)

    })

    after(() => database.disconnect())
})