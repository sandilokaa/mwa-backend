'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectTargetImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectTargetImages.belongsTo(models.ProjectTargets, {
        foreignKey: 'projectTargetId'
      });
    }
  }
  ProjectTargetImages.init({
    projectTargetId: DataTypes.INTEGER,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProjectTargetImages',
  });
  return ProjectTargetImages;
};