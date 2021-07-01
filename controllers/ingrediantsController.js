const { Ingrediant, Recipe, IngrediantRecipes } = require("../db1/models");

exports.ingrediantList = async (req, res, next) => {
  try {
    const ingrediants = await Ingrediant.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Recipe,
        as: "recipes",
        required: false,
        attributes: ["id"],
        through: {
          model: IngrediantRecipes,
          as: "ingrediantRecipes",
        },
      },
    });
    res.json(ingrediants);
  } catch (error) {
    next(error);
  }
};
