const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Ingrediant = sequelize.define("Ingrediant", {
    name: { type: DataTypes.STRING, allowNull: false },

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    image: DataTypes.STRING,
  });

  SequelizeSlugify.slugifyModel(Ingrediant, { source: ["name"] });

  Ingrediant.associate = (models) => {
    models.Category.hasMany(Ingrediant, {
      foreignKey: "categoryId",
      as: "ingrediants",
    });
    Ingrediant.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });

    Ingrediant.belongsToMany(models.Recipe, {
      through: "IngrediantRecipes",
      as: "recipes",
      foreignKey: "ingrediantId",
    });

    models.Recipe.belongsToMany(Ingrediant, {
      through: "IngrediantRecipes",
      as: "ingrediants",
      foreignKey: "recipeId",
    });
  };

  return Ingrediant;
};
