require('rootpath')();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config.json');
var mongoose = require('mongoose');

var db = mongoose.connect(config.connectionString)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const recipeSchema = {
    name : String,
    vegetarian: String,
    vegan: String,
    favorited: String,
    ingredients: Array
}

const Recipe = mongoose.model("Recipe", recipeSchema);


// routes
app.use('/app', require('./controllers/appController'));

// make '/app' default route
app.get('/', function (req, res) {
    Recipe.find({}, function(err, recipes){
        res.render('index', {
            recipeList: recipes
        })
    })
});

//only show recipes that are vegan
app.get('/vegan', function (req, res) {
    Recipe.find( { vegan: "true" }, function(err, recipes){
        res.render('vegan', {
            recipeList: recipes
        })
    })
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});