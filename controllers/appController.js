var express = require('express');
var router = express.Router();
const vegan = require("../routes/vegan");
const vegetarian = require("../routes/vegetarian");


// serve angular app files from the '/app' route
router.use('/', express.static('app'));

router.use("/vegan", vegan);
router.use("/vegetarian", vegetarian);

module.exports = router;