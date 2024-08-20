const Router = require('express')
const router = new Router()
const userRouter = require('./userRouters')
const typeRouter = require('./typeRouters')
const deviseRouter = require('./deviseRouters')
const brandRouter = require('./brandRouters')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/devise', deviseRouter)

module.exports = router