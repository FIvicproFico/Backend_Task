'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'surname', {
      type: Sequelize.STRING,
      after: 'password',
    });
    await queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
      after: 'password',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'surname');
    await queryInterface.removeColumn('Users', 'name');
  }
};
