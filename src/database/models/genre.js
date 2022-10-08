'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie,{
        as : 'movies',
        foreignKey : 'genre_id'
      })
    }
  }
  Genre.init({
    name: DataTypes.STRING(45),
    image: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};