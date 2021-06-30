const { Category } = require("../db1/models");
const { Ingrediant } = require("../db1/models");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.categoryCreat = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.ingrediantCreat = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.categoryId = req.category.id;
    const newIngrediant = await Ingrediant.create(req.body);
    res.status(201).json(newIngrediant);
  } catch (error) {
    next(error);
  }
};
exports.categoryList = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Ingrediant,

        as: "ingrediants",

        attributes: ["id"],
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
