const { users } = require('../../logic')

module.exports = function (req, res) {
    const { userId, body  } = req

    try {
        users.updateUser(userId, body)
            .then(() => res.json({ message: 'user correctly updated' }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}