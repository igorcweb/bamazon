const mysql = require('mysql');

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon'
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.log('Error: ', err);
    connection.end();
  }
  console.log('Connected');
});

module.exports = connection;