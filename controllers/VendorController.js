const { Vendor, Dish, Tag } = require('../models')

module.exports = class VendorController {
  static async getVendors (req, res, next) {
    const { tags } = req.query
    
    try {
      if (!tags) {
        const vendors = await Vendor.findAll()

        res.status(200).json(vendors)
      } else {
        const vendors = await Tag.findAll({
          where: {

          }
        })
        res.send(tags)
      }

    } catch (error) {
      next(error)
    }
  } 

  static async getDishesByVendor (req, res, next) {
    const { id } = req.params

    try {
      const getVendorWithDishes = await Vendor.findOne({ 
        where: { id },
        include: Dish
      })

      if (!getVendorWithDishes) next({ name: 'VendorNotFound' })
      else res.status(200).json(getVendorWithDishes)
    } catch (error) {
      next(error)
    }
  }

  static async addVendor (req, res, next) {
    const vendor = {
      name: req.body.name,
      logo: req.body.logo,
      tags: req.body.tags
    }

    try {
      const addedVendor = await Vendor.create(vendor)
      res.status(201).json(addedVendor)
    } catch (error) {
      next(error)
    }
  }

  static async updateVendor (req, res, next) {
    const { id } = req.params
    const vendor = {
      name: req.body.name,
      logo: req.body.logo,
      tags: req.body.tags
    }

    try {
      const [ updated, [ updatedVendor ] ] = await Vendor.update(vendor, {
        where: { id },
        returning: true
      })

      if (!updated) next({ name: 'VendorNotFound' })
      else res.status(200).json(updatedVendor)
    } catch (error) {
      next(error)
    }
  }

  static async deleteVendor (req, res, next) {
    const { id } = req.params

    try {
      let deleted = await Vendor.destroy({ where: { id }})

      if (!deleted) next({ name: 'VendorNotFound' })
      else res.status(200).json({ message: 'Vendor has been deleted' })
    } catch (error) {
      next(error)
    }
  }
}