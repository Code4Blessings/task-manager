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
    
})

