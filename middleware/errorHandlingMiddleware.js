const errorApi = require('../errors/errorApi');

module.exports = function (err, req, res, next) {
    if (err instanceof errorApi) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: err.message})
}