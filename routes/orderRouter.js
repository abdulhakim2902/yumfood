const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.get('/', OrderController.getOrderByUserId)
router.post('/', OrderController.createOrder)
router.patch('/:id', OrderController.updateQuantity)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router