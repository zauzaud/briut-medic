const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/', estoqueController.adicionarItem);
router.get('/', estoqueController.listarTodosItens);
router.get('/:id', estoqueController.buscarItemPorId);
router.put('/:id', estoqueController.atualizarItem);
router.delete('/:id', estoqueController.excluirItem);

module.exports = router;
