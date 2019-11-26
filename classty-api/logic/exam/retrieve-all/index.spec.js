require('dotenv').config()

const { expect } = require('chai')
const retrieveAllHomeWorks = require('.')
const { database, models: { User, Subject, Exam } } = require('classty-data')
const { convertDate } = require('classty-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retireve all exams', () => {
    before(() => database.connect(DB_URL_TEST))

    let student1, student2, teacher1, teacher2, subject, idS11,idS22, idT11, idT22, exam1, exam2, idSub, idEx, note


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
        note = {
            student: idS11,
            note: 5
        }

        exam1 = {
            title: `title-${Math.random()}`,
            date: convertDate(`1${Math.random()}/2${Math.random()}/200${Math.random()}`),
            presented:[],
            note: [note]

        }
        exam2 = {
            title: `title-${Math.random()}`,
            date: convertDate(`1${Math.random()}/2${Math.random()}/200${Math.random()}`),
            presented:[],
            note: [note]

        }
        
        const _exam1 = new Exam(exam1)
        const _exam2 = new Exam(exam2)

        
        subject = {
            name: `name-${Math.random()}`,
            students:[idS11, idS22],
            teachers: [idT11, idT22],
            exams: [_exam1,_exam2]
        }

        const subject1 = await Subject.create(subject)
        idSub = subject1.id
        
    })

    it('should succeed on correct data', async () => {

        const ex = await retrieveAllHomeWorks(idSub, idS11)

        expect(ex).to.exist
        expect(ex.length).to.equal(2)

    })

    after(() => database.disconnect())
})