const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { userId, params: { idH, idSub } } = req
debugger
    try {
        await homework.notDelivery(idSub, idH, userId)
        res.status(201).json({ message: 'delivery correctly unregister' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}