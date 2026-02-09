const Coche = require('../models/Coche');
const Concesionario = require('../models/Concesionario');
const Venta = require('../models/Venta');

// Obtener todos los coches
exports.getCoches = async (req, res) => {
  try {
    const coches = await Coche.find();
    res.json(coches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener coche por ID
exports.getCocheById = async (req, res) => {
  try {
    const coche = await Coche.findById(req.params.id);
    if (!coche) return res.status(404).json({ mensaje: 'Coche no encontrado' });
    res.json(coche);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear coche
exports.createCoche = async (req, res) => {
  try {
    const { marca, modelo, precio, stock, año, concesionario_id } = req.body;

    if (precio <= 0) return res.status(400).json({ mensaje: 'El precio debe ser mayor que 0' });

    const coche = new Coche({ marca, modelo, precio, stock, año, concesionario_id});
    await coche.save();

    res.status(201).json(coche);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar coche
exports.updateCoche = async (req, res) => {
  try {
    const { id } = req.params;
    const coche = await Coche.findByIdAndUpdate(id, req.body, { new: true });
    if (!coche) return res.status(404).json({ mensaje: 'Coche no encontrado' });
    res.json(coche);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar coche
exports.deleteCoche = async (req, res) => {
  try {
    const { id } = req.params;
    const ventas = await Venta.findOne({ coche_id: id });
    if (ventas) return res.status(400).json({ mensaje: 'No se puede eliminar, tiene ventas asociadas' });

    const coche = await Coche.findByIdAndDelete(id);
    if (!coche) return res.status(404).json({ mensaje: 'Coche no encontrado' });
    res.json({ mensaje: 'Coche eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar coches con filtros
exports.searchCoches = async (req, res) => {
  try {
    const { marca, precio_max, disponibilidad } = req.query;

    let query = {};
    if (marca) query.marca = marca;
    if (precio_max) query.precio = { $lte: Number(precio_max) };
    if (disponibilidad === 'true') query.stock = { $gt: 0 };

    const coches = await Coche.find(query);
    res.json(coches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
