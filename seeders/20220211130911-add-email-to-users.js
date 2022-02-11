'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('Users', {
      email: "test1@profico.com",
      },{
        id: 2,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test2@profico.com",
      },{
        id: 3,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test3@profico.com",
      },{
        id: 21,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test4@profico.com",
      },{
        id: 22,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test5@profico.com",
      },{
        id: 23,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test6@profico.com",
      },{
        id: 25,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "test7@profico.com",
      },{
        id: 26,
      }
    ),
    queryInterface.bulkUpdate('Users', {
      email: "fivic@profico.com",
      },{
        id: 27,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('Users', {
      email: null,
      },{
        id: [2,3,21,22,23,25,26,27],
      }
    );
  }
};
