'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StylingDesigns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StylingDesigns.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      StylingDesigns.belongsTo(models.Products, {
        foreignKey: 'productId'
      });

      StylingDesigns.hasMany(models.StylingDesignImages);
    }
  }
  StylingDesigns.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StylingDesigns',
  });
  return StylingDesigns;
};