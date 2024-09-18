const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

router.post('/', servicoController.criarServico);
router.get('/', servicoController.listarServicos);
router.get('/:id', servicoController.buscarServicoPorId);
router.put('/:id', servicoController.atualizarServico);
router.delete('/:id', servicoController.deletarServico);

module.exports = router;