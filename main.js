'use strict'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');

db.run('CREATE TABLE IF NOT EXISTS customer (CustomerId INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, Address TEXT, City TEXT, State TEXT, PostalCode INT, PhoneNumber TEXT)');
db.run('CREATE TABLE IF NOT EXISTS payment_options (PaymentOptionsId INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, AccountNumber INT)');
db.run('CREATE TABLE IF NOT EXISTS products (ProductId INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Price DECIMAL (20, 2))');
db.run('CREATE TABLE IF NOT EXISTS orders (OrderId INTEGER PRIMARY KEY AUTOINCREMENT, CustomerId INT, PaymentOptionsId INT, PaidInFull TEXT)');
db.run('CREATE TABLE IF NOT EXISTS order_line_items (OrderLineId INTEGER PRIMARY KEY AUTOINCREMENT, OrderId INT, ProductId INT)');

const populateCustomers= () => {
	const { customers } = require('./JSON/customers.json')

	customers.forEach(cust => {
		db.run(`INSERT INTO customer VALUES (
			null,
			"${cust.firstName}",
			"${cust.lastName}",
			"${cust.address}",
			"${cust.city}",
			"${cust.state}",
			${cust.postalCode},
			"${cust.phoneNumber}")`)
	})
}

populateCustomers()

// db.run('DROP TABLE customer')
