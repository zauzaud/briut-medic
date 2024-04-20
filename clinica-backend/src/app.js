const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');

const app = express();

// Configuração do CORS antes das rotas
app.use(cors({
    origin: 'http://localhost:3001', // Permitir apenas o front-end para acessar
    optionsSuccessStatus: 200 // Alguns navegadores legados (IE11, vários SmartTVs) não entendem 204
}));

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/financeiro', financeiroRoutes);

module.exports = app;
