var express = require('express');
var router = express.Router();
const vegan = require("../routes/vegan");
const vegetarian = require("../routes/vegetarian");
const favorites = require("../routes/favorites");
const stock = require("../routes/stock");
const grocerylist = require("../routes/grocerylist");
const search = require("../routes/search");
const recommendations = require("../routes/recommendations");


// serve angular app files from the '/app' route
router.use('/', express.static('app'));

router.use("/vegan", vegan);
router.use("/vegetarian", vegetarian);
router.use("/favorites", favorites);
router.use("/stock", stock);
router.use("/grocerylist", grocerylist);
router.use("/search", search);
router.use("/recommendations", recommendations);


module.exports = router;