var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all Pokemon in a <table> */
router.get('/all', function (req, res) {
    db.GetAllPoke(function (err, result) {
            if (err) throw err;
            res.render('displayPokedexTable.ejs', {rs: result});
        }
    );
});


/* View a single Pokemon's information */
router.get('/', function (req, res) {
    if(req.query.PokeID == null) {
        res.redirect('/pokedex/all');
    }
    else {
        db.GetPokeByID(req.query.PokeID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayPokedexInfo.ejs', {rs: result, PokeID: req.query.PokeID});
            }
        );
    }
});


/* View a single Pokemon's information */
router.post('/', function (req, res) {
    if(req.body.PokeID == null) {
        res.send("The PokeID parameter was not provided")
    }
    else {
        db.GetPokeByID(req.body.PokeID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayPokedexInfoSnippet.ejs', {rs: result, PokeID: req.body.PokeID});
            }
        );
    }
});

// Create Pokedex Form
router.get('/create', function(req, res){
    res.render('createPokedexForm.ejs', {action: '/pokedex/create'});
});

// Save Pokemon information
router.post('/create', function (req, res) {
    db.InsertPoke( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(req.body.PokeID);

            if(result.insertId !== 'undefined') {
                db.GetPokeByID(req.body.PokeID, function(err, result){

                    res.render('displayPokedexInfoSnippet.ejs', {rs: result, PokeID: req.body.PokeID});

                });
            }
            else {
                res.send('Pokemon was not inserted.');
            }
        }
    );
});

/* View all users in a drop down menu */
router.get('/dropdown', function (req, res) {
    db.GetPokeView(function (err, result) {
            if (err) throw err;
            res.render('displayPokedexDropDownAJAX.ejs', {rs: result});
        }
    );
});

module.exports = router;

