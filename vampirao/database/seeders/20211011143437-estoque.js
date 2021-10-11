'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Estoques', [
      //estoque do centro 1 para exemplo
      {
        id_centro: 1,
        id_sangue: 1,
        quantidade: "Crítico",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 2,
        quantidade: "Alerta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 3,
        quantidade: "Normal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 4,
        quantidade: "Ótimo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 5,
        quantidade: "Crítico",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 6,
        quantidade: "Alerta",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 7,
        quantidade: "Normal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_centro: 1,
        id_sangue: 8,
        quantidade: "Ótimo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Estoques', null, {});
  }
};
