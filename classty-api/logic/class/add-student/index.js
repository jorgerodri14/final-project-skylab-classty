const { models: {  Classroom, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * 
 * @param {string} id of subject
 * @param {Array} name is array of ids 
 * @param {Array} surname is array of ids 
 * 
 */
module.exports = (name, surname, nameClass) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    
    return ( async() => {

        const student = await User.findOne({name, surname})
        
        if(!student) throw Error(`student with name ${name} don´t exists`)

        if(student.type != 'student') throw Error(`user with id ${id} is not a mentor`)

        const klass = await Classroom.findOne({name: nameClass})

        if(!klass) throw Error(`class with id ${id} don´t exits`)

        const exist = klass.students.includes(student.id);

        if(exist) throw Error(`student with id ${student.id} already exist`)

        klass.students.push(student)
        
        await klass.save()
        
        
    })()
    
}