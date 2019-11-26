const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Method that assign a new teacher in a subject
 * @param {string} id of mentor
 * @param {Array} name is array of ids 
 * @param {Array} surname is array of ids 
 * @param {string} idS of subject
 * 
 */
module.exports = (id, name, surname, idS) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(id, 'idSubject')
    
    return ( async() => {
        const mentor = await User.findOne( {  _id: id } )

        if(!mentor) throw Error(`mentor with id ${id} don´t exists`)
        if(mentor.type!='mentor') throw Error(`user with name ${mentor.name} isn't mentor`)

        const teacher = await User.findOne({name, surname})
        
        if(!teacher) throw Error(`teacher with name ${name} don´t exists`)
        if(teacher.type!='teacher') throw Error(`user with name ${teacher.name} isn't teacher`)

        let subject = await Subject.findById(idS)

        if(!subject) throw Error(`subject with id ${idS} don´t exits`)

        subject.teachers.push(teacher)
        
        await subject.save()
        
        
    })()
    
}