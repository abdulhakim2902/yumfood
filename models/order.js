'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Order.init({
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: 'Minimum order 1 item'
        }
      }
    },
    additional_request: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    dish_id: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
    hooks: {
      beforeCreate(order) {
        order.paid = false
      }
    }
  });
  return Order;
};