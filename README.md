# Task-Manager App

## Inspired by The Complete Nodejs Developer Course 
by Andrew Mead

**To acccess all of the notes for this course, download the PDF guide located in Section 1:2 of this course**
**Documentation links are also located in the guide**

### To get to the path of mongodb

**1. cd ~ (to get to the root)**
**2. pwd**
**3. Then type: /Users/(your username on your machine)/mongodb/bin/mongod --dbpath=/Users/(your username on your machine)/mongodb-data**

- For solutions to all of the challenges, please check the PDF Guide

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

- MongoClient takes in 3 arguments:
1. connectionURl
2. An object {useNewUrlParser: true}
3. A callback function - takes in 2 arguments: error, client

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId

#### To view in the Robo 3T GUI viewer

1. Right-click on the Local MongoDB Database
2. Hit Refresh
3. Open "Collections" under the task-manager file
4. Right click on the users collection and click on 'View Documents

**Destructured way to write the constants up above**

const { MongoClient, ObjectId } = require('mongodb');

**Collections**

- inserOne IS NOT synchronous

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

```
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

```
- To shorten the syntax, we can remove "const updatePromise" and write the following

```
 db.collection('users').updateOne({
        _id: new ObjectId("61be046d787a61c3b18e83f6")
    }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


```

#### Challenge: Use updateMany to complete all tasks 
        1. Check the documentation for UpdateMany
        2. Setup the call with the query and the updates
        3. Use promise methods to setup the success/error handlers
        4. Test your work


## Delete Operation

- Only requires the filter (the object property) and the promise

#### deleteMAny

```
db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

```

#### Challenge:  Use deleteOne to remove a task

1. Grab the description for the task you want to remove
2. Setup the call with the query
3. Use the promise methods to setup the success/error handlers
4. Test your work!

## Creating a Model

- Here we create a model for a User

```
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: 0,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        },
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error("Age must be a positive number")
            } 
        }
    }
})

```

- Here we show how to create a user based on the model

```

const me = new User({
    name: 'Sam',
    email: 'sam@email.com',
    password: 'Password123',
    age: 80
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})

```

#### Challenge: Create a model for tasks

1. Define the model with description and completed fields
2. Create a new instance of the model
3. Save the model to the database
4. Test your work!

#### Challenge: Add a password field to user

1. Setup the field as a required string
2. Ensure the length is greater than 6
3. Trim the password
4. Ensure the password doesn't contain "password"
5. Test your work!

#### Challenge: Add Validation and Sanitization to task

1. Trim the description and make it required.
2. Make completed optional and default it to false
3. Test your work with and without errors

## The REST API
- Representational State Transfer - Application Programming Interface (REST API or RESTful API)
- Is stateless but provides all the data the server needs to satisfy the request

#### Flow

**GET Request**

- The client needs data to show  -> makes a GET request to the server -> the server receives the request, provides the data and a status 200 response -> the client renders the data

**POST Request**

- The client needs to create data  -> makes a POST request to the server -> the server receives the request, confirms the data and a status 201 response is sent to the client

#### The Task Resource

**Create** POST /tasks
**Read** GET /tasks
**Read** GET /tasks/:id
**Update** Patch /tasks/:id
**Delete** DELETE /tasks/:id