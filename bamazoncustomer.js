// This are the packages that I am using for the app.
const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require("cli-table");

// Starting the const to do the connection for SQL.
const connectionsql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'Thorcito', // Here is where the passwords goes to start app in localhost.
    database:'bamazon'
});

connectionsql.connect();


// This is to show the table to the customers, table was created using cri-table.
   
function display() {
       connectionsql.query('select * from products', function(err, res) {
       var table = new Table({
        head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
        });
      console.log("--------------------------Welcome to La Tienda in NODE!--------------------------------");
        for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price_tocust, res[i].stock_quantity]);
    };
        console.log("---------------------------------------------------------------------------------------");
        console.log(table.toString());
    
       }
    )};


display();
buyingscript();
// Create funtion to put the inquerer about the shoppoing.

function buyingscript() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'product_id',
            message: 'Hello, please pick the number of the product that you want to buy',
            filter: Number
            },
            {
            type: 'input',
            name: 'quantity',
            message: 'Please select the quantity of the product you want to buy',
            filter: Number
            }
    ]).then( res => {
        productnumber = JSON.stringify(res.product_id);
        quantityamount = JSON.stringify(res.quantity);
        purchase(productnumber, quantityamount); 
    }) };


    function purchase (productselected, quantityfc) {
        query1 = "select stock_quantity from products where item_id = " + productselected;
        connectionsql.query(query1, function (err, res) {
            if (err) throw err;

            stockuoldvalue = (JSON.stringify(res[0].stock_quantity));

            if (quantityfc <= stockuoldvalue){
                    valuetoupdate = stockuoldvalue - quantityfc;
                    console.log(valuetoupdate);
                        updatetablevalue(productselected, valuetoupdate);
                    } else {
                        console.log("Sorry there are no more products available. Try again with quantity equal or less than " + stockuoldvalue);
                            
            }; 
                })};
    
    function updatetablevalue(productselected, valuetoupdate) {
        query2 = 'update products set stock_quantity = ' + valuetoupdate + ' where item_id = ' + productselected;
        connectionsql.query(query2, function(err, ans){ 
                            if (err) throw err;
                            console.log("Thank you for your purchase!")
                            connectionsql.end();
                            });
    };