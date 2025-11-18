const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const usuariosRoutes = require('./routes/usuarios');


const vehiculosRoutes = require('./routes/vehiculos');
app.use('/api/vehiculos', vehiculosRoutes);


// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend App Basura funcionando correctamente');
});

// Rutas principales
app.use('/api/usuarios', usuariosRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
