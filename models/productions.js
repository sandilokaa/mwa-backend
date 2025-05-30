'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Productions.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Productions.belongsTo(models.Products, {
        foreignKey: 'productId'
      });
      
      Productions.belongsTo(models.Engineerings, {
        foreignKey: 'engineeringId'
      });
    }
  }
  Productions.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    engineeringId: DataTypes.INTEGER,
    productionStatus: {
      type: DataTypes.ENUM('not yet', 'on going', 'done'),
      defaultValue: 'not yet',
    },
    picProduction: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Productions',
  });
  return Productions;
};