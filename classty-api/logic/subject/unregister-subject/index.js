const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name) {
    validate.string(name, 'id')
    
        return (async () => {

        const result = await Subject.deleteOne({ name })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}