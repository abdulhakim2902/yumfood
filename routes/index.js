const router = require('express').Router()
const vendorRouter = require('./vendorRouter')
const orderRouter = require('./orderRouter')
const dishRouter = require('./dishRouter')
const userRouter = require('./userRouter')

router.use('/vendors', vendorRouter)
router.use('/orders', orderRouter)
router.use('/dishes', dishRouter)
router.use('/users', userRouter)

module.exports = router