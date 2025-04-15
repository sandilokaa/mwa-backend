'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoUpdates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      PhotoUpdates.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      PhotoUpdates.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    
    }
  }
  PhotoUpdates.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    dateInput: DataTypes.DATE,
    information: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PhotoUpdates',
  });
  return PhotoUpdates;
};