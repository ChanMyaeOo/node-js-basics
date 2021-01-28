require('../src/db/mongoose')
const Tasks = require('../src/models/task')

// Tasks.findByIdAndDelete('601142470249b41e8525bbd0').then((task) => {
//     console.log(task)

//     return Tasks.countDocuments({completed: false})
// }).then(result => {
//     console.log(result)
// }).catch(e => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('601249e5bcea2727a1fe2f6c').then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})