const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (userId) {
    return (async () => {
        
        const subjects = await Subject.find({}).lean()

        if (!subjects) throw Error(`user with id ${subjects.id} not found`)
        
        let result

        subjects.forEach(subject => { 
            const sub = subject.teachers.findIndex(teacher => {;return teacher.toString()==userId;})
            
            if(sub>-1) {;result = subject;return}
        });
        
        return result
    })()
}