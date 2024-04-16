const express = require('express');
const app = express();

// definição de middlewares e rota
app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
