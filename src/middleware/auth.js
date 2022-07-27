const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        //Validate the token
        //1. Store the token value, then use req.header to access incoming headers (which in this case is the Authorization header).
        //2. Use replace to remove the beginning ('Bearer') portion of the Bearer token and replace with a space
        const token = req.header('Authorization').replace('Bearer ', '')
        //3. Now determine if the jwt token is valid by using the secret
        const decoded = jwt.verify(token, 'keepitsecretkeepitsafe')
        //4. Access the user's id that is embedded in the token
        //5. The search criteria will start with looking for a user with a given id stored on decoded._id. Then chaeck if that token is still part of that tokens array (tokens.token). Usually when a user logs out, that token gets deleted.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        if(!user) {
            throw new Error()
        }
        //6. If the user is authenticated, we can give the routehandler access to the user we fetched from the data
        req.token = token //This equals the token that was used when the user logged in. This way when the user logs out, it will target this particular token.
        req.user = user
        next()
    }catch(e) {
        res.status(401).send({
            error: 'Authentication failed'
        })
    }
} 

module.exports = auth