const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.post('/', financeiroController.adicionarTransacao);
router.get('/', financeiroController.listarTodasTransacoes);
router.get('/:id', financeiroController.buscarTransacaoPorId);
router.put('/:id', financeiroController.atualizarTransacao);
router.delete('/:id', financeiroController.excluirTransacao);

module.exports = router;
