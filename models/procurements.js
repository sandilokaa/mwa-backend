'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Procurements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Procurements.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Procurements.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    }
  }
  Procurements.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    submissionDate: DataTypes.DATE,
    etaTarget: DataTypes.DATE,
    prNumber: DataTypes.TEXT,
    poNumber: DataTypes.TEXT,
    quantity: DataTypes.STRING,
    vendor: DataTypes.TEXT,
    progress: {
      type: DataTypes.ENUM('pr approved', 'po confirmed', 'paid', 'delivered'),
      defaultValue: 'pr approved',
    },
    statusProc: {
      type: DataTypes.ENUM('overdue', 'on progress', 'done'),
      defaultValue: 'on progress',
    }
  }, {
    sequelize,
    modelName: 'Procurements',
  });
  return Procurements;
};