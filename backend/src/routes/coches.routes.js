const express = require('express');
const router = express.Router();
const cochesController = require('../controllers/coches.controller');

router.get('/', cochesController.getCoches);
router.get('/search', cochesController.searchCoches);
router.get('/:id', cochesController.getCocheById);
router.post('/', cochesController.createCoche);
router.put('/:id', cochesController.updateCoche);
router.delete('/:id', cochesController.deleteCoche);

module.exports = router;
