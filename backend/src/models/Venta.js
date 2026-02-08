// models/Venta.js
const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  cliente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true
  },
  coche_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coche",
    required: true
  },
  precio_final: {
    type: Number,
    required: true
  },
  metodo_pago: {
    type: String,
    enum: ["efectivo", "tarjeta", "financiacion"],
    required: true
  }
});

module.exports = mongoose.model("Venta", ventaSchema);
