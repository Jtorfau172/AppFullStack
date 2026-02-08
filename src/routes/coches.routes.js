// routes/coches.routes.js
const express = require("express");
const router = express.Router();
const cochesController = require("../controllers/coches.controller");

router.post("/", cochesController.createCoche);
router.put("/:id", cochesController.updateCoche);
router.delete("/:id", cochesController.deleteCoche);
router.get("/search", cochesController.searchCoches);

module.exports = router;
