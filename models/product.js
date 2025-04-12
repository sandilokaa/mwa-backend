'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Product.hasMany(models.PhotoUpdate);

    }
  }
  Product.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};