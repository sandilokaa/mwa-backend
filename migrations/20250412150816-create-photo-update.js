'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PhotoUpdates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'User',
          key: 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Product',
          key: 'id'
        }
      },
      category: {
        type: Sequelize.STRING
      },
      dateInput: {
        type: Sequelize.DATE
      },
      information: {
        type: Sequelize.TEXT
      },
      picture: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PhotoUpdates');
  }
};