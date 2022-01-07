require('../src/db/mongoose')
const User = require('../src/models/user')

// 61cccd26ad320962f935c915

User.findByIdAndUpdate('61ccd56c3b11615d8d83f630', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('61ccd56c3b11615d8d83f630', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})