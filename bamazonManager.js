const inquirer = require('inquirer');
const connection = require('./connection');

function viewProducts() {
  const viewQuery =
    'SELECT item_id, product_name, price, stock_quantity FROM products';
  connection.query(viewQuery, (err, results) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      results.forEach(item => {
        let { item_id, product_name, price, stock_quantity } = item;
        console.log('');
        console.log(
          `ID: ${item_id} | ${product_name} | $${price} | ${stock_quantity} in stock`
        );
      });
      managerPrompt();
    }
  });
}
function viewLowInventory() {
  const viewQuery =
    'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5';
  connection.query(viewQuery, (err, results) => {
    if (err) {
      console.log('Error: ', err);
      connection.end();
    } else {
      results.forEach(item => {
        let { item_id, product_name, price, stock_quantity } = item;
        console.log('');
        console.log(
          `ID: ${item_id} | ${product_name} | $${price} | ${stock_quantity} in stock`
        );
      });
      managerPrompt();
    }
  });
}

function managerPrompt() {
  console.log('');
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product'
        ]
      }
    ])
    .then(answer => {
      answer = answer.menu;
      if (answer.indexOf('Sale') !== -1) {
        viewProducts();
      } else if (answer.indexOf('Low') !== -1) {
        viewLowInventory();
      } else if (answer.indexOf('Add to') !== -1) {
        addToInventory();
      } else {
        addNewProduct();
      }
    });
}

managerPrompt();
