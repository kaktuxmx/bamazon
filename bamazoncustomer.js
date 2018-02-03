// This are the packages that I am using for the app.
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// Starting the const to do the connection for SQL.
const connectionsql = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user:'root',
    password:'', // Here is where the passwords goes to start app in localhost.
    database:'bamazon'
});

connectionsql.connect((err) => {
    if(err) throw err;
    console.log("-----------Welcome to the Store in NODE!-------");
});

var display = function() {
       connectionsql.query('select * from products', function(err, res) {
       var table = new Table({
        head: ['Product ID', 'Department', 'Product Name', 'Price', 'Stock Quantity'],
        });
      
        for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price_tocust, res[i].stock_quantity]);
    };
        console.log("--------------------------------------------------------");
        console.log(table.toString());
    
       }
    )};

display();
