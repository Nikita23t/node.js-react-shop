require('dotenv').config()
const errorApi = require('../errors/errorApi')
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next(errorApi.badRequest('oops, error'))
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {return res.status(401).json({message: "user doesnt auth"})}
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()


    } catch (e) {
        res.status(401).json({message: "user doesnt auth"})
    }
}