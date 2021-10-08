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
        customValidator(value){
          if(value === ""){
            throw new Error("O e-mail é um campo obrigatório e não pode ficar em branco!");
          }
        }
      },
    },
    senha:{
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [8, 254],
          msg: "A senha precisa conter 8 caracteres ou mais."
        },
        customValidator(value){
          if(value === ""){
            throw new Error("A senha não pode ficar em branco.");
          }
        }
      }
    },
    pontuacao: DataTypes.INTEGER,
    telefone: DataTypes.STRING,
    nascimento: DataTypes.DATEONLY,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    id_sangue:{
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        customValidator(value){
          if(typeof(value)=='undefined'){
            throw new Error("Selecione um tipo sanguíneo.");
          }
        }
      }
    },
    isAdmin: DataTypes.BOOLEAN, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};