// test-db.js
const pool = require('./db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('🕒 Conexión exitosa, hora actual del servidor:', result.rows[0]);
  } catch (err) {
    console.error('❌ Error al probar la conexión:', err);
  } finally {
    pool.end();
  }
}

testConnection();
