var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('select * from Student',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetAllPoke = function(callback) {
    connection.query('select * from Pokedex',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetAllView = function(callback) {
    console.log("You must create the StudentsView MySQL VIEW for the sql statement below to work.");
    // To create the StudentsView run the CREATE VIEW query below via the mysql client or mysql workbench.
    // CREATE VIEW StudentsView AS SELECT * FROM Students;
    connection.query('select Student_number, Name from StudentsView',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetPokeView = function(callback) {
    connection.query('select * from Pokedex',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetByID = function(studentid, callback) {
    console.log(studentid);
    var query = 'select * from Student WHERE Student_number=' + studentid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetPokeByID = function(PokeID, callback) {
    console.log(PokeID);
    var query = 'select * from Pokedex WHERE PokeID=' + PokeID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(student_info, callback) {
    console.log(student_info);
    var query = 'INSERT INTO Student (Name, Major, Location) VALUES (\'' + student_info.name + '\', \'' + student_info.major + '\', \'' + student_info.location + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.InsertPoke = function(poke_info, callback) {
    console.log(poke_info);
    if (poke_info.Secondary_type == '') {
        var query = 'INSERT INTO Pokedex (PokeID, Name, Level, Primary_type, Secondary_type, Weakness)' +
            ' VALUES (' + poke_info.PokeID + ', \'' + poke_info.Name + '\', ' + poke_info.Level + ', \'' + poke_info.Primary_type + '\', ' + 'null' + ', \'' + poke_info.Weakness + '\')';
    }
    else {
        var query = 'INSERT INTO Pokedex (PokeID, Name, Level, Primary_type, Secondary_type, Weakness)' +
            ' VALUES (' + poke_info.PokeID + ', \'' + poke_info.Name + '\', ' + poke_info.Level + ', \'' + poke_info.Primary_type + '\', \'' + poke_info.Secondary_type + '\', \'' +  poke_info.Weakness + '\')';
    }
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}