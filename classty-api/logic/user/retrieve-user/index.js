const { models: { User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')
    return (async () => {

        let user = await User.findOne({ _id: id }, { _id: 0, password: 0, _v: 0 }).lean()

        if (!user) throw Error(`user with id ${id} not found`)

        user.id = id

        return user
    })()
}