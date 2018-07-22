var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var con = mysql.createConnection({
    host: "localhost",
    // Your port; if not 8889 <-- replace with current port
    port: 8889,
    // Your username
    user: "root",
    // Your password
    password: "root",
    //   database: "BAMAZON" //<-- will be created
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS BAMAZON;", function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.protocol41) {
            console.log("Database already exists")
        }else{
            console.log("Database created");
        }
    });
    // Create table
    con.changeUser({database : 'BAMAZON'}, function(err) {
        if (err) throw err;
      });
    let createProducts = `USE BAMAZON;CREATE TABLE IF NOT EXISTS products(
        id int primary key auto_increment,
        title varchar(255)not null,
        completed tinyint(1) not null default 0
    )`;

    con.query(createProducts, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
    connection.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
});

