const app = require('./src/app');  // Importa a configuração do aplicativo Express
const port = 3000;                // Define a porta em que o servidor será iniciado

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
