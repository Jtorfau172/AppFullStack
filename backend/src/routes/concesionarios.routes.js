const express = require('express');
const router = express.Router();
const concesionariosController = require('../controllers/concesionarios.controller');

router.post('/', concesionariosController.createConcesionario);
router.get('/', concesionariosController.getConcesionarios);
router.get('/:id', concesionariosController.getConcesionarioById);
router.put('/:id', concesionariosController.updateConcesionario);
router.delete('/:id', concesionariosController.deleteConcesionario);

module.exports = router;
