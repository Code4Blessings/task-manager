//As node developers we will not be creating promises. They will be created by the library we'll be using.
//Promises take in a single argument which is a function
//The function takes in 2 arguments - resolve and reject
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

//
//                            fulfilled
//                          /
//Promise  -- pending --> 
//                          \
//                             rejected
//                      