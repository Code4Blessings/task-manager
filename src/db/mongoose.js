const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//     userNewUrlParser: true,
//     UseCreateIndex: true
// })

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
}
// Goal: Add a password field to User
//1. Setup the field as a required string
//2. Ensure the length is greater than 6
//3. Trim the password
//4. Ensure that password doesn't contain "password"
//5. Test your work



const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

