'use strict';
const db = require("../models/index");
const User = db.User;
const { faker } = require('@faker-js/faker');
module.exports = {
  async up(queryInterface) {

    const users = (await User.findAll({
      where:{test_user: true}
    })).map(user => user.dataValues);
    const tasks = [];
    for(const user of users) {
      tasks.push({
        title: faker.vehicle.vehicle(), 
        description: faker.lorem.paragraph(), 
        userId: user.id, 
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Tasks',tasks, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
