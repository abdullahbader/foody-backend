const multer = require("multer");
const { recipeList } = require("../controllers/recipesController");
const { recipeCreat } = require("../controllers/recipesController");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.get("/", recipeList);
router.post("/", recipeCreat);

module.exports = router;
