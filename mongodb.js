//CRUD create read update delete


const { MongoClient, ObjectId} = require('mongodb')

const id = new ObjectId()
console.log(id.id.length)
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
//The IP address works better than the localhost url because the IP will make the app move faster

const databaseName = 'task-manager'

//Inserting a document

 MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Ann',
    //     age: 37
    // }, (error, results) => {
    //     if(error) {
    //         return ('Unable to insert user')
    //     }
    //     console.log(results.insertedId)
    // })
    
//Inserting more than one document
    db.collection('users').insertMany([
        {
            name: 'Christine',
            age: 27
        },
        {
            name: 'Daniel',
            age: 14
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents')
        }
        console.log(result.insertedIds)
    })
//     db.collection('tasks').insertMany([
//         {
//             description: 'Spend an hour studying',
//             completed: true
//         },
//         {
//             description: 'Do laundry',
//             completed: false
//         },
//         {
//             description: 'Make breakfast',
//             completed: true
//         }
//     ], (error, result) => {
//         if(error) {
//             return console.log('Unable to insert tasks')
//         }
//         console.log(result.insertedIds)
//     })
})



