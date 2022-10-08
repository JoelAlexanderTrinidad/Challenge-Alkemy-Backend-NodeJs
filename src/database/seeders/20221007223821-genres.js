'use strict';

const genres = require('../../data/genres');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Genres", genres, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Genres", genres, {});
  }
};
