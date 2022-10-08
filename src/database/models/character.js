'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.Movie,{
        as : 'movies',
        through : 'character_movie',
        foreignKey : 'character_id',
        otherKey: 'movie_id'
      })
    }
  }
  Character.init({
    name: DataTypes.STRING(45),
    image: DataTypes.STRING(255),
    age: DataTypes.INTEGER,
    weigth: DataTypes.INTEGER,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};