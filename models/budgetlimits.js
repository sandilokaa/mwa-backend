'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetLimits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BudgetLimits.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      BudgetLimits.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    }
  }
  BudgetLimits.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    system: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    month: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BudgetLimits',
  });
  return BudgetLimits;
};