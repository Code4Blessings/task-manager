# Task-Manager App

## Inspired by The Complete Nodejs Developer Course 
by Andrew Mead

**To acccess all of the notes for this course, download the PDF guide located in Section 1:2 of this course**
**Documentation links are also located in the guide**

### To get to the path of mongodb

**1. cd ~ (to get to the root)**
**2. pwd**
**3. Then type: /Users/(your username on your machine)/mongodb/bin/mongod --dbpath=/Users/(your username on your machine)/mongodb-data**

## Postman Notes

#### To Set Up Environment Variables

**Set Up URL Variable for all the Requests**
- This will make it easier to change the url in one spot rather than going in and changing the url under each request when needed.

1. Click on 

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
    ### Goal: Use find and findOne with tasks
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

#### Challenge: Setup the task creation endpoint

1. Create a separate file for the task model (load it into index.js)
2. Create the task creation endpoint (handle success and error)
3. Test the endpoint from Postman with good and bad data

#### Challenge: Setup the task reading endpoints

1. Create an endpoint for fetching all tasks
2. Create an endpoint for fetching a task by its id
3. Setup new requests in Postman and test your work

## Promises

- As nodejs developers we will not be creating promises. They will be created by the library we'll be using.
- Promises take in a single argument which is a function
- The function takes in 2 arguments - resolve and reject

```

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([7, 4, 1])
        reject('Things went wrong')
        resolve([2,3,2])
    }, 2000);
})

doWorkPromise.then((result) => {
    console.log('Success', result)
}).catch((error) => [
    console.log('Error', error)
])


                            fulfilled
                          /
Promise  -- pending --> 
                         \
                             rejected
                     

```

#### Challenge: Mess Around with Promise Chaining

1. Create promise-chaining-2.js
2. Load in mongoose and task model
3. Remove a given task by id
4. Get and print the total number of incomplete tasks
5. Test your work!

#### Challenge: Use Async/Await

1. Create deleteTaskAndCount as an async function
    - Accept id of task to remove
2. Use awaiy to delete task and count up incomplete tasks
3. Return the count
4. Call the function and attach then/catch to log results
5. Test Your work!

#### Challenge: Refactor task routes to use async await

1. Refacttor task routes to use async await
2. Test all routes in Postman

#### Challenge: Allow for task updates

1. Setup the route handler
2. Send error if unknown updates
3. Attempt to update the task
    - Handle task not found
    - Handle validation errors 
    - Handle success
4. Test your work!!!

#### Challenge: Allow for removal of tasks

1. Setup the endpoint handler
2. Attempt to delete the task by id
    - Handle success
    - Handle task not found
    - Handle error
3. Test your work!

#### Challenge: Create Task Router

1. Create new file that creates/exports new router
2. Move all the task routes over
3. Load in that new with the express app
4. Test your work

#### Challenge: Change How Tasks Are Updated

1. Find the task
2. Alter the task properties 
3. Save the task
4. Test your work by updating a task in postman

#### Challenge: Have Signup send back auth token

1. Generate a token for the saved user
2. Send back both the token and the user
3. Create a new user from Postmans anbd confirm the token is there.

## Express Middleware

- Without Middleware: new request -> run route handler

- With middleware: new request -> do something -> run route handler

- Middleware must be added before the app.use calls in the index.js file

#### Challenge: Set up middleware for maintenance mode

1. Register a new middleware function
2. Send back a mainetence message with a 503 status code
3. Try your requests from the server and confirm that status/message shows

#### Challenge: Create a way to logout of all sessions

1. Setup POST/users/logoutAll
2. Create the route handler to wipe the tokens array
    - Send 200 or 500
3. Test your work
    -Login a few times and logout of all. Check database


#### Challenge: Refactor the update profile route

1. Update the URL to /users/profile
2. Add the authentication middleware into the mix
3. Use the existing user document instead of fetching via param id
4. Test your work in Postman!

#### Challenge: Refactor GET/tasks

1. Add authentication
2. Return tasks only for the authenticated user
3. Test your work.

#### Challenge: Refactor DELETE /tasks/:id

1. Add authentication 
2. Find the task by _id/owner (findOneAndDelete)
3. Test your work.

#### Challenge: Refactor task model to add timestamps

1. Explicitly create schema
2. Setup timestamps
3. Create tasks from Postman to test work

#### Challenge: Setup support for skip

1. Setup "skip" option
    - Parse query value to integer
2. Fire off some requests to test it's working
    -  Fetch the 1st page of 2 and then the third page of 2
    -  Fetch the first page of 3 and then the second page of 1