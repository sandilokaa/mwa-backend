'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoUpdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      PhotoUpdate.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      PhotoUpdate.belongsTo(models.Product, {
        foreignKey: 'productId'
      });

    }
  }
  PhotoUpdate.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    dateInput: DataTypes.DATE,
    information: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PhotoUpdate',
  });
  return PhotoUpdate;
};