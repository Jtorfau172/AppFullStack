const Concesionario = require('../models/Concesionario');

exports.obtenerConcesionarios = async (req, res) => {
    try {
        const concesionarios = await Concesionario.find();
        res.json(concesionarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener concesionarios" });
    }
};