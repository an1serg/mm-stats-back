"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("games", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("games", "id", {
      type: Sequelize.INTEGER,
    });
  },
};
