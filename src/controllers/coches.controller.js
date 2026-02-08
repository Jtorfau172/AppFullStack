// controllers/coches.controller.js
const Coche = require("../models/Coche");

exports.createCoche = async (req, res) => {
  try {
    if (req.body.precio <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor que 0" });
    }

    const coche = new Coche(req.body);
    await coche.save();

    res.status(201).json(coche);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCoche = async (req, res) => {
  try {
    const coche = await Coche.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(coche);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCoche = async (req, res) => {
  try {
    await Coche.findByIdAndDelete(req.params.id);
    res.json({ message: "Coche eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
