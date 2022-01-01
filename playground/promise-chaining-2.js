require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.deleteOne({_id: '61ccd96d7f2d7928028decd1'}).then((result) => {
    console.log(result)
    return Task.countDocuments({ completed: false })
}).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})