const { _class } = require('../../logic')

module.exports = async(req, res) => {
    const {  body: { nameClass, id } } = req

    try {
        await _class.unregisterType(id, nameClass)
        res.status(201).json({ message: 'student correctly unregistered' })
        
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}