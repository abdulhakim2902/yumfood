const { Vendor, Dish, Tag, VendorTag } = require('../models')
const { Op } = require('sequelize');

module.exports = class VendorController {
  static async getVendors (req, res, next) {
    const { tags } = req.query
    
    try {
      let vendors

      if (!tags) vendors = await Vendor.findAll()
      else {
        vendors = await Vendor.findAll({
          include: {
            model: Tag,
            where: {
              tag_name: {
                [Op.or]: tags
              }
            }
          }
        })
      }
      res.status(200).json(vendors)
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
      logo: req.body.logo
    }
    const { tag_ids } = req.body
    try {
      const addedVendor = await Vendor.create(vendor)

      res.status(201).json(addedVendor)

      if (Array.isArray(tag_ids) && tag_ids.length > 0) {
        
        const vendorsTags = tag_ids .map(e => {
          return {
            vendor_id: addedVendor.id,
            tag_id: e
          }
        })
        await VendorTag.bulkCreate(vendorsTags)
      }

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async updateVendor (req, res, next) {
    const { id } = req.params
    const vendor = {
      name: req.body.name,
      logo: req.body.logo
    }
    const { tag_ids } = req.body

    try {
      const [ updated, [ updatedVendor ] ] = await Vendor.update(vendor, {
        where: { id },
        returning: true
      })

      if (!updated) next({ name: 'VendorNotFound' })
      else {

        res.status(200).json(updatedVendor)

        if (Array.isArray(tag_ids) && tag_ids.length > 0) {
          tag_ids.forEach(async e => {
            const where = {
              vendor_id: updatedVendor.id,
              tag_id: e
            }

            await VendorTag.findOrCreate({
              where,
              defaults: where
            })
          })
        }

      }
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