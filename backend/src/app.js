require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();
conectarDB();

app.use(cors());
app.use(express.json());
app.use('/api/productos', require('./src/routes/prodRoutes'));

app.listen(process.env.PORT, () => console.log('Server funcionando en puerto 3000'));