'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Engineerings', {
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
      category: {
        type: Sequelize.STRING
      },
      drawingNumber: {
        type: Sequelize.STRING
      },
      status3D: {
        type: Sequelize.ENUM('not yet', 'on going', 'done'),
        defaultValue: 'not yet'
      },
      status2D: {
        type: Sequelize.ENUM('not yet', 'on going', 'done'),
        defaultValue: 'not yet'
      },
      statusDXF: {
        type: Sequelize.ENUM('not yet', 'on going', 'done'),
        defaultValue: 'not yet'
      },
      pic3D: {
        type: Sequelize.STRING
      },
      pic2DDXF: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      dateRequired: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      remark: {
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
    await queryInterface.dropTable('Engineerings');
  }
};