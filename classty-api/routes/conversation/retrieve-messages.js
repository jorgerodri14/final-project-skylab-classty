const { conversation } = require('../../logic')

module.exports = async(req, res) => {
    const { userId, params:{id} } = req

    try {
        
        const result = await conversation.retrieveMessages(userId, id)
        
        res.status(201).json({ message: 'conversation correctly retrieved', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}