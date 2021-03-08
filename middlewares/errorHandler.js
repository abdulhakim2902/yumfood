module.exports = (err, req, res, next) => {
  switch(err.name) {
    case 'VendorNotFound':
      res.status(404).json({ errors: 'Vendor not found' })
    break

    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ errors: err.message })
    break

    case 'SequelizeValidationError':
      const errorMsg = err.errors.map(err => err.message)
      res.status(400).json({ errors: errorMsg })
    break

    case 'DishNotFound':
      res.status(404).json({ errors: 'Dish not found' })
    break

    case 'OrderNotFound':
      res.status(404).json({ errors: 'Order not found' })
    break

    default:
      res.status(500).json({ errors: 'Internal server error' })
    break
  }
}