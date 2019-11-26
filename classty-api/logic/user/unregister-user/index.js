const { models: { User } } = require('classty-data')
const { validate } = require('classty-utils')

/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')
    
        return (async () => {
        
        const result = await User.deleteOne({ _id: id })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}