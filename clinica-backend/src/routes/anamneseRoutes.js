const express = require('express');
const router = express.Router();
const anamneseController = require('../controllers/anamneseController');

router.post('/', anamneseController.criarAnamnese);
router.get('/paciente/:pacienteId', anamneseController.buscarAnamnesesPorPaciente);
router.delete('/:id', anamneseController.excluirAnamnese);
router.put('/:id', anamneseController.atualizarAnamnese);
router.get('/', anamneseController.listarTodasAnamneses);

module.exports = router;