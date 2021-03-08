'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Dish, { foreignKey: 'user_id', through: 'Orders' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email already exist'
      },
      validate: {
        isEmail: {
          msg: 'Wrong email format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};