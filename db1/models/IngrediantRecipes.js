const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const IngrediantRecipes = sequelize.define("IngrediantRecipes", {
    ingrediantId: { type: DataTypes.INTEGER },

    recipeId: { type: DataTypes.INTEGER },
  });
  SequelizeSlugify.slugifyModel(IngrediantRecipes, { source: ["name"] });

  return IngrediantRecipes;
};
