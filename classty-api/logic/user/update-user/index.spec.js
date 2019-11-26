require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, body, type

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        type = 'student'

        body = {
            name: `jorge-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type : 'mentor'
        }

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, type })

        id = user.id
    })


    it('should succeed on correct data', async () => {

        await updateUser(id, body)
       
        const user = await User.findById(id)
        
        expect(user).to.exist
        expect(user.name).to.equal(body.name)
        expect(user.surname).to.equal(body.surname)
        expect(user.email).to.equal(body.email)
        expect(user.password).to.equal(body.password)
        expect(user.type).to.equal(body.type)

    })


    it('should fail on non-existing user', async () => {
        const _id = '5d5d5530531d455f757a8fF9'
        try{
            
        await updateUser(_id, body)

        }catch(error){
            
        expect(error.message).to.equal(`user with id ${_id} does not exist`)
        
        }

    })

    after(() => database.disconnect())
})