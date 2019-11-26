const { users } = require('../../logic')

module.exports = async (req, res) => {
    const { params: { id } } = req

    try {

        const user = await users.retrieveUser(id)

        res.json({ message: 'user retrieved correctly', user })

    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}