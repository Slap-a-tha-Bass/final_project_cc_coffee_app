CREATE DATABASE cc_coffee_app;
USE cc_coffee_app;

DROP TABLE IF EXISTS Drinks;
CREATE TABLE Drinks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price DECIMAL(5,2) NOT NULL
);
INSERT INTO Drinks (name, price) VALUES ('Water', 2), ('Latte', 3.50), ('Cortado', 3.50), ('Cappuccino', 4), ('Breve', 3.75), ('Americano', 3), ('Mocha', 4.50);
SELECT * FROM Drinks;
DROP TABLE IF EXISTS Snacks;
CREATE TABLE Snacks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price DECIMAL(5,2) NOT NULL
);
SELECT * FROM Snacks;
INSERT INTO Snacks (name, price) VALUES ('Panini', 7), ('Bagel', 3), ('Cookie', 2.50), ('Parfait', 4.50), ('Grits', 5), ('Crepe', 7.50), ('Omelette', 8);
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
	id CHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(24) NOT NULL, 
    price DECIMAL(5,2) NOT NULL,
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
INSERT INTO Users (id, full_name, email, password) VALUES ('167569ad-fb47-4e98-8c2b-e7df60887d9f', 'Harry Potter', 'harry@test.com', '$2b$12$blWKGTT82XAzGvMjKVIyGe/Tj3AhHzi7znxD755DK4zy0OkXiQBp2');
SELECT * FROM Users;
