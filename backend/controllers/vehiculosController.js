const pool = require('../db/connection');

// Registrar vehículo
const registrarVehiculo = async (req, res) => {
  try {
    const { placa, modelo, tipo } = req.body;

    // Validar unicidad
    const existe = await pool.query('SELECT * FROM vehiculos WHERE placa = $1', [placa]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'La placa ya está registrada' });
    }

    const nuevo = await pool.query(
      'INSERT INTO vehiculos (placa, modelo, tipo) VALUES ($1, $2, $3) RETURNING *',
      [placa, modelo, tipo]
    );

    res.status(201).json(nuevo.rows[0]);
  } catch (error) {
    console.error('Error al registrar vehículo:', error);
    res.status(500).json({ error: 'Error al registrar vehículo' });
  }
};

// Listar vehículos
const obtenerVehiculos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehiculos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
};

module.exports = { registrarVehiculo, obtenerVehiculos };
