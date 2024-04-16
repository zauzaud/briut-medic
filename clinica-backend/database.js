const mysql = require('mysql2');

// Criar a conexão com o banco de dados
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
