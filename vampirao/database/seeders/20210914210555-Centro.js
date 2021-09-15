'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Centros', [
      {
        nome: 'Hemoam - Fundação Hospitalar de Hematologia e Hemoterapia do Amazonas',
        endereco: 'Av. Constantino Nery, 4397 - Chapada',
        telefone:'(92) 3655-0100',
        vampirao: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'DOE VIDA',
        endereco: 'Av. Coronel Teixeira, 7995 - Nova Esperança',
        telefone:'(92) 98271-0011',
        vampirao: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'HEMOAM-São Jose I',
        endereco: 'Av. Cosme Ferreira - São José I',
        telefone:'(92) 3655-0100',
        vampirao: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Banco expresso Valente',
        endereco: 'R. Itaúba Amarela - Lago Azul',
        telefone:'(92) 98495-7383',
        vampirao: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Centros', null, {});
  }
};
