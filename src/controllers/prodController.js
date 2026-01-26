const Producto = require('../models/Producto');

exports.crearProducto = async (req, res) => {
    try{
        const nuevoProd = new Producto(req.body);
        await nuevoProd.save();
        res.status(201).json(nuevoProd);
    }catch (error){
        res.status(400).json(req.body);
    }
}