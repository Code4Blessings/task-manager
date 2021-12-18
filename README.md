# task-manager

## Lecture - Inserting Documents

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