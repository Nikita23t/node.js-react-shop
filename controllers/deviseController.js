const {devise, deviseInfo} = require('../models/models')
const errorApi = require('../errors/errorApi')
const uuid = require('uuid')
const path = require('path')

class deviseController {

    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const devise = await devise.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    deviseInfo.create({
                        title: i.title,
                        description: i.description,
                        deviseId: devise.id
                    })
                )
            }

            return res.json(devise)
        } catch (e) {
            next(errorApi.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {devices = await devise.findAndCountAll({limit, offset})}
        if (brandId && !typeId) {devices = await devise.findAndCountAll({where: {brandId}, limit, offset})}
        if (!brandId && typeId) {devices = await devise.findAndCountAll({where: {typeId}, limit, offset})}
        if (brandId && typeId) {devices = await devise.findAndCountAll({where: {brandId, typeId}, limit, offset})}

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const devise = await devise.findOne({
                where: id,
                include: [{models: deviseInfo, as: 'info'}]
            })
        return res.json(devise)
    }
}

module.exports = new deviseController()