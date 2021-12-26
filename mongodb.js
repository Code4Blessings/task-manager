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
    
    
    // db.collection('users').deleteMany({
    //     age: 47
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //Goal: Use deleteOne to remove a task
    //1. Grab the description for the task you want to remove 
    //2. Setupo the call with a query
    //3. Use promise methods to setup the success/erro handlers
    //4.
})

