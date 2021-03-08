const router = require('express').Router()
const VendorController = require('../controllers/VendorController')

router.get('/', VendorController.getVendors)
router.post('/', VendorController.addVendor)
router.get('/:id', VendorController.getDishesByVendor)
router.put('/:id', VendorController.updateVendor)
router.delete('/:id', VendorController.deleteVendor)

module.exports = router