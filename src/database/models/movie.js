'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Character,{
        as : 'characters',
        through : 'movie-characters',
        foreignKey : 'movie_id',
        otherKey : 'character_id'
      })

      Movie.belongsTo(models.Genre,{
        as : 'genres',
        foreignKey : 'genre_id'
      })

    }
  }
  Movie.init({
    title: DataTypes.STRING(45),
    image: DataTypes.STRING(255),
    release_date: DataTypes.DATE,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};