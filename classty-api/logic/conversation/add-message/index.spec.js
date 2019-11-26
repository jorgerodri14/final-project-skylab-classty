/* require('dotenv').config()

const { expect } = require('chai')
const addMessage = require('.')
const { database, models: { User, Conversation, Participant, Message } } = require('classty-data')
const { convertDate } = require('classty-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - add message', () => {

    before(() => database.connect(DB_URL_TEST))

    let student1, student2, message, participant11, participant22, conversation, idConv

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

        const _message = new Message(message)
        
        participant11 = {
            user: idS11,
            delivery: false
        }

        const _participant11 = new Participant(participant11)
        
        participant22 = {
            user: idS22,
            delivery: false
        }

        const _participant22 = new Participant(participant22)

        conversation = {
            sender: idS11,
            reciver: idS22,
            deliveries: [ _participant11, _participant22 ],
            message: [_message],
            date: convertDate('22/09/2019')
        }

        const _conversation0 =  new Conversation(conversation)
        idConv = _conversation0.id 
        await _conversation0.save()
    })

    it('should succeed on correct data', async () => {

        const message = {
            title: `titles-${Math.random()}`,
            body: `body-${Math.random()}body-${Math.random()}`,
        }

        await addMessage(idConv, idS11, message)

        const _conversation = await Conversation.findOne({ sender: idS11})
        
        expect(_conversation).to.exist
        expect(_conversation.message[0].title).to.equal(message.title)


    })

    after(() => database.disconnect())
}) */