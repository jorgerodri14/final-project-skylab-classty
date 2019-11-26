const { homework } = require('../../logic')

module.exports = async(req, res) => {
    const { params: { idSub, idH } } = req

    try {
        await homework.unregisterHomework(idSub, idH)
        res.status(201).json({ message: 'homework correctly unregistered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}