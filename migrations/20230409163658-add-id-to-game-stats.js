"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove primary key constraint from the id column
    await queryInterface.removeConstraint("games", "games_pkey");

    // Modify the id column to add auto-increment
    await queryInterface.changeColumn("games", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    });

    // Add the primary key constraint to the id column
    await queryInterface.addConstraint("games", {
      type: "primary key",
      fields: ["id"],
      name: "games_pkey",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove primary key constraint from the id column
    await queryInterface.removeConstraint("games", "games_pkey");

    // Modify the id column to remove auto-increment
    await queryInterface.changeColumn("games", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false,
    });

    // Add the primary key constraint to the id column
    await queryInterface.addConstraint("games", {
      type: "primary key",
      fields: ["id"],
      name: "games_pkey",
    });
  },
};
