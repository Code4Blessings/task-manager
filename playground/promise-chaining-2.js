require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('62ce9fdb3b792971d8ca220e').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})