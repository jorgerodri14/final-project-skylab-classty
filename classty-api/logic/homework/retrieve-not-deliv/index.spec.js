require('dotenv').config()

const { expect } = require('chai')
const retrieveNotDeliv = require('.')
const { database, models: { User, Subject, Homework } } = require('classty-data')
const { convertDate } = require('classty-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all', () => {

    before(() => database.connect(DB_URL_TEST))

    let student1, student2, teacher1, teacher2, subject, idS11,idS22, idT11, idT22, homework1, homework2, idSub, idHo

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
        homework1 = {
            title: `title-${Math.random()}`,
            comment: `comment-${Math.random()}`,
            expiry: convertDate(`1${Math.random()}/1${Math.random()}/200${Math.random()}`),
            delivery:[idS11]
        }
        homework2 = {
            title: `title-${Math.random()}`,
            comment: `comment-${Math.random()}`,
            expiry: convertDate(`1${Math.random()}/1${Math.random()}/200${Math.random()}`),
            delivery:[idS22]
        }
        
        const _homework1 = new Homework(homework1)
        const _homework2 = new Homework(homework2)

        
        subject = {
            name: `name-${Math.random()}`,
            students:[idS11, idS22],
            teachers: [idT11, idT22],
            homeworks: [_homework1,_homework2]
        }

        const subject1 = await Subject.create(subject)
        idSub = subject1.id
        
    })

    it('should succeed on correct data', async () => {

        const hw = await retrieveNotDeliv(idSub, idS11)

        expect(hw).to.exist
        expect(hw.length).to.equal(2)

    })

    after(() => database.disconnect())
})