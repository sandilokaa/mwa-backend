'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedules.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Schedules.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
    }
  }
  Schedules.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    scheduleName: DataTypes.STRING,
    pic: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedules;
};