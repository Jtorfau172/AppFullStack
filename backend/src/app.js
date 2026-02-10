// backend/src/app.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

const Concesionario = require('./models/Concesionario');

// Conectar a la base de datos
conectarDB().then(async () => {
    console.log("DB Conectada, verificando concesionario...");

    try {
        const existe = await Concesionario.findOne(); // Buscamos si ya hay alguno

        if (!existe) {
            await Concesionario.create({
                nombre: "Mi Concesionario Principal",
                ubicacion: "Calle de la Tecnología, 1",
                CIF: "B12345678"
            });
            console.log("Concesionario inicial creado!");
        }
    } catch (err) {
        console.error("Error al crear concesionario inicial:", err);
    }
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/coches', require('./routes/coches.routes'));
app.use('/api/concesionarios', require('./routes/concesionario.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));

// Solo arranca el servidor si se ejecuta directamente (no en tests)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));
}

module.exports = app;
