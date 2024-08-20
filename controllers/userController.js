require('dotenv').config()
const {user, basket} = require('../models/models')
const errorApi = require('../errors/errorApi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const genereteJWT = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration(req, res, next) {
        const {login, password, role} = req.body
        if (!login || !password) {
            return next(errorApi.badRequest('error with your login or password'))
        }
        const candidate = await user.findAll({where: {login}})
        if (candidate) {return next(errorApi.badRequest('user with this login is taking up'))}
        const hashPassword = await bcrypt.hash(password, 5)
        const User = await user.create({login, role, password: hashPassword})
        const Basket = await basket.create({userId: User.id})
        const token = genereteJWT(User.id, User.login, User.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const User = await user.findAll({where: {login}})
        if (!user) {next(errorApi.internalRequest('User doesnt find :('))}
        if (!bcrypt.compareSync(password, User.password)) {next(errorApi.internalRequest('Password is incorrect'))}
        const token = genereteJWT(User.id, User.login, User.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = genereteJWT(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}

module.exports = new userController()