const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)



app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '7 days'})
    console.log(token)

    //.verify is the base64 decode which takes in 2 arguments--the token you are trying to verify and the secret
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()