const multer = require("multer");
const {
  categoryCreat,
  categoryList,
  ingrediantCreat,
  fetchCategory
} = require("../controllers/categoriesController");
const express = require("express");

const router = express.Router();


const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null,`${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});


router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchCategory(categoryId, next);
  if (category) {
    req.category = category;

    next();
  } else {
    const err = new Error("category not found");
    err.status = 404;
    next(err);
  }
});
router.get("/", categoryList);
router.post("/", upload.single("image"), categoryCreat);
router.post("/:categoryId/ingrediants", upload.single("image"), ingrediantCreat);

module.exports = router;
