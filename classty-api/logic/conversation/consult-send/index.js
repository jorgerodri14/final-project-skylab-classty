const { models: {User, Conversation, Message, Participant} } = require('classty-data')
const { validate, convertDate } = require('classty-utils')

module.exports = function (idS) {
    validate.string(idS, 'id')
    // validate.object(body, 'body')
    return (async () => {
        let listMessage = []

        const senders = await Conversation.find({sender: idS})

        senders.forEach(sender => {
            sender.deliveries.forEach(delivery => {
                
                delivery.user == idS && delivery.delivery ? listMessage.push(sender) : null
                delivery.delivery = false
            })
        })

        const reciveries = await Conversation.find({reciver: idS})

        reciveries.forEach(reciver => {
            reciver.deliveries.forEach(delivery => {
                
                delivery.user == idS && delivery.delivery ? listMessage.push(reciver) : null
                delivery.delivery = false
            })
        })
        
        return listMessage

    })()
}