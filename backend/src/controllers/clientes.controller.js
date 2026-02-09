const Cliente = require('../models/Cliente');
const Venta = require('../models/Venta');

// Crear cliente
exports.createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con ese DNI' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar cliente
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: 'Ya existe un cliente con ese DNI' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Eliminar cliente
exports.deleteCliente = async (req, res) => {
  try {
    const ventas = await Venta.findOne({ cliente_id: req.params.id });
    if (ventas) return res.status(400).json({ mensaje: 'No se puede eliminar, tiene ventas asociadas' });

    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
