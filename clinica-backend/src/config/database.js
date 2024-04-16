const mysql = require('mysql2');

// conexão com o banco
const connection = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: 'root', 
  database: 'clinicadb', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
