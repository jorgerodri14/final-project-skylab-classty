const { models: { User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (type) {
    
    validate.string(type, 'type')
    return (async () => {

        let users = await User.find({ type: type }, { password: 0 }).lean()

        if (!users) throw Error(`user with id ${type} not found`)

        users.forEach(user => { user.id = user._id.toString(); delete user._id; });
        
        return users
    })()
}