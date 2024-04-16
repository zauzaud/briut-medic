const express = require('express');
const app = express();
const port = 3000;

// Importando a conexão do banco de dados
const connection = require('./src/config/database');

// Teste básico da conexão com o banco de dados
connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('Database connection test: The solution is: ', results[0].solution);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
