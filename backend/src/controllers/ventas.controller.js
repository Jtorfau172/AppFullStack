const Venta = require('../models/Venta');
const Coche = require('../models/Coche');
const Cliente = require('../models/Cliente');

// Registrar venta
exports.createVenta = async (req, res) => {
  try {
    const { cliente_id, coche_id, metodo_pago } = req.body;

    const coche = await Coche.findById(coche_id);
    if (!coche) return res.status(404).json({ mensaje: 'Coche no encontrado' });
    if (coche.stock <= 0) return res.status(400).json({ mensaje: 'Coche sin stock' });

    // Restar stock
    coche.stock -= 1;
    await coche.save();

    const venta = new Venta({
      cliente_id,
      coche_id,
      precio_final: coche.precio,
      metodo_pago
    });

    await venta.save();
    res.status(201).json(venta);
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
