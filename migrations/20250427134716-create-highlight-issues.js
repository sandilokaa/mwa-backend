'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HighlightIssues', {
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
      category: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      issue: {
        type: Sequelize.TEXT
      },
      countermeassure: {
        type: Sequelize.TEXT
      },
      dueDate: {
        type: Sequelize.DATE
      },
      statusIssue: {
        type: Sequelize.ENUM('on progress', 'late', 'finish'),
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
    await queryInterface.dropTable('HighlightIssues');
  }
};