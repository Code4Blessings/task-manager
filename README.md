# Task-Manager App

## Inspired by The Complete Nodejs Developer Course 
by Andrew Mead

## To get to the path of mongodb

**1. cd ~ (to get to the root)**
**2. pwd**
**3. Then type: /Users/(your username on your machine)/mongodb/bin/mongod --dbpath=/Users/(your username on your machine)/mongodb-data**

## SQL (Structured Query Language) vs NoSQL Databases (Not Only Structured Query Language)

#### Language

|      **SQL**        |       **NoSQL**             |
|:-------------------:|:---------------------------:|
| Database            | Database                    |
| Table               | Collection                  |
| Row/Record          | Document                    |                       
| Columns             | Fields                      |


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
    db.collection('users').findOne({ _id: new ObjectId("61bde493acbe2d1a43a70486") }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch document')
        }
        console.log(user)
    })
    db.collection('users').find({age: 47}).toArray((error, users) => {
        console.log(users);
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

## Update Lesson

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectId("61be046d787a61c3b18e83f6")
    }, {
        $inc: {
            age: 1
        }
    })
    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

#### Goal Assignment: Use updateMany to complete all tasks
        1. Check the documentation for UpdateMany
        2. Setup the call with the query and the updates
        3. Use promise methods to setup the success/error handlers
        4. Test your work

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

       