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
    dish_name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    vendor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};