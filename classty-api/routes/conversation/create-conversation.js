const { conversation } = require('../../logic')

module.exports = async(req, res) => {
    const { body: { idE, idR, _body } } = req

    try {
        await conversation.createConversation(idE, idR, _body)
        res.status(201).json({ message: 'conversation correctly create' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}