// src/app.js
const express = require('express');
const app = express();
const agendamentoRoutes = require('./routes/agendamentoRoutes');

// Middleware para analisar o corpo das requisições JSON.
app.use(express.json());

// Rotas para gerenciamento de agendamentos.
app.use('/agendamentos', agendamentoRoutes);

module.exports = app;
