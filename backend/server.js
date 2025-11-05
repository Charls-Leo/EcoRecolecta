const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

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
