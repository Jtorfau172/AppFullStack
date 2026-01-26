require('dotenv').config();
const express = require('express');
const conectarDB = require('./src/config/db');

const app = express();
conectarDB();

app.use(express.json());
app.use('/api/productos', require('./src/routes/prodRoutes'));

app.listen(process.env.PORT, () => console.log('Server funcionando en puerto 3000'));