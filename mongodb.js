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
    
    // db.collection('users').findOne({ _id: new ObjectId("61bde493acbe2d1a43a70486") }, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch document')
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({age: 47}).toArray((error, users) => {
    //     console.log(users);
    // })
    //Goal: Use find and findone with tasks
    //1. Use findOne to fetch the last task by id (print doc to console)
    //2. Use find to fetch all the tasks that are not completed (print docs to console)
    //3. Test your work
    db.collection('tasks').findOne({_id: new ObjectId("61bdec5f9a1bd9769e915f08")}, (error, task) => {
        if(error) {
            return console.log('Unable to fetch task')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed: false}).toArray((error, task) => {
        if(error) {
            return console.log('Unable to fetch tasks')
        }
        console.log(task)
    })
})

