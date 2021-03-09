'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dish.belongsTo(models.Vendor, { foreignKey: 'vendor_id' })
      Dish.belongsToMany(models.User, { foreignKey: 'dish_id', through: 'Orders' })
    }
  };
  Dish.init({
    dish_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Dish name cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: 500,
          msg: 'Minimum price IDR 500'
        }
      }
    },
    vendor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};