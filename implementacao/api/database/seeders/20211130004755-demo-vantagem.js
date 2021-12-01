'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('vantagem', [{
      parceiro_id: 1,
      valor: 50,
      descricao: "Office366",
      foto: "https://i.imgur.com/JBWIoFr.png",
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vantagem', null, {});
  }
};
