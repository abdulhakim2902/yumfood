'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.hasMany(models.Dish, { foreignKey: 'vendor_id' })
    }
  };
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 128],
          msg: 'Vendor name must be less than 128 characters and more than 4 characters'
        }
      }
    },
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vendor',
    hooks: {
      beforeCreate (vendor) {
        if (!vendor.logo) {
          vendor.logo = 'http://lorempixel.com/output/animals-q-g-640-480-7.jpg'
        }
      }
    }
  });
  return Vendor;
};