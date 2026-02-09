const Venta = require('../models/Venta');
const Coche = require('../models/Coche');
const Cliente = require('../models/Cliente');

// Registrar venta
exports.createVenta = async (req, res) => {
  try {
    const { cliente_id, coche_id, metodo_pago } = req.body;

    const cliente = await Cliente.findById(cliente_id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

    const coche = await Coche.findById(coche_id);
    if (!coche) return res.status(404).json({ mensaje: 'Coche no encontrado' });
    if (coche.stock <= 0) return res.status(400).json({ mensaje: 'Coche sin stock' });

    // Restar stock y guardar venta
    coche.stock -= 1;

    const venta = new Venta({
      cliente_id,
      coche_id,
      precio_final: coche.precio,
      metodo_pago
    });

    await venta.save();
    await coche.save();
    res.status(201).json(venta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener venta por ID
exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate('cliente_id', 'nombre')
      .populate('coche_id', 'modelo');
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(venta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar venta (revierte stock)
exports.deleteVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });

    const coche = await Coche.findById(venta.coche_id);
    if (coche) {
      coche.stock += 1;
      await coche.save();
    }

    res.json({ mensaje: 'Venta eliminada y stock revertido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Historial de ventas
exports.getHistorial = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente_id', 'nombre')
      .populate('coche_id', 'modelo');
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
