CREATE DATABASE cc_coffee_app;
USE cc_coffee_app;

DROP TABLE IF EXISTS Drinks;
CREATE TABLE Drinks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price SMALLINT NOT NULL
);

DROP TABLE IF EXISTS Snacks;
CREATE TABLE Snacks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price SMALLINT NOT NULL
);
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
	id CHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(24) NOT NULL, 
    drink_id INT,
    snack_id INT,
    FOREIGN KEY (drink_id) REFERENCES Drinks(id),
    FOREIGN KEY (snack_id) REFERENCES Snacks(id),
    _created DATETIME DEFAULT NOW(),
    _updated DATETIME ON UPDATE NOW(),
    in_progress TINYINT,
    is_finished TINYINT
);
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id CHAR(36) NOT NULL PRIMARY KEY,
	full_name varchar(60) NOT NULL,
	email VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(60) NOT NULL,
	role VARCHAR(24) DEFAULT 'guest',
	_created DATETIME DEFAULT NOW()
);
