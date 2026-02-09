// backend/src/app.js

require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db'); // tu función de conexión a MongoDB
const cors = require('cors');

const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas reales que sí existen
app.use('/api/coches', require('./routes/coches.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/concesionarios', require('./routes/concesionarios.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));
