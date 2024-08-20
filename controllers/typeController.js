const {type} = require('../models/models')
const errorApi = require('../errors/errorApi')

class typeController {
    async create(req, res) {
        const {name} = res.body
        const type = await type.create({name})
        return res.json(type)

    }

    async getAll(req, res) {
        const types = await type.findAll()
        return res.json(types)
    }
}

module.exports = new typeController()