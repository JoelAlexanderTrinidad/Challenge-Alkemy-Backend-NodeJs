'use strict';
const characters = require('../../data/characters');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Characters", characters, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Characters", characters, {});
  }
};
