const { users } = require('../../logic')

module.exports = async (req, res) => {
    const { userId, params:{id} } = req

    try {
        if(!id){
         const user = await users.retrieveUser(userId)

        res.json({ message: 'user retrieved correctly', user })
        }else{
         const user = await users.retrieveUser(id)

         res.json({ message: 'user retrieved correctly', user })
        }
    } catch ({ message }) {

        res.status(404).json({ error: message })
        
    }
}