const { Vendor, Dish } = require('../models')

module.exports = class DishController {
  static async getDishes (req, res, next) {
    try {
      const dishes = await Dish.findAll()

      res.status(200).json(dishes)
    } catch (error) {
      next(error)
    }
  }
  
  static async getDishById (req, res, next) {
    const { id } = req.params

    try {
      const dish = await Dish.findOne({ 
        where: {id},
        include: Vendor
      })      

      if (!dish) next({ name: 'DishNotFound' })
      else res.status(200).json(dish)
    } catch (error) {
      next(error)
    }
  }

  static async createDish (req, res, next) {
    const dish = {
      dish_name: req.body.dish_name,
      price: req.body.price,
      vendor_id: req.body.vendor_id
    }

    try {
      const addedDish = await Dish.create(dish)

      res.status(201).json(addedDish)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}