const {brand} = require('../models/models')
const errorApi = require('../errors/errorApi')

class brandController {
    async create(req, res) {
        const {name} = res.body
        const brand = await brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await brand.findAll()
        return res.json(brands)
    }
}

module.exports = new brandController()