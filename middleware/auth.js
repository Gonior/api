// require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;

        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else {
        return res.status(403).send("A token is required for authentication");
    }
    
    return next()
}

module.exports = verifyToken
