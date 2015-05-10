// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var pokedex_route = require('./controller/pokedex');
var trainer_route = require('./controller/trainer');
var enemy_route = require('./controller/enemy');
var gym_route = require('./controller/gym');

// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Lab 18');

//configure routes
app.use('/', routes);
app.use('/pokedex', pokedex_route);
app.use('/trainer', trainer_route);
app.use('/enemy', enemy_route);
app.use('/gym', gym_route);

// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 3011);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));