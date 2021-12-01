'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vantagem', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parceiro_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references : {
          model : 'Parceiro',
          key : 'id'
        }
      },
      valor: {
        type: Sequelize.DOUBLE(),
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      foto: {
        type: Sequelize.STRING(120),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vantagem');
  }
};
