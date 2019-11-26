const { models: { Classroom, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (nameClass) {
    validate.string(nameClass, 'nameClass')
    
        return (async () => {
        const result = await Classroom.findOne({ name: nameClass })

        return result
    })()
}