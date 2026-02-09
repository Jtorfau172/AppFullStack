const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

router.post('/', clientesController.createCliente);
router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getClienteById);
router.put('/:id', clientesController.updateCliente);
router.delete('/:id', clientesController.deleteCliente);

module.exports = router;
