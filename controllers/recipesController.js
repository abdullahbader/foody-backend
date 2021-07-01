const { Recipe, Ingrediant, IngrediantRecipes } = require("../db1/models");

exports.recipeCreat = async (req, res, next) => {
  console.log(req.body);
  try {
    const newRecipe = await Recipe.create(req.body);
    const arrayx = req.body.ingrediants.map((ingrediant) => ({
      ingrediantId: ingrediant,
      recipeId: newRecipe.id,
    }));
    IngrediantRecipes.bulkCreate(arrayx);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};
// recipeCreat.addRecipe(ingrediantCreat);

exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Ingrediant,
        as: "ingrediants",
        required: false,
        attributes: ["id", "name"],
        through: {
          model: IngrediantRecipes,
          as: "ingrediantRecipes",
          attributes: ["recipeId", "ingrediantId"],
        },
      },
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};
