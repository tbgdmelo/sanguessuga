'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pedido.init({
    beneficiario: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    id_sangue: DataTypes.INTEGER,
    cpf_user: DataTypes.STRING,
    id_hospital: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};