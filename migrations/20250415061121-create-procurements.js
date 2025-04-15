'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Procurements', {
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
      itemName: {
        type: Sequelize.STRING
      },
      submissionDate: {
        type: Sequelize.DATE
      },
      etaTarget: {
        type: Sequelize.DATE
      },
      prNumber: {
        type: Sequelize.TEXT
      },
      poNumber: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.TEXT
      },
      progress: {
        type: Sequelize.ENUM('pr approved', 'po confirmed', 'paid', 'delivered'),
        defaultValue: 'pr approved'
      },
      statusProc: {
        type: Sequelize.ENUM('overdue', 'on progress'),
        defaultValue: 'on progress'
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
    await queryInterface.dropTable('Procurements');
  }
};