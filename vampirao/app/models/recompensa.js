'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recompensa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recompensa.init({
    nome: DataTypes.STRING,
    valor: DataTypes.INTEGER,
    codigo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recompensa',
  });
  return Recompensa;
};