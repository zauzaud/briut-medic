const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const anamneseRoutes = require('./routes/anamneseRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const comissaoProfissionalRoutes = require('./routes/comissaoProfissionalRoutes');
const sequelize = require('./config/sequelize');

const app = express();

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado");
  }).catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
    console.log('Modelos sincronizados com o banco de dados');

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
app.use('/anamneses', anamneseRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/comissoes', comissaoProfissionalRoutes);

module.exports = app;