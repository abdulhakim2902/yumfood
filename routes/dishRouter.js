const router = require('express').Router()
const DishController = require('../controllers/DishController')

router.get('/', DishController.getDishes)
router.post('/', DishController.createDish)
router.get('/:id', DishController.getDishById)

module.exports = router