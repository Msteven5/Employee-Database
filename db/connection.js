const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'employee_db'
  }
);
  
module.exports = db;