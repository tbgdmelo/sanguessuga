'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      cpf: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sobrenome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pontuacao: {
        type: Sequelize.INTEGER
      },
      telefone: {
        type: Sequelize.STRING
      },
      nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      id_sangue: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};