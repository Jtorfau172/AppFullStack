const express = require('express');
const router = express.Router();
const prodController = require ('../controllers/prodController');

//POST /api/productos
router.post('/', prodController.crearProducto);

//GET /api/productos
router.get('/', prodController.obtenerProductos);

module.exports = router;