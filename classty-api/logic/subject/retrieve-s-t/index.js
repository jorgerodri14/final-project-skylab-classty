const { models: {  User } } = require('classty-data')
const { validate } = require('classty-utils')
const retrieveT = require('../retrieve-subject-user')

/**
 * Retrieves a teachers with subjects.
 * 
 * @param {string} id of student
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id)
    return (async () => {
        const subjects = await retrieveT(id)
        
        const users = await User.find({ type: 'teacher' })
        
        return subjects.map(subject => {debugger
            const teachers = subject.teachers.map( teacher => {debugger
                let _users = users.find(user => user.id == teacher.toString())
                return { name: _users.name, surname: _users.surname, id: _users._id.toString() }
            })
            return { title:subject.title, teachers }
        })
}) ()
}