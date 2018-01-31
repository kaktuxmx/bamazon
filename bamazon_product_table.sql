-- Created the database with the line below
-- create database bamazon;

-- Create the table with the lane below.
/* create table products (
	item_id int primary key not null auto_increment,
    product_name varchar (35) not null,
    department_name varchar (35) not null,
    price dec (50,2) not null,
    stock_quantity  int not null

); */

-- I have insert all the products with the following lines of code below:

insert into products (product_name, department_name, price, stock_quantity)
values ("Sega Genesis 2.0", "Video Games", 1579.99, 12) 