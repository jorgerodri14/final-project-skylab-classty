const { subject } = require('../../logic')

module.exports = async(req, res) => {
    const { userId } = req

    try {
       const result = await subject.retrieveST(userId)
        res.status(201).json({ message: 'retrieve list correctly ', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}