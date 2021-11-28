'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuario', [{
      usuario: "laerte",
      senha: "minhaSuperSenha",
      tipo: "P",
    }], {});
    return await queryInterface.bulkInsert('professor', [{
      usuario_id: 2,
      nome: "Laerte",
      departamento: "Software",
      cpf: "222.222.222-22",
      saldo: 0,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor', null, {});
  }
};
