const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.post('/', ventasController.createVenta);
router.get('/historial', ventasController.getHistorial);

module.exports = router;
