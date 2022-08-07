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
    percent_stocked: Number,
    vegetarian: String,
    vegan: String,
    favorited: String,
    ingredients: Array,
    instructions: String
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

//All recipes, but sorted by percentage in stock
app.get('/recommendations', function (req, res) {
    Recipe.find({percent_stocked: {$gte:40}}, function(err, recipes){
        res.render('recommendations', {
            recipeList: recipes
        })
    }).sort( { percent_stocked : -1} )
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

//only recipes that include a given ingredient
app.get('/search', function (req, res) {
    Recipe.find( { }, function(err, recipes){
        res.render('search', {
            recipeList: recipes
        })
    })
});

//for now, just / 
app.post('/allrecipes', function(req, res){
    return res.redirect('/search');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});