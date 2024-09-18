const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const anamneseRoutes = require('./routes/anamneseRoutes');
const sequelize = require('./config/sequelize');


const app = express();

sequelize.sync().then(() => {
    Object.values(sequelize.models).forEach(model => {
        if (model.associate) {
            model.associate(sequelize.models);
        }
    });
    console.log('Modelos sincronizados com o banco de dados');
}).catch(error => {
    console.error('Erro ao sincronizar modelos:', error);
});

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

module.exports = app;