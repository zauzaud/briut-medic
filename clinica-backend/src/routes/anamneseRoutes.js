const express = require('express');
const router = express.Router();
const anamneseController = require('../controllers/anamneseController');

router.post('/', anamneseController.criarAnamnese);
router.get('/paciente/:pacienteId', anamneseController.buscarAnamnesesPorPaciente);
router.get('/', anamneseController.listarTodasAnamneses);
router.put('/:id', anamneseController.atualizarAnamnese);
router.delete('/:id', anamneseController.excluirAnamnese);



module.exports = router;