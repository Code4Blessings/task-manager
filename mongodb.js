//crud Create Read Update Delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName);
    //Lecture - Inserting Documents

    // db.collection('users').insertOne({
    //     name: 'Robin',
    //     age: 47
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.insertedId)
    // })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Robin',
    //         age: 47
    //     },
    //     {
    //         name: 'Daniel',
    //         age: 13
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert users')
    //     }
    //     console.log(result.insertedIds)
    // })
    //Assignment

    db.collection('tasks').insertMany([
        {
            description: 'Wash the dishes',
            completed: true
        },
        {
            description: 'Cook dinner',
            completed: false
        },
        {
            description: 'Do the laundry',
            completed: false
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert task')
        }
        console.log(result.insertedIds)
    })
})