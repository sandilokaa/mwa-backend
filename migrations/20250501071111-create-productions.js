'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Products',
          key: 'id'
        }
      },
      partName: {
        type: Sequelize.STRING
      },
      partNumber: {
        type: Sequelize.STRING
      },
      drawingNumber: {
        type: Sequelize.STRING
      },
      productionStatus: {
        type: Sequelize.ENUM('on progress', 'done'),
        defaultValue: 'on progress'
      },
      picProduction: {
        type: Sequelize.STRING
      },
      information: {
        type: Sequelize.TEXT
      },
      prodFile: {
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
    await queryInterface.dropTable('Productions');
  }
};