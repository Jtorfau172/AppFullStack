// models/Concesionario.js
const mongoose = require("mongoose");

const concesionarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  CIF: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Concesionario", concesionarioSchema);
