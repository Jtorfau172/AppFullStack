// backend/src/app.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

// Conectar a la base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/coches', require('./routes/coches.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/concesionarios', require('./routes/concesionarios.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));

// Solo arranca el servidor si se ejecuta directamente (no en tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server funcionando en puerto ${PORT}`));
}

module.exports = app;
