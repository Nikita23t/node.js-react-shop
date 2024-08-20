const Router = require('express')
const router = new Router()
const deviseController = require('../controllers/deviseController')

router.post('/', deviseController.create)
router.post('/:id', deviseController.getOne)
router.get('/', deviseController.getAll)

module.exports = router