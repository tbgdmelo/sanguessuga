'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Hospitals', [
      {
        nome: 'Hospital Adventista de Manaus',
        endereco: 'Av. Gov. Danilo de Matos Areosa, 139 - Distrito Industrial I',
      },
      {
        nome: 'Hospital Universitário Francisca Mendes',
        endereco: 'Av. Camapuã, 108 - Cidade Nova II',
      },
      {
        nome: 'Hospital e Pronto Socorro Dr Aristóteles Platão Bezerra de Araújo',
        endereco: 'Av. Autaz Mirim, s/n - Jorge Teixeira',
      },
      {
        nome: 'Hospital e Pronto Socorro Dr. João Lúcio Pereira Machado',
        endereco: 'Av. Cosme Ferreira, 3937 - Coroado',
      },
      {
        nome: 'Hospital Nilton Lins',
        endereco: 'Flores',
      },
      {
        nome: 'Hospital Beneficente Português',
        endereco: 'Av. Joaquim Nabuco, 1359 - Centro',
      },
      {
        nome: 'Hospital Santa Júlia',
        endereco: 'Av. Alvaro Maia, 510 - Centro',
      },
      {
        nome: 'Check Up Hospital',
        endereco: 'Av. Paraiba, 500 - Adrianópolis',
      },
      {
        nome: 'Fundaçao Hospital Adriano Jorge',
        endereco: 'Av. Carvalho Leal, 1778 - Cachoeirinha',
      },
      {
        nome: 'Hospital Delphina Rinaldi Abdel Aziz',
        endereco: 'Av. Torquato Tapajós, 9250 - Colônia Terra Nova',
      },
      {
        nome: 'Clínica e Maternidade de Manaus',
        endereco: 'Av. Constantino Nery, 550 - Centro',
      },
      {
        nome: 'Hospital Rio Amazonas',
        endereco: 'R. Prof. Márciano Armond, 1401 - Cachoeirinha',
      },
      {
        nome: 'Hospital Universitário Getúlio Vargas',
        endereco: 'R. Tomas de Vila Nova, 4 - Nossa Sra. das Gracas',
      },
      {
        nome: 'Hospital Unimed Parque das Laranjeiras - HUPL',
        endereco: 'Av. Prof. Nilton Lins, 3259 - Parque das Laranjeiras',
      },
      {
        nome: 'Hospital HEMOAM',
        endereco: 'Av. Pedro Teixeira, 168 - Dom Pedro',
      },
      {
        nome: 'Pronto Socorro da Crianca - São José',
        endereco: 'Alameda Cosme Ferreira 3775 São José 1',
      },
      {
        nome: 'Hospital Rio Solimões',
        endereco: 'R. Belém, 771 - Adrianópolis',
      },
      {
        nome: 'Instituto de medicina Intensiva',
        endereco: 'R. Belém, 1401 - Cachoeirinha',
      },
      {
        nome: 'Hospital Santo Alberto',
        endereco: 'Av. Manicoré, 536 - Cachoeirinha',
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Hospitals', null, {});
  }
};
