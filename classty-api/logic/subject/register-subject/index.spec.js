require('dotenv').config()

const { expect } = require('chai')
const registerSubject = require('.')
const { database, models: { User, Subject } } = require('classty-data')

const { env: { DB_URL_TEST }} = process
describe('logic - register subject', () => {
    before(() => database.connect(DB_URL_TEST))

    let nameS, surnameS, emailS, passwordS, typeS, nameT, surnameT, teachers, students, emailT, passwordT, idT, idS, nameSubject

    beforeEach(async () => {

        nameS = `Sname-${Math.random()}`
        surnameS = `Ssurname-${Math.random()}`
        emailS = `Semail-${Math.random()}@domain.com`
        passwordS = `Spassword-${Math.random()}`
        typeS = `student`
        nameT = `Tname-${Math.random()}`
        surnameT = `Tsurname-${Math.random()}`
        emailT = `Temail-${Math.random()}@domain.com`
        passwordT = `Tpassword-${Math.random()}`
        typeT = `teacher`
        nameSubject = `subject-${Math.random()}`
       
        await User.deleteMany()

        const student = await User.create({name: nameS, surname: surnameS, email: emailS, password: passwordS, type: typeS})
        idS = student.id
        students = [ idS ]
        const teacher = await User.create({name: nameT, surname: surnameT, email: emailT, password: passwordT, type: typeT})
        idT = teacher.id
        teachers = [ idT ]
    })

    it('should succeed on correct data', async () => {
        
        await registerSubject(nameSubject, students, teachers)

        const subject =  await Subject.findOne({name:nameSubject})

        expect(subject).to.exist
        expect(subject.name).to.equal(nameSubject)
        expect(subject.students.length).to.equal(students.length)
        expect(subject.teachers.length).to.equal(teachers.length)

    })

    it('error because subject already exist', async() => {
        await Subject.create({name: nameSubject, students, teachers})
        
        try{

            await registerSubject(nameSubject, students, teachers)

        }catch(error){
            
            expect(error.message).to.equal(`subject with name ${nameSubject} already exists`)
        }

        await Subject.deleteMany( )
    })

    after(() => database.disconnect())
})