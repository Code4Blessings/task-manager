const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)







app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})