const { models: { User, Conversation } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (userId, idRe) {

    validate.string(userId, 'id')
    // validate.object(body, 'body')
    return (async () => {
        debugger
        const senders = await Conversation.find({ sender: userId, reciver: idRe })
        debugger
        const arr = senders.map(sender=>{return sender.message})
        debugger
        let reciver = await Conversation.find({ sender: idRe, reciver: userId })
        debugger
        senders.push(reciver)
        debugger

    })()
}