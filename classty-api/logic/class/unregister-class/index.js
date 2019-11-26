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
module.exports = function (id, nameClass) {
    validate.string(id, 'id')
    validate.string(nameClass, 'nameClass')
    
        return (async () => {
        const mentor = await User.findById(id)
        if(!mentor) throw Error(`id of user ${id} is not a mentor`)
        const result = await Classroom.deleteOne({ name: nameClass })

        if (!result.deletedCount) throw Error(`wrong credentials`)

    })()
}