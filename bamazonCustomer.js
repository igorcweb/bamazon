const inquirer = require('inquirer');
const faker = require('faker');
const connection = require('./connection');

//Insert fake data into database

// let dataQuery =
//   'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?';

// let values = [];

// for (let i = 0; i < 10; i++) {
//   values.push([
//     faker.commerce.productName(),
//     faker.commerce.department(),
//     (Math.random() * 901 + 100).toFixed(2),
//     Math.floor(Math.random() * 181) + 20
//   ]);
// }

// connection.query(dataQuery, [values], (err, result) => {
//   if (err) {
//     throw err;
//   }
//   console.log(result.affectedRows);
// });

let displayQuery = 'SELECT item_id, product_name, price FROM products';

connection.query(displayQuery, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('');
  result.forEach(item => {
    console.log(
      `Product ID: ${item.item_id} - ${item.product_name} - on sale for $${
        item.price
      }`
    );
    console.log('');
  });
});
