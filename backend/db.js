// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // Usuario por defecto de PostgreSQL
  host: 'localhost',      // Tu servidor local
  database: 'app_basura', // El nombre de tu base de datos
  password: '123',           // Si no tienes contraseña, déjalo vacío
  port: 5432,             // Puerto por defecto de PostgreSQL
});

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL correctamente'))
  .catch(err => console.error('Error de conexión a PostgreSQL:', err));

module.exports = pool;
