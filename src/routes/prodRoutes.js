const express = require('express');
const router = express.Router();
const prodController = require ('../controllers/prodController');

//POST /api/productos
router.post('/', prodController.crearProducto);

module.exports = router;