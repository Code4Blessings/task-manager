const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName);
    
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectId("61be046d787a61c3b18e83f6")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    //Goal: Use updateMany to complete all tasks
        //1. Check the documentation for UpdateMany
        //2. Setup the call with the query and the updates
        //3. Use promise methods to setup the success/error handlers
        //4. Test your work
    const updateTasks = db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    })
    updateTasks.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})

