'use strict';
const brcypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        cpf: "668.514.520-06",
        nome:"Super",
        sobrenome: "Admin",
        senha: await brcypt.hash("adminadmin",10),
        email: "sng.resetpass@gmail.com",
        pontuacao: 0,
        telefone: "",
        nascimento: "2021-01-10",
        id_sangue: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
