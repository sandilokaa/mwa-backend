'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartDesigns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PartDesigns.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      PartDesigns.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    }
  }
  PartDesigns.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PartDesigns',
  });
  return PartDesigns;
};