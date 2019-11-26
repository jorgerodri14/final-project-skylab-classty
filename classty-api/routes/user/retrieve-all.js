const { users } = require('../../logic')

module.exports = async (req, res) => {
    const { params: { type } } = req

    try {

        const _user = await users.retrieveAll(type)

        res.json({ message: 'user retrieved correctly', _user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}