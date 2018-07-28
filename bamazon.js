var inquirer = require("inquirer");
var bamazon = require('./bamazonCustomer');

//ONCE DATABASE AND TABLE ARE VERIFIED AS CONSTRUCTED THEN WE INITIALIZE START
//THE USER IS PROMPTED TO INITIALIZE by selecting continue
inquirer
    .prompt({
        name: "Initialize",
        type: "list",
        message: "Would you like to enter the BAMAZON?",
        choices: [
            "Yes let's enter BAMAZON",
            "No, I'll come back later"
        ]
    })
    .then(function (answer) {
        switch (answer.Initialize) {
            case "Yes let's enter BAMAZON":
                console.log(bamazon.InitialInventory);
                bamazon.userSetup();//checks database and table and creates if necessary

                console.log("******************************************")
                console.log("** WELCOME TO BAMAZON: PRINTING CURRENT **")
                console.log("***               INVENTORY.            **")
                console.log("******************************************")
                //call bamazon method from object in mabazonCustomer object
                bamazon.start();
                bamazon.closeStore();
                break;

            case "No, I'll come back later":
                console.log("Ok! See you later!");
                bamazon.closeStore();
                break;
        }
    });



