const { conversation } = require('../../logic')

module.exports = async(req, res) => {
    const { userId } = req

    try {
        
        const result = await conversation.consultSend(userId)
        
        res.status(201).json({ message: 'conversation correctly create', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}