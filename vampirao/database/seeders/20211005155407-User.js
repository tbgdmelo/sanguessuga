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
        nivel: "Administrador",
        centro: "Administrador"
      },
      {
        cpf: "894.891.540-16",
        nome:"Admin",
        sobrenome: "Hemoam",
        senha: await brcypt.hash("adminhemoam",10),
        email: "adminhemoam@gmail.com",
        pontuacao: 0,
        telefone: "",
        nascimento: "2021-01-10",
        id_sangue: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
        nivel: "Administrador",
        centro: "Hemoam - Fundação Hospitalar de Hematologia e Hemoterapia do Amazonas"
      },
      {
        cpf: "456.281.590-69",
        nome:"Admin",
        sobrenome: "Doe Vida",
        senha: await brcypt.hash("admindoevida",10),
        email: "admindoevida@gmail.com",
        pontuacao: 0,
        telefone: "",
        nascimento: "2021-01-10",
        id_sangue: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
        nivel: "Administrador",
        centro: "DOE VIDA"
      },
      {
        cpf: "967.718.180-71",
        nome:"Admin",
        sobrenome: "Hemoam São José I",
        senha: await brcypt.hash("adminsj1",10),
        email: "adminhemoamsj1@gmail.com",
        pontuacao: 0,
        telefone: "",
        nascimento: "2021-01-10",
        id_sangue: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: true,
        nivel: "Administrador",
        centro: "HEMOAM-São Jose I"
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
