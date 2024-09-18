const express = require('express');
const router = express.Router();
const comissaoProfissionalController = require('../controllers/comissaoProfissionalController');

router.post('/', comissaoProfissionalController.criarComissao);
router.get('/', comissaoProfissionalController.listarComissoes);
router.get('/:id', comissaoProfissionalController.buscarComissaoPorId);
router.put('/:id', comissaoProfissionalController.atualizarComissao);
router.delete('/:id', comissaoProfissionalController.deletarComissao);
router.get('/profissional/:profissional_id', comissaoProfissionalController.listarComissoesPorProfissional);
router.get('/profissional/:profissional_id/servico/:servico_id', comissaoProfissionalController.buscarComissaoPorProfissionalEServico);

module.exports = router;