CREATE DATABASE cc_coffee_app;
USE cc_coffee_app;

DROP TABLE IF EXISTS Drinks;
CREATE TABLE Drinks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price DECIMAL(5,2) NOT NULL
);
DROP TABLE IF EXISTS DrinksOrder;
CREATE TABLE DrinksOrder (
	id INT AUTO_INCREMENT PRIMARY KEY,
    drink_id INT NOT NULL,
    FOREIGN KEY (drink_id) REFERENCES Drinks(id),
    dr_quantity SMALLINT NOT NULL,
    order_id CHAR(36) NOT NULL,
    CONSTRAINT dr_order_id
    FOREIGN KEY (order_id) REFERENCES Orders(id)
    ON DELETE CASCADE
);
SELECT * FROM DrinksOrder;
INSERT INTO Drinks (name, price) VALUES ('No drink', 0.00), ('Water', 2), ('Latte', 3.50), ('Cortado', 3.50), ('Cappuccino', 4), ('Breve', 3.75), ('Americano', 3), ('Mocha', 4.50);
SELECT * FROM Drinks;
DROP TABLE IF EXISTS Snacks;
CREATE TABLE Snacks (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (36) NOT NULL,
    price DECIMAL(5,2) NOT NULL
);
DROP TABLE IF EXISTS SnacksOrder;
CREATE TABLE SnacksOrder (
	id INT AUTO_INCREMENT PRIMARY KEY,
    snack_id INT NOT NULL,
    FOREIGN KEY (snack_id) REFERENCES Snacks(id),
    sn_quantity SMALLINT NOT NULL,
    order_id CHAR(36) NOT NULL,
    CONSTRAINT sn_order_id
    FOREIGN KEY (order_id) REFERENCES Orders(id) 
    ON DELETE CASCADE
);
SELECT * FROM SnacksOrder;
INSERT INTO Snacks (name, price) VALUES ('No snack', 0.00), ('Panini', 7), ('Bagel', 3), ('Cookie', 2.50), ('Parfait', 4.50), ('Grits', 5), ('Crepe', 7.50), ('Omelette', 8);
DROP TABLE IF EXISTS Orders;
SELECT * FROM Orders;
CREATE TABLE Orders (
	id CHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(24) NOT NULL, 
    _created DATETIME DEFAULT NOW(),
    _updated DATETIME ON UPDATE NOW(),
    in_progress TINYINT,
    is_finished TINYINT
);
SELECT o.id, 
		GROUP_CONCAT(distinct d.name ORDER BY d.id separator '&') as drink_names, 
		GROUP_CONCAT(distinct s.name ORDER BY s.id separator '&') as snack_names, 
		GROUP_CONCAT(distinct d.price ORDER BY d.id separator '&') as drink_prices, 
		GROUP_CONCAT(distinct s.price ORDER BY s.id separator  '&') as snack_prices,
		GROUP_CONCAT(distinct do.drink_id separator '&') as drink_id,
        GROUP_CONCAT(distinct do.dr_quantity ORDER BY do.drink_id) as dr_quantity,
        GROUP_CONCAT(distinct so.snack_id separator '&') as snack_id,
        GROUP_CONCAT(distinct so.sn_quantity ORDER BY so.snack_id) as sn_quantity 
FROM Orders o 
        JOIN SnacksOrder so ON o.id=so.order_id 
        JOIN DrinksOrder do ON o.id=do.order_id 
        JOIN Snacks s ON so.snack_id=s.id 
        JOIN Drinks d ON do.drink_id=d.id GROUP BY o.id;
        
SELECT o.id FROM Orders o JOIN DrinksOrder do ON o.id=do.order_id JOIN Drinks d ON do.drink_id=d.id GROUP BY o.id;
SELECT o.id, do.drink_id, do.dr_quantity FROM Orders o JOIN DrinksOrder do ON o.id=do.order_id;
SELECT o.id, do.drink_id, do.dr_quantity, so.snack_id, so.sn_quantity FROM Orders o JOIN DrinksOrder do ON o.id=do.order_id JOIN SnacksOrder so ON o.id=so.order_id;
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id CHAR(36) NOT NULL PRIMARY KEY,
	full_name varchar(60) NOT NULL,
	email VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(60) NOT NULL,
	role VARCHAR(24) DEFAULT 'guest',
	_created DATETIME DEFAULT NOW()
);
DROP TABLE IF EXISTS Receipts;
CREATE TABLE Receipts (
	id INT AUTO_INCREMENT PRIMARY KEY,
    receiptURL VARCHAR(255) NOT NULL,
    fullName VARCHAR(64) NOT NULL,
    amount DECIMAL(5,2) NOT NULL,
    _created DATETIME DEFAULT NOW()
);
SELECT * FROM Receipts;
INSERT INTO Users (id, full_name, email, password) VALUES ('167569ad-fb47-4e98-8c2b-e7df60887d9f', 'Harry Potter', 'harry@test.com', '$2b$12$blWKGTT82XAzGvMjKVIyGe/Tj3AhHzi7znxD755DK4zy0OkXiQBp2');
SELECT * FROM Users;
DROP TABLE IF EXISTS tokens;
CREATE TABLE tokens (
	id CHAR(36) PRIMARY KEY,
	_created DATETIME DEFAULT NOW(),
    _expires DATETIME,
    is_used TINYINT DEFAULT 0
);

