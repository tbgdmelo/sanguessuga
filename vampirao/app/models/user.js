'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    cpf: DataTypes.STRING,
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    e - mail: DataTypes.STRING,
    senha: DataTypes.STRING,
    pontuacao: DataTypes.INTEGER,
    telefone: DataTypes.STRING,
    nascimento: DataTypes.DATEONLY,
    id_sangue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};