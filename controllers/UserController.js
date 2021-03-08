const { User } = require('../models')

module.exports = class UserController {
  // static async getUsers (req, res, next) {
  //   try {
  //     const users = await User.findAll()

  //     res.status(200).json(users)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static async createUser (req, res, next) {
    const user = {
      name: req.body.name,
      email: req.body.email
    }
    
    try {
      const createdUser = await User.create(user)

      res.status(201).json(createdUser)
    } catch (error) {
      next(error)
    }
  }
}