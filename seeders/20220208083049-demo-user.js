'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Filip',
      password: 'password123admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'Ana',
      password: 'password123member',
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'Irena',
      password: 'password123member2',
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true}); //for reseting auto-increment after seed undo
  }
};
