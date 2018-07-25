
var bamazon = {
    create: function createProduct(ProdArray) { // CREATE PRODUCTS FORMULA
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
    read: function readProducts() {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(res);
          connection.end();
        });
      }
}



