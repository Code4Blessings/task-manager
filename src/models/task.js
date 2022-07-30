const mongoose = require('mongoose')

//Each task will store the id of the user who created it

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
        
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task