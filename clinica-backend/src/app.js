const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/financeiro', financeiroRoutes);

module.exports = app;