const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.post('/', ventasController.createVenta);
router.get('/historial', ventasController.getHistorial);
router.get('/:id', ventasController.getVentaById);
router.delete('/:id', ventasController.deleteVenta);

module.exports = router;
