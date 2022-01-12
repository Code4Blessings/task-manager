require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.deleteOne({_id: '61ccd96d7f2d7928028decd1'}).then((result) => {
//     console.log(result)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async(id) => {
    const deleteTask = await Task.deleteOne({id: id})
    const count = await Task.countDocuments({ completed: false})
    return count
}

deleteTaskAndCount('61c90f14aa0e4ac395101d78').then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})