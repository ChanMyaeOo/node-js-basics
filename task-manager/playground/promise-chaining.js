require('../src/db/mongoose')
const Users = require('../src/models/user')

// Users.findByIdAndUpdate('601244bbe57028252f84c2c9', {age: 1}).then(user => {
//     console.log(user)

//     return Users.countDocuments({ age: 1})
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await Users.findByIdAndUpdate(id, { age })
    const count = await Users.countDocuments({ age })
    return count
}

updateAgeAndCount('601244bbe57028252f84c2c9', 2).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})