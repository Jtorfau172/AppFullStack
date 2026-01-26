const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
 nombre: {type: String, required: true, trim: true},
 precio: {type: Number, required: true, min:0},
 stock: {type: Number, default: 0}   
}, {timestamps: true});

module.exports = mongoose.model('Producto', ProductoSchema);