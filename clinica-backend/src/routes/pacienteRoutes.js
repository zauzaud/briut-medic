const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/', pacienteController.criarPaciente);
router.get('/', pacienteController.listarPacientes);
router.get('/:id', pacienteController.buscarPacientePorId);
router.put('/:id', pacienteController.atualizarPaciente);
router.delete('/:id', pacienteController.deletarPaciente);

module.exports = router;