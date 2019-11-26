const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (idSub, idH, idS) {
    validate.string(idSub, 'id')

    validate.string(idH, 'idH')
    validate.string(idS, 'idS')
    let count=0
    return ( async ()=>{

        const student = await User.findOne({ _id: idS })
        if(!student) throw Error(`student with id ${idS} does not exist`)
        const subject = await Subject.findById(idSub).populate('delivery')
debugger
        if (!subject) throw new Error(`wrong credentials`)

debugger
        subject.homeworks.forEach(homework => {debugger
            if(homework._id.toString() == idH ){debugger
                homework.delivery.push({student: idS, name:student.name, surname: student.surname})
                count ++
                debugger
            }
        }) 

        if (count==0 && count > 1) throw Error(`homework with id ${idH} dont exist`)
        debugger
        await subject.save()


    })()
}