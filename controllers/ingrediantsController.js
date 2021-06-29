const { Ingrediant } = require("../db/models");

exports.ingrediantList = async (req, res) => {
    try {
      const ingrediants = await Ingrediant.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(ingrediants);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
