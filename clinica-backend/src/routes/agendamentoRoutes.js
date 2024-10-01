const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rota para criar um novo agendamento.
router.post('/', agendamentoController.criarAgendamento);

router.get('/', async (req, res) => {
    try {
        const agendamentos = await agendamentoController.listarAgendamentos();
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao listar agendamentos:', error);
        res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
    }
});

// Rota para buscar um agendamento por ID.
router.get('/:id', agendamentoController.buscarAgendamentoPorId);

// Rota para atualizar um agendamento por ID.
router.put('/:id', agendamentoController.atualizarAgendamento);

// Rota para excluir um agendamento por ID.
router.delete('/:id', agendamentoController.deletarAgendamento);

module.exports = router;
