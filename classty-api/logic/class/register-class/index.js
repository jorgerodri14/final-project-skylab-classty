const { models: { Classroom, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * 
 * @param {string} nameSubject
 * @param {Array} students is array of ids 
 * @param {Array} teachers is array of ids 
 * 
 */
module.exports = (idMentor, nameClass, students, teachers) => {
    validate.string(nameClass, 'subject')
    validate.array(students, 'students')
    validate.array(teachers, 'teachers')
    validate.string(idMentor, 'mentor')
    
    return ( async() => {

        const _class = await Classroom.find({name: nameClass})
        
        if(!_class.length==0) throw Error(`class with name ${nameClass} already exists`)

        const mentor =  await User.findOne({_id:idMentor})

        if(!mentor) throw Error(`Mentor with id ${idMentor} dont exist`)
        if(mentor.type != 'mentor') throw Error(`Id ${idMentor} does not bealong mentor`)

        await Classroom.create({ name: nameClass, students, teachers})
        
    })()
    
}