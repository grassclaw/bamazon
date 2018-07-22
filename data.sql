/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS BAMAZON;

/* Create database */
CREATE DATABASE BAMAZON;
USE BAMAZON;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
