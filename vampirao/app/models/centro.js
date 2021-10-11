'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Centro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Centro.init({
    nome:{
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [3, 40],
          msg: "O nome precisa conter entre 3 e 40 caracteres."
        }
      }
    },
    endereco: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [5, 200],
          msg: "O endereço precisa conter entre 5 e 200 caracteres."
        }
      }
    },
    telefone: DataTypes.STRING,
    vampirao: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Centro',
  });
  return Centro;
};