const express = require('express');
const router = express.Router();
const anamneseController = require('../controllers/anamneseController');

router.post('/', anamneseController.criarAnamnese);
router.get('/paciente/:pacienteId', anamneseController.buscarAnamnesePorPaciente);
router.put('/:id', anamneseController.atualizarAnamnese);

module.exports = router;