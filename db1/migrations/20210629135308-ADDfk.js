"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Ingrediants", "categoryId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Categories",
        },
        key: "id",
        //"asdasd"
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Ingrediants", "categoryId");
  },
};