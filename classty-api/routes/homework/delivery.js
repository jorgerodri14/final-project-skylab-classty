const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { userId, params: { idH, idSub } } = req
debugger
    try {
        await homework.delivery(idSub, idH, userId)
        res.status(201).json({ message: 'delivery correctly registered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}