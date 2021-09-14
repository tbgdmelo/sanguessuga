'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sangues', [
      {
        tipo: 'A+',
      },
      {
        tipo: 'A-',
      },
      {
        tipo: 'B+',
      },
      {
        tipo: 'B-',
      },
      {
        tipo: 'AB+',
      },
      {
        tipo: 'AB-',
      },
      {
        tipo: 'O+',
      },
      {
        tipo: 'O-',
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sangues', null, {});
  }
};
