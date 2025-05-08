'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HighlightIssues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HighlightIssues.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      HighlightIssues.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    }
  }
  HighlightIssues.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    category: DataTypes.STRING,
    pic: DataTypes.STRING,
    issue: DataTypes.TEXT,
    countermeassure: DataTypes.TEXT,
    dueDate: DataTypes.DATE,
    revisionDate: DataTypes.DATE,
    statusIssue: {
      type: DataTypes.ENUM('on progress', 'overdue', 'done'),
      defaultValue: 'on progress',
    }
  }, {
    sequelize,
    modelName: 'HighlightIssues',
  });
  return HighlightIssues;
};