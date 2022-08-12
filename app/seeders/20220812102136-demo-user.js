'use strict';
const {hashPassword} = require('../services/hash-password.service')
module.exports = {
  async up (queryInterface, Sequelize) {

     return queryInterface.bulkInsert('Users', [{
      email: 'example1@example.com',
      password: await hashPassword('test123'),
      test_user: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'example2@example.com',
      password: await hashPassword('test123'),
      test_user: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'example3@example.com',
      password: await hashPassword('test123'),
      test_user: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('User', null, {});
  }
};
