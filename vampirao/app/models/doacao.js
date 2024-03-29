'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Doacao.init({
    data: DataTypes.DATEONLY,
    hora: DataTypes.STRING,
    cpf_user: DataTypes.STRING,
    id_centro: DataTypes.INTEGER,
    agendado: DataTypes.BOOLEAN,
    id_declaracao: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Doacao',
  });
  return Doacao;
};