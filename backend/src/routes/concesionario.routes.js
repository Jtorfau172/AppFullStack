const express = require('express');
const router = express.Router();
const concesionarioCtrl = require('../controllers/concesionario.controller');

router.get('/', concesionarioCtrl.obtenerConcesionarios);

module.exports = router;