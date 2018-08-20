const mysql = require('mysql');
const inquirer = require('inquirer');
const faker = require('faker');
const connection = require('./connection');

//Insert fake data into database

// let sql =
//   'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?';

// let values = [];

// for (let i = 0; i < 10; i++) {
//   values.push([
//     faker.commerce.productName(),
//     faker.commerce.department(),
//     faker.commerce.price(),
//     Math.floor(Math.random() * 401) + 100
//   ]);
// }

// connection.query(sql, [values], (err, result) => {
//   if (err) {
//     throw err;
//   }
//   console.log(result.affectedRows);
// });
