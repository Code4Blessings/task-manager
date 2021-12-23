# task-manager

## Lecture - Inserting Documents

#### Create Read Update Delete (CRUD)

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId

**Destructured way to write the constants up above**

const { MongoClient, ObjectId } = require('mongodb');

**Collections**

     db.collection('users').insertOne({
         name: 'Christine',
         age: 37
     }, (error, result) => {
         if(error) {
             return console.log('Unable to insert user')
         }
         console.log(result.insertedId)
    })
    db.collection('users').insertMany([
         {
             name: 'Robin',
             age: 47
         },
         {
            name: 'Daniel',
            age: 13
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert users')
        }
        console.log(result.insertedIds)
    })

## Assignment

Create a new tasks collection
- Make 3 documents with a description and completed field
- Make a conditional statement for error and result
- Refresh robo 3T and view new documents

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
    ### Goal: Use find and findone with tasks
    1. Use findOne to fetch the last task by id (print doc to console)
    2. Use find to fetch all the tasks that are not completed (print docs to console)
    3. Test your work
    
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