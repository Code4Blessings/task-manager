const mongoose = require('../src/db/mongoose')
const User = require('../src/models/user')

//

User.findByIdAndUpdate('62cd9bdc7531f720b66e399e', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})