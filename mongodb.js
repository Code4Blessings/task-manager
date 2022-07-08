//CRUD create read update delete


const { MongoClient, ObjectId} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
//The IP address works better than the localhost url because the IP will make the app move faster

const databaseName = 'task-manager'

//Inserting a document

 MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    db.collection('tasks').findOne({_id: new ObjectId('62b7cde15a0b04969708e5d5')}, (error, task) => {
        if(error) {
            return console.log('Unable to fetch task')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed: false}).toArray((error, task) => {
        console.log(task)
    })
    
    //To find one document (the first one found)
    // db.collection('users').findOne({name: 'Christine', age: 1}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })
    //To find many documents with the given parameter(s) - This doesn't require a callback but a cursor instead (a pointer to data)
    //The cursor uses the callback
    // db.collection('users').find({age: 27}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({age: 27}).count((error, count) => {
    //     console.log(count)
    // })
})



