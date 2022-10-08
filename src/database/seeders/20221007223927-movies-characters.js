'use strict';

const movieCharacter = require('../../data/movieCharacter');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("movie-characters", movieCharacter, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("movie-characters", movieCharacter, {});
  }
};
