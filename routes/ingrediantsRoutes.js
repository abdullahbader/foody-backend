const multer = require("multer");
const {
  ingrediantList,  
} = require("../controllers/ingrediantsController");
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



router.get("/", ingrediantList);


module.exports = router;