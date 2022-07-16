var express = require('express');
var router = express.Router();
const vegan = require("../routes/vegan");


// serve angular app files from the '/app' route
router.use('/', express.static('app'));

router.use("/vegan", vegan);

module.exports = router;