'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recruitments', {
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
      name: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      submissionDate: {
        type: Sequelize.DATE
      },
      joinDate: {
        type: Sequelize.DATE
      },
      progress: {
        type: Sequelize.ENUM('interview hr', 'interview user', 'interview comben', 'offer letter'),
        defaultValue: 'interview hr'
      },
      statusRec: {
        type: Sequelize.ENUM('overdue', 'on progress', 'done'),
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
    await queryInterface.dropTable('Recruitments');
  }
};