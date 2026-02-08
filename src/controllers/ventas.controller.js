// controllers/ventas.controller.js
const Venta = require("../models/Venta");
const Coche = require("../models/Coche");

exports.createVenta = async (req, res) => {
  try {
    const { coche_id, cliente_id, metodo_pago } = req.body;

    const coche = await Coche.findById(coche_id);

    if (!coche || coche.stock <= 0) {
      return res.status(400).json({ error: "No hay stock disponible" });
    }

    coche.stock -= 1;
    await coche.save();

    const venta = new Venta({
      coche_id,
      cliente_id,
      metodo_pago,
      precio_final: coche.precio
    });

    await venta.save();

    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.historialVentas = async (req, res) => {
  const ventas = await Venta.find()
    .populate("cliente_id", "nombre")
    .populate("coche_id", "modelo");

  res.json(ventas);
};
