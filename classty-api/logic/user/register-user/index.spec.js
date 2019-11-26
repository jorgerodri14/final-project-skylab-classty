require('dotenv').config()
const bcrypt = require('bcryptjs')

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, type

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        type = 'mentor'
        await User.deleteMany()

    })

    it('should succeed on correct data', async () => {
        
        await registerUser(name, surname, email, password, type )

        const user =  await User.findOne({email})
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.type).to.equal(type)

    })

    it('error because e-mail already exist', async() => {
        await User.create({name, surname, email, password, type })
        
        try{

            await registerUser(name, surname, email, password, type)

        }catch(error){
            
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }

        await User.deleteMany()
    })

    after(() => database.disconnect())
})