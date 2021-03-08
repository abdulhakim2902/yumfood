const { User, Order, Dish } = require('../models')

module.exports = class OrderController {
  static async getOrderByUserId (req, res, next) {
    const { user_id } = req.query

    try {
      const order = await User.findOne({ 
        where: { id: user_id || null },
        include: {
          model: Dish,
          through: {
            attributes: ['quantity', 'paid', 'additional_request'],
            where: { paid: false }
          }
        }
      })

      if (!order) next({ name: 'OrderNotFound' })
      else res.status(200).json(order)

    } catch (error) {
      next(error)
    }
  }

  static async createOrder (req, res, next) {
    const order = {
      quantity: +req.body.quantity,
      additional_request: req.body.additional_request,
      user_id: +req.body.user_id,
      dish_id: +req.body.dish_id
    }

    try {
      const [createdOrFoundOrder, created] = await Order.findOrCreate({
        where: { user_id: order.user_id, dish_id: order.dish_id },
        defaults: order
      })

      if (!created) {
        const [ _, [updatedOrder] ] = await Order.update(
          {quantity: +createdOrFoundOrder.quantity + order.quantity},
          { 
            where: { user_id: order.user_id, dish_id: order.dish_id},
            returning: true
          }
        )
        res.status(200).json(updatedOrder)
      } else {
        res.status(201).json(createdOrFoundOrder)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async updateQuantity (req, res, next) {
    const { id } = req.params
    const order = {
      quantity: req.body.quantity
    }

    try {
      const [updated, [updatedOrder]] = await Order.update(order, {
          where: { id },
          returning: true
        }
      )

      if (!updated) next({ name: 'OrderNotFound' })
      else res.status(200).json(updatedOrder)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async deleteOrder (req, res, next) {
    const { id } = req.params

    try {
      const deleted = await Order.destroy({ where: {id} })

      if (!deleted) next({ name: 'OrderNotFound' })
      else res.status(200).json({ message: 'Order has been deleted' })
    } catch (error) {
      next(error)
    }
  }
}