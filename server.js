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

const ingredientSchema = {
    name: String,
    stocked: String,
    category: String,
    quantity_stocked: Number,
    units: String,
    needed: String,
    quantity_needed: Number
}

const Ingredient = mongoose.model("Ingredient", ingredientSchema);


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
    Recipe.find( { vegan: "TRUE" }, function(err, recipes){
        res.render('vegan', {
            recipeList: recipes
        })
    })
});

//only show recipes that are vegetarian
app.get('/vegetarian', function (req, res) {
    Recipe.find( { vegetarian: "TRUE" }, function(err, recipes){
        res.render('vegetarian', {
            recipeList: recipes
        })
    })
});

//only show recipes that are favorites
app.get('/favorites', function (req, res) {
    Recipe.find( { favorited: "TRUE" }, function(err, recipes){
        res.render('favorites', {
            recipeList: recipes
        })
    })
});

//only items in stock
app.get('/stock', function (req, res) {
    Ingredient.find( { stocked: "TRUE"}, function(err, ingredients){
        res.render('stock', {
            ingredientList: ingredients
        })
    })
});

//only items on the grocery list
app.get('/grocerylist', function (req, res) {
    Ingredient.find( { needed: "TRUE"}, function(err, ingredients){
        res.render('grocerylist', {
            ingredientList: ingredients
        })
    })
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});