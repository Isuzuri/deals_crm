'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Clients', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Clients', 'phone', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  }
};
