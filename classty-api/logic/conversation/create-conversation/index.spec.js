require('dotenv').config()

const { expect } = require('chai')
const createConversation = require('.')
const { database, models: { User, Conversation } } = require('classty-data')
const { convertDate } = require('classty-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - create conversation', () => {

    before(() => database.connect(DB_URL_TEST))

    let student1, student2, message, participant11, participant22, conversation

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

        await User.deleteMany()

        const student11 = await User.create(student1)
        idS11 = student11.id
        const student22 = await User.create(student2)
        idS22 = student22.id

        message =  {
            title: `title-${Math.random()}`,
            body: `body-${Math.random()} body-${Math.random()}` 
        }


        participant11 = {
            user: idS11,
            delivery: false
        }
        
        participant22 = {
            user: idS22,
            delivery: false
        }


        conversation = {
            sender: idS11,
            reciver: idS22,
            delivery: [ participant11, participant22 ],
            message: message,
            date: '22/09/2019'
        }
    })

    it('should succeed on correct data', async () => {

        await createConversation(idS11, idS22, conversation)

        const _conversation = await Conversation.findOne({ sender: idS11})

        expect(_conversation).to.exist


    })

    after(() => database.disconnect())
})