const { conversation } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idConv, idS, message } } = req

    try {
        await conversation.addMessage(idConv, idS, message)
        res.status(201).json({ message: 'message correctly send' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}