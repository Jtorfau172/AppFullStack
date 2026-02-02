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

exports.obtenerProductos = async (req, res) =>{
    try{
        const productos = await Producto.find();
        res.status(200).json(productos);
    }catch (error){
        res.status(500).json({
            mensaje: "Error al obtener los productos",
            error: error.message
        });
    }
}