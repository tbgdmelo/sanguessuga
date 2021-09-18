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
    cpf: {
      type: DataTypes.STRING,
      validate:{
        customValidator(value){
          const valida = require("gerador-validador-cpf");
          if(valida.validate(value) === false){
            throw new Error("O CPF é inválido!");
          }
        }
      }    
    },
    nome:{
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [3, 40],
          msg: "O nome precisa conter entre 3 e 40 caracteres."
        }
      }
    },
    sobrenome:{
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [3, 40],
          msg: "O sobrenome precisa conter entre 3 e 40 caracteres."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        message: 'Opa! Este e-mail já está em uso.',
      },
      validate: {
        isEmail:true
      },
    },
    senha: DataTypes.STRING,
    pontuacao: DataTypes.INTEGER,
    telefone: DataTypes.STRING,
    nascimento: DataTypes.DATEONLY,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    id_sangue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};