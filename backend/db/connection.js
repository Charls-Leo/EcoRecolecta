const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '123', // tu contraseña de PostgreSQL
  database: 'app_basura'
});

module.exports = pool;
