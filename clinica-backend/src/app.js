const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');

const app = express();

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/financeiro', financeiroRoutes);

module.exports = app;