// models/Cliente.js
const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String
  }
});

module.exports = mongoose.model("Cliente", clienteSchema);
