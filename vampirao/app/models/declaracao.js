'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class declaracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  declaracao.init({
    cpf_user: DataTypes.STRING,
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255]
      }
    },

    fileExt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255]
      }
    },

    file: {
      type: DataTypes.BLOB("long"),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'declaracao',
  });
  return declaracao;
};