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
        
        const _class = await Classroom.findOne({name: nameClass})
        
        const i = _class.students.findIndex(student => student._id.toString()==id)
        
        if(i == -1) throw Error(`student with id: ${id} not found.`)
        
        _class.students.splice(i, 1)
        
        await _class.save()

    })()
}