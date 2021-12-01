'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuario', [{
      usuario: "microovits",
      senha: "minhaSuperSenha",
      tipo: "E",
    }], {});
    return await queryInterface.bulkInsert('parceiro', [{
      usuario_id: 2,
      nome: "Micro-Ovits",
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('parceiro', null, {});
  }
};
