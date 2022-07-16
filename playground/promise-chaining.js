const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')

//62cebb49085a24a8affed011

User.findByIdAndUpdate('62cebb49085a24a8affed011', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})