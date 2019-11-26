const { models: {Subject, Post, User} } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, post) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)
debugger
        if (!subject) throw new Error(`subject with id ${id} not exists.`)
debugger
        const user = await User.findOne({_id: post.user, name: post.name, surname: post.surname})
debugger
        if(!user)throw Error(`user with id ${post.user} doews not exist`)
debugger
//         const student = subject.students.find(student => student.toString() == post.user ) 
//  debugger       
//         if (!student) throw Error(`error to student`)

        // let exist = subject.post.find(_post => _post.title == post.title)

        // if (exist) throw new Error(`homework with title ${post.title} exist.`)
        
        const _post = new Post(post)
debugger
        subject.post.push(_post)
        
        await subject.save()
        
    })()
}