var express = require('express');
var router = express.Router();
const vegan = require("../routes/vegan");
const vegetarian = require("../routes/vegetarian");
const favorites = require("../routes/favorites");


// serve angular app files from the '/app' route
router.use('/', express.static('app'));

router.use("/vegan", vegan);
router.use("/vegetarian", vegetarian);
router.use("/favorites", favorites);


module.exports = router;