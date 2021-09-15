'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sangues', [
      {
        tipo: 'A+',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'A-',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'B+',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'B-',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'AB+',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'AB-',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'O+',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo: 'O-',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sangues', null, {});
  }
};
