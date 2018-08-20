const inquirer = require('inquirer');
const faker = require('faker');
const connection = require('./connection');
const ids = [];

//Insert 10 items into database using faker.js

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

function processProduct() {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'id',
        message: 'Please enter the ID of the product you would like to purchase'
      }
    ])
    .then(answers => {
      let id = parseInt(answers.id);
      if (ids.includes(parseInt(id))) {
        productById(id);
      } else {
        console.log('');
        console.log('Invalid ID');
        console.log('');
        processProduct();
      }
    });
}

function productById(id) {
  productQuery = `SELECT * FROM products WHERE item_id = ?`;
  connection.query(productQuery, id, (err, result) => {
    if (err) {
      throw err;
    }
    let { product_name, price, stock_quantity } = result[0];
    console.log('');
    console.log(`You selected ${product_name}! Excellent Choice!`);
    console.log('');
    processQuantity(product_name, price, stock_quantity);
  });
}
function processQuantity(product_name, price, stock_quantity) {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'number',
        message: 'How many would you like to order?'
      }
    ])
    .then(answers => {
      let number = parseInt(answers.number);
      console.log('');
      if (number <= stock_quantity) {
        console.log('You order:');
        console.log(`- ${product_name}, $${price}`);
        console.log('- Quantity:', number);
        console.log(`- Total: $${(price * number).toFixed(2)}`);
      } else if (stock_quantity === 0) {
        console.log('Sorry, we are out of stock.  Please come back later.');
      } else {
        console.log(`We only have ${stock_quantity} in stock`);
        console.log('');
        processQuantity(product_name, price, stock_quantity);
      }
    });
}

let displayQuery = 'SELECT item_id, product_name, price FROM products';

connection.query(displayQuery, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('');
  console.log('Welcome to Bamazon Store!');
  console.log('');
  console.log('You will not find these amazing deals anywhere else!');
  console.log('');
  console.log(
    'Hurry and get these incredible products while they are still in stock!'
  );
  console.log('');
  result.forEach(item => {
    ids.push(item.item_id);
    console.log(
      `* Product ID: ${item.item_id} | ${item.product_name} | on sale for $${
        item.price
      } *`
    );
    console.log('');
  });
  processProduct();
});
