'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('Users', {
      uuid: uuidv4(),
      },{
        id: 1,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      uuid: uuidv4(),
      },{
        id: 2,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      uuid: uuidv4(),
      },{
        id: 3,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('Users', {
      uuid: null,
      },{
        id: [1,2,3],
      }
    );
  }
};
