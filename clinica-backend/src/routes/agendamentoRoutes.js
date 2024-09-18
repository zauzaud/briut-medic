const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rota para criar um novo agendamento.
router.post('/', agendamentoController.criarAgendamento);

// Rota para listar todos os agendamentos.
router.get('/', agendamentoController.listarAgendamentos);

// Rota para buscar um agendamento por ID.
router.get('/:id', agendamentoController.buscarAgendamentoPorId);

// Rota para atualizar um agendamento por ID.
router.put('/:id', agendamentoController.atualizarAgendamento);

// Rota para excluir um agendamento por ID.
router.delete('/:id', agendamentoController.deletarAgendamento);

module.exports = router;
