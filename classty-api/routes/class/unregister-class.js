const { _class } = require('../../logic')

module.exports = async(req, res) => {
    const { userId ,body: { nameClass } } = req

    try {
        await _class.unregisterClass(userId, nameClass)
        res.status(201).json({ message: 'class correctly unregistered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}