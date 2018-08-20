require('dotenv').config();
const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: 'bamazon'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.log('Error: ', err);
    connection.end();
  }
});

module.exports = connection;
