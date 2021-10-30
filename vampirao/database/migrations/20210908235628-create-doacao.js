'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Doacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hora: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      pontuacao: {
        type: Sequelize.INTEGER
      },
      cpf_user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_centro: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      agendado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_declaracao: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Doacaos');
  }
};