const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.post('/', financeiroController.criarTransacao);
router.get('/', financeiroController.listarTransacoes);
router.get('/:id', financeiroController.buscarTransacaoPorId);
router.put('/:id', financeiroController.atualizarTransacao);
router.delete('/:id', financeiroController.deletarTransacao);
router.get('/comissao/:agendamento_id', financeiroController.calcularComissao);

module.exports = router;