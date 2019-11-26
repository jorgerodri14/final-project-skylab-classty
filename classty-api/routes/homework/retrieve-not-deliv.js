const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { userId, params: { idS } } = req

    try {
        const result = await homework.retrieveNotDeliv(idS, userId)
        res.status(201).json({ message: 'homeworks correctly retrieve', result })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}