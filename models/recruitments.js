'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recruitments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Recruitments.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
      
    }

  }
  Recruitments.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    division: DataTypes.STRING,
    submissionDate: DataTypes.DATE,
    joinDate: DataTypes.DATE,
    progress: {
      type: DataTypes.ENUM('interview hr', 'interview user', 'interview comben', 'offer letter'),
      defaultValue: 'interview hr',
    },
    statusRec: {
      type: DataTypes.ENUM('overdue', 'on progress', 'done'),
      defaultValue: 'on progress',
    }
  }, {
    sequelize,
    modelName: 'Recruitments',
  });
  return Recruitments;
};