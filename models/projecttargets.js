'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectTargets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectTargets.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      ProjectTargets.belongsTo(models.Products, {
        foreignKey: 'productId'
      });

      ProjectTargets.hasMany(models.ProjectTargetImages);
    }
  }
  ProjectTargets.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    information: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProjectTargets',
  });
  return ProjectTargets;
};