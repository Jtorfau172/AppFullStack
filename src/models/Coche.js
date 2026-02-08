// models/Coche.js
const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true,
    min: 1
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  año: {
    type: Number,
    required: true
  },
  concesionario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concesionario",
    required: true
  }
});

module.exports = mongoose.model("Coche", cocheSchema);
