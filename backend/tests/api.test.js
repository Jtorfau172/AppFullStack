// Configurar entorno de test
process.env.NODE_ENV = 'test';
// Conectar a localhost en vez de "db" (hostname de Docker) para tests locales
process.env.MONGO_URI = 'mongodb://root:admin1234@localhost:27017/?authSource=admin';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// Variables para guardar IDs creados durante los tests
let concesionarioId;
let cocheId;
let clienteId;
let ventaId;

// ============================================
// TESTS DE CONCESIONARIOS
// ============================================
describe('API Concesionarios', () => {
  test('POST /api/concesionarios - Crear concesionario', async () => {
    const res = await request(app)
      .post('/api/concesionarios')
      .send({ nombre: 'Test Motors', ubicacion: 'Madrid', CIF: 'B12345678' });

    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Test Motors');
    expect(res.body.CIF).toBe('B12345678');
    concesionarioId = res.body._id;
  });

  test('GET /api/concesionarios - Obtener todos', async () => {
    const res = await request(app).get('/api/concesionarios');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/concesionarios/:id - Obtener por ID', async () => {
    const res = await request(app).get(`/api/concesionarios/${concesionarioId}`);

    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Test Motors');
  });

  test('POST /api/concesionarios - CIF duplicado devuelve error', async () => {
    const res = await request(app)
      .post('/api/concesionarios')
      .send({ nombre: 'Otro', ubicacion: 'Barcelona', CIF: 'B12345678' });

    expect(res.status).toBe(400);
    expect(res.body.mensaje).toContain('Ya existe');
  });
});

// ============================================
// TESTS DE COCHES (CRUD + FILTROS)
// ============================================
describe('API Coches', () => {
  test('POST /api/coches - Crear coche', async () => {
    const res = await request(app)
      .post('/api/coches')
      .send({
        marca: 'Toyota',
        modelo: 'Corolla',
        precio: 25000,
        stock: 5,
        año: 2024,
        concesionario_id: concesionarioId
      });

    expect(res.status).toBe(201);
    expect(res.body.marca).toBe('Toyota');
    expect(res.body.precio).toBe(25000);
    cocheId = res.body._id;
  });

  test('POST /api/coches - Precio 0 devuelve error', async () => {
    const res = await request(app)
      .post('/api/coches')
      .send({
        marca: 'Seat',
        modelo: 'Ibiza',
        precio: 0,
        stock: 1,
        año: 2023,
        concesionario_id: concesionarioId
      });

    expect(res.status).toBe(400);
  });

  test('GET /api/coches - Obtener todos', async () => {
    const res = await request(app).get('/api/coches');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/coches/:id - Obtener por ID', async () => {
    const res = await request(app).get(`/api/coches/${cocheId}`);

    expect(res.status).toBe(200);
    expect(res.body.modelo).toBe('Corolla');
  });

  test('PUT /api/coches/:id - Actualizar precio', async () => {
    const res = await request(app)
      .put(`/api/coches/${cocheId}`)
      .send({ precio: 23000 });

    expect(res.status).toBe(200);
    expect(res.body.precio).toBe(23000);
  });

  test('GET /api/coches/search - Filtrar por marca', async () => {
    const res = await request(app)
      .get('/api/coches/search')
      .query({ marca: 'Toyota' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].marca).toBe('Toyota');
  });

  test('GET /api/coches/search - Filtrar por precio_max', async () => {
    const res = await request(app)
      .get('/api/coches/search')
      .query({ precio_max: 30000 });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/coches/search - Filtrar por disponibilidad', async () => {
    const res = await request(app)
      .get('/api/coches/search')
      .query({ disponibilidad: 'true' });

    expect(res.status).toBe(200);
    res.body.forEach(coche => {
      expect(coche.stock).toBeGreaterThan(0);
    });
  });
});

// ============================================
// TESTS DE CLIENTES
// ============================================
describe('API Clientes', () => {
  test('POST /api/clientes - Crear cliente', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({ dni: '12345678A', nombre: 'Juan Test', email: 'juan@test.com', telefono: '666111222' });

    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Juan Test');
    clienteId = res.body._id;
  });

  test('GET /api/clientes - Obtener todos', async () => {
    const res = await request(app).get('/api/clientes');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/clientes - DNI duplicado devuelve error', async () => {
    const res = await request(app)
      .post('/api/clientes')
      .send({ dni: '12345678A', nombre: 'Otro', email: 'otro@test.com' });

    expect(res.status).toBe(400);
    expect(res.body.mensaje).toContain('Ya existe');
  });
});

// ============================================
// TESTS DE VENTAS (LOGICA DE NEGOCIO)
// ============================================
describe('API Ventas', () => {
  test('POST /api/ventas - Registrar venta (resta stock + snapshot precio)', async () => {
    const cocheAntes = await request(app).get(`/api/coches/${cocheId}`);
    const stockAntes = cocheAntes.body.stock;
    const precioAntes = cocheAntes.body.precio;

    const res = await request(app)
      .post('/api/ventas')
      .send({ cliente_id: clienteId, coche_id: cocheId, metodo_pago: 'tarjeta' });

    expect(res.status).toBe(201);
    expect(res.body.precio_final).toBe(precioAntes); // Snapshot del precio
    ventaId = res.body._id;

    // Verificar que el stock se redujo en 1
    const cocheDespues = await request(app).get(`/api/coches/${cocheId}`);
    expect(cocheDespues.body.stock).toBe(stockAntes - 1);
  });

  test('GET /api/ventas/historial - Obtener historial con populate', async () => {
    const res = await request(app).get('/api/ventas/historial');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    // Verificar que populate funciona (nombre del cliente, modelo del coche)
    expect(res.body[0].cliente_id).toHaveProperty('nombre');
    expect(res.body[0].coche_id).toHaveProperty('modelo');
  });

  test('POST /api/ventas - Cliente inexistente devuelve 404', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post('/api/ventas')
      .send({ cliente_id: fakeId, coche_id: cocheId, metodo_pago: 'efectivo' });

    expect(res.status).toBe(404);
  });

  test('DELETE /api/ventas/:id - Eliminar venta revierte stock', async () => {
    const cocheAntes = await request(app).get(`/api/coches/${cocheId}`);
    const stockAntes = cocheAntes.body.stock;

    const res = await request(app).delete(`/api/ventas/${ventaId}`);
    expect(res.status).toBe(200);

    // Verificar que el stock se revirtió
    const cocheDespues = await request(app).get(`/api/coches/${cocheId}`);
    expect(cocheDespues.body.stock).toBe(stockAntes + 1);
  });
});

// ============================================
// LIMPIEZA: Eliminar datos de test
// ============================================
describe('Limpieza de datos de test', () => {
  test('DELETE coche de test', async () => {
    const res = await request(app).delete(`/api/coches/${cocheId}`);
    expect(res.status).toBe(200);
  });

  test('DELETE cliente de test', async () => {
    const res = await request(app).delete(`/api/clientes/${clienteId}`);
    expect(res.status).toBe(200);
  });

  test('DELETE concesionario de test', async () => {
    const res = await request(app).delete(`/api/concesionarios/${concesionarioId}`);
    expect(res.status).toBe(200);
  });
});

// Cerrar conexión a MongoDB al terminar
afterAll(async () => {
  await mongoose.connection.close();
});
