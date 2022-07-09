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

    db.collection('tasks').deleteOne({
         _id: new ObjectId('62b7cde15a0b04969708e5d5')
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
