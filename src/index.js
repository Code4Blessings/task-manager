const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer =require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})



app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)



app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

