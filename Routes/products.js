const express = require("express");

const {
  getAllProducts,
  getAllProductsStatic,
  application
} = require("../Controllers/products");


const router = express.Router();

router.route("/application").get(application);
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
