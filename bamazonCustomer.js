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
    database: "BAMAZON" //<-- will be created
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;


////SECOND MODULE TO EXPORT
module.exports = {
    InitialInventory: {//This is the initial inventory that the user is provided with
        1: ["Hedgie Backpack", "PETS", 180.73, 15], //Pets is an initial category
        2: ["Hedgie Water Bottle", "PETS", 58.13, 5],
        3: ["Hedgie Toy", "PETS", 38.79, 46],
        4: ["Foldable Rock Hammer", "OUTDOORS", 89.54, 10], //Outdoors is an initial category
        5: ["Thors Might", "CHILDREN", 76.78, 9], //Children is an initial category
        6: ["Decorative Cloth", "DECOR", 12.23, 2], //Decor is an initial category
        7: ["Giant Mirror", "DECOR", 717.00, 119],
        8: ["Tamed Otter", "LIVE ANIMALS", 1000000, 2], //Live Animals is an initial category
        9: ["Naked Molerats", "LIVE ANIMALS", 3.11, 5],
        10: ["Shoe Rack", "DECOR", 7.99, 19]
    },
    userSetup: function () {
        // Create DB if it doesn't exist**********************************************************
        con.query("CREATE DATABASE IF NOT EXISTS BAMAZON;", function (err, result) {
            if (err) throw err;
            if (result.protocol41) {
                console.log("\n\nBAMAZON DB Exists...Connected...")
            } else {
                console.log("\n\nDatabase created");
            }
        });
        // Create table if it doesn't exists**********************************************************
        con.changeUser({ database: 'BAMAZON' }, function (err) {//Since Bamazon was just created we "switch over to it"
            if (err) throw err;
        });
        // This is the table format - "products"
        let createTable = `USE BAMAZON; CREATE TABLE IF NOT EXISTS products(
        item_id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(255)NOT NULL,
        department_name VARCHAR(255)NOT NULL,
        price DECIMAL(10,4) NOT NULL,
        stock_quantity INT,
        PRIMARY KEY (item_id))`;
        // Initialize the creation of the Table
        con.query(createTable, function (err) {
            if (err) {
                console.log("\n\nData Storage Table (products) exists...Connected...\n\n");
                return; //this prevents the initial ten items from populating into the table again
            }
            //CALL CREATE PRODUCTS TO START WITH 10 Items for first time the table was created
            for (x in bamazon.InitialInventory) {
                bamazon.create(bamazon.InitialInventory[x]);
            }
        });
    },
    start: function () {
        //Start by printing current inventory

        this.read();

        //Menu method call
        this.MainMenu();
    },
    MainMenu: function () {


    },
    create: function (ProdArray) { // CREATE PRODUCTS FORMULA
        console.log("Inserting a new product...\n");
        var query = con.query(
            "INSERT INTO products SET ?",
            {
                //item_id INT NOT NULL AUTO_INCREMENT, THIS AUTOMATICALLY ADDS
                product_name: ProdArray[0],     //VARCHAR(255)NOT NULL,
                department_name: ProdArray[1],   //VARCHAR(255)NOT NULL,
                price: ProdArray[2],           //DECIMAL(10,4) NOT NULL,
                stock_quantity: ProdArray[3],  //INT
            },
            function (err, res) {
                console.log(res.affectedRows + " product(s) inserted!\n");
            }
        );
        // logs the actual query being run
        console.log(query.sql);
    },
    read: function () {
        console.log("Selecting all products...\n");
        con.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(res);
            con.end();
        });
    },
    closeStore: function () {
        // End the connection to server
        con.end(function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
    }
}



