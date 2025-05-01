'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Products.belongsTo(models.Users, {
        foreignKey: 'userId'
      });

      Products.hasMany(models.PhotoUpdates);

      Products.hasMany(models.Procurements);

      Products.hasMany(models.HighlightIssues);

      Products.hasMany(models.Productions);

    }
  }
  Products.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};