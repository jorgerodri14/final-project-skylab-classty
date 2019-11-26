const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id of student
 * 
 * @returns {Promise}
 */
module.exports = function () {
    return (async () => {
        
        const subjects = await Subject.find({}, {_v: 0}).sort({_id:1}).lean()
debugger
        if(!subjects) throw Error(`Not subject definedS`)
debugger
        return subjects
    })()
}