'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movieCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movieCharacter.init({
    movie_id: DataTypes.INTEGER,
    character_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'movieCharacter',
  });
  return movieCharacter;
};