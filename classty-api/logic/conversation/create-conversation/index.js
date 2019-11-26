const { models: {User, Conversation, Message, Participant} } = require('classty-data')
const { validate, convertDate } = require('classty-utils')

module.exports = function (idE, idR, conversation) {
    validate.string(idR, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const userE = await User.findById(idE)

        if(!userE) throw Error(`user with id ${idE} does not exist`)

        const userR = await User.findById(idR)

        if(!userR) throw Error(`user with id ${idR} does not exist`)

        const senderidE = Conversation.findOne({ sender: idE, reciver:idR })
        
        const reciverIde = Conversation.findOne({ reciver: idE, sender: idR })
        
        if(senderidE.sender || reciverIde.reciver) throw Error(`conversation already exist`)

        const _sender = new Participant({user: idE, delivery: false})
        const _reciver = new Participant({user: idR, delivery: true})
        const _message = new Message(conversation.message)
        
        const _conversation = {
            
            sender: idE,
            reciver: idR,
            deliveries: [ _sender, _reciver ],
            message: [ _message ], 
            date: convertDate(conversation.date)
           
        }  
        
        await Conversation.create(_conversation)
        
    })()
}