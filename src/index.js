const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//Middleware must be above our app.use calls

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('Get requests are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE'){
//         res.status(503).send('Site temporaily down for maintenance and will return shortly')
//     }
// })

app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)



app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

