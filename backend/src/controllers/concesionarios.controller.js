const Concesionario = require('../models/Concesionario');

// Crear concesionario
exports.createConcesionario = async (req, res) => {
  try {
    const concesionario = new Concesionario(req.body);
    await concesionario.save();
    res.status(201).json(concesionario);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un concesionario con ese CIF' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los concesionarios
exports.getConcesionarios = async (req, res) => {
  try {
    const concesionarios = await Concesionario.find();
    res.json(concesionarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener concesionario por ID
exports.getConcesionarioById = async (req, res) => {
  try {
    const concesionario = await Concesionario.findById(req.params.id);
    if (!concesionario) return res.status(404).json({ mensaje: 'Concesionario no encontrado' });
    res.json(concesionario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar concesionario
exports.updateConcesionario = async (req, res) => {
  try {
    const concesionario = await Concesionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!concesionario) return res.status(404).json({ mensaje: 'Concesionario no encontrado' });
    res.json(concesionario);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un concesionario con ese CIF' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Eliminar concesionario
exports.deleteConcesionario = async (req, res) => {
  try {
    const concesionario = await Concesionario.findByIdAndDelete(req.params.id);
    if (!concesionario) return res.status(404).json({ mensaje: 'Concesionario no encontrado' });
    res.json({ mensaje: 'Concesionario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
