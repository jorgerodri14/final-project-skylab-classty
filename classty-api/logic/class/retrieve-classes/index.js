const { models: { Classroom } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function () {
    
        return (async () => {
        const result = await Classroom.find()

        return result
    })()
}