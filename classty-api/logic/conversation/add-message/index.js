const { models: {User, Conversation, Message } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (idConv, idS, message) {
    validate.string(idConv, 'id')
    // validate.object(body, 'body')
    return (async () => {

        const userS = await User.findById(idS)

        if(!userS) throw Error(`user with id ${idS} does not exist`)
        
        const conversation = await Conversation.findById(idConv)

        if(!conversation) throw Error(`conversation with id ${idConv} does not exist`)

        const _message = new Message(message)

        conversation.message.unshift(_message)  
        
        conversation.deliveries.forEach(_delivery => _delivery.user.toString() != idS ? _delivery.delivery = true : null)
        
        await conversation.save()
        
    })()
}