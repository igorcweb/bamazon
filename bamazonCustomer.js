const inquirer = require('inquirer');
const faker = require('faker');
const connection = require('./connection');
const ids = [];

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
  function processProduct() {
    inquirer
      .prompt([
        {
          type: 'text',
          name: 'id',
          message:
            'Please enter the ID of the product you would like to purchase'
        }
      ])
      .then(answers => {
        let id = parseInt(answers.id);
        if (ids.includes(parseInt(id))) {
          console.log('');
          let items = [];
          result.forEach(item => {
            items.push(item);
          });
          let product = JSON.stringify(items[id - 1].product_name).replace(
            /"/g,
            ''
          );

          console.log(`You selected ${product}! Fantastic Choice!`);
          console.log('');
          processQuantity(product);
        } else {
          console.log('');
          console.log('Invalid ID');
          console.log('');
          processProduct();
        }
      });
  }
  function processQuantity(product) {
    inquirer
      .prompt([
        {
          type: 'text',
          name: 'number',
          message: 'How many would you like to order?'
        }
      ])
      .then(answers => {
        console.log(`You want ${answers.number} ${product}`);
      });
  }
});
