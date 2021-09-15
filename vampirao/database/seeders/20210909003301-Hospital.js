'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Hospitals', [
      {
        nome: 'Hospital Adventista de Manaus',
        endereco: 'Av. Gov. Danilo de Matos Areosa, 139 - Distrito Industrial I',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Universitário Francisca Mendes',
        endereco: 'Av. Camapuã, 108 - Cidade Nova II',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital e Pronto Socorro Dr Aristóteles Platão Bezerra de Araújo',
        endereco: 'Av. Autaz Mirim, s/n - Jorge Teixeira',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital e Pronto Socorro Dr. João Lúcio Pereira Machado',
        endereco: 'Av. Cosme Ferreira, 3937 - Coroado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Nilton Lins',
        endereco: 'Flores',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Beneficente Português',
        endereco: 'Av. Joaquim Nabuco, 1359 - Centro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Santa Júlia',
        endereco: 'Av. Alvaro Maia, 510 - Centro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Check Up Hospital',
        endereco: 'Av. Paraiba, 500 - Adrianópolis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Fundaçao Hospital Adriano Jorge',
        endereco: 'Av. Carvalho Leal, 1778 - Cachoeirinha',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Delphina Rinaldi Abdel Aziz',
        endereco: 'Av. Torquato Tapajós, 9250 - Colônia Terra Nova',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Clínica e Maternidade de Manaus',
        endereco: 'Av. Constantino Nery, 550 - Centro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Rio Amazonas',
        endereco: 'R. Prof. Márciano Armond, 1401 - Cachoeirinha',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Universitário Getúlio Vargas',
        endereco: 'R. Tomas de Vila Nova, 4 - Nossa Sra. das Gracas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Unimed Parque das Laranjeiras - HUPL',
        endereco: 'Av. Prof. Nilton Lins, 3259 - Parque das Laranjeiras',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital HEMOAM',
        endereco: 'Av. Pedro Teixeira, 168 - Dom Pedro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Pronto Socorro da Crianca - São José',
        endereco: 'Alameda Cosme Ferreira 3775 São José 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Rio Solimões',
        endereco: 'R. Belém, 771 - Adrianópolis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Instituto de medicina Intensiva',
        endereco: 'R. Belém, 1401 - Cachoeirinha',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Hospital Santo Alberto',
        endereco: 'Av. Manicoré, 536 - Cachoeirinha',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Hospitals', null, {});
  }
};
