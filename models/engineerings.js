'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Engineerings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Engineerings.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Engineerings.belongsTo(models.Products, {
        foreignKey: 'productId'
      });

      Engineerings.hasOne(models.Productions);
    }
  }
  Engineerings.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    partName: DataTypes.STRING,
    category: DataTypes.STRING,
    drawingNumber: DataTypes.STRING,
    status3D: {
      type: DataTypes.ENUM('not yet', 'on going', 'done'),
      defaultValue: 'not yet',
    },
    status2D: {
      type: DataTypes.ENUM('not yet', 'on going', 'done'),
      defaultValue: 'not yet',
    },
    statusDXF: {
      type: DataTypes.ENUM('not yet', 'on going', 'done'),
      defaultValue: 'not yet',
    },
    pic3D: DataTypes.STRING,
    pic2DDXF: DataTypes.STRING,
    startDate: DataTypes.DATE,
    dateRequired: DataTypes.DATE,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    remark: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Engineerings',
  });
  return Engineerings;
};