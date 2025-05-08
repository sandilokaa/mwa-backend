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
      engineeringId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Engineerings',
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
      category: {
        type: Sequelize.STRING
      },
      productionStatus: {
        type: Sequelize.ENUM('not yet', 'on going', 'done'),
        defaultValue: 'not yet'
      },
      picProduction: {
        type: Sequelize.STRING
      },
      remark: {
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