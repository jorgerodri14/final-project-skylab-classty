const { models: { User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    validate.string(id, 'id')
    
    
    if( typeof data != 'object') throw Error('data is not a object')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: data })
        
        if (!user) throw Error(`user with id ${id} does not exist`)

    })()
}