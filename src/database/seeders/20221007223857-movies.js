'use strict';

const movies = require('../../data/movies');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Movies", movies, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Movies", movies, {});
  }
};
