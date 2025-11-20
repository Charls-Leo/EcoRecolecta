const pool = require('../db/connection');

// Crear ruta
const crearRuta = async (req, res) => {
  try {
    const { fecha, barrio, estado, vehiculo_id, conductor_id } = req.body;

    if (!fecha || !barrio || !estado || !vehiculo_id || !conductor_id) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevaRuta = await pool.query(
      `INSERT INTO rutas (fecha, barrio, estado, vehiculo_id, conductor_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [fecha, barrio, estado, vehiculo_id, conductor_id]
    );

    res.status(201).json({
      mensaje: 'Ruta creada correctamente',
      ruta: nuevaRuta.rows[0]
    });

  } catch (error) {
    console.error('Error al crear ruta:', error);
    res.status(500).json({ error: 'Error al crear ruta' });
  }
};

// Obtener todas las rutas
const obtenerRutas = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM rutas ORDER BY id ASC`);
    res.json(result.rows);

  } catch (error) {
    console.error('Error al obtener rutas:', error);
    res.status(500).json({ error: 'Error al obtener rutas' });
  }
};

// Obtener una ruta por ID
const obtenerRutaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM rutas WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error al obtener ruta:', error);
    res.status(500).json({ error: 'Error al obtener ruta' });
  }
};

// Finalizar ruta
const finalizarRuta = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE rutas 
       SET estado = 'finalizada'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.json({
      mensaje: 'Ruta finalizada correctamente',
      ruta: result.rows[0]
    });

  } catch (error) {
    console.error('Error al finalizar ruta:', error);
    res.status(500).json({ error: 'Error al finalizar ruta' });
  }
};

// Asignar vehículo + conductor
const asignarVehiculoConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehiculo_id, conductor_id } = req.body;

    const result = await pool.query(
      `UPDATE rutas
       SET vehiculo_id = $1, conductor_id = $2
       WHERE id = $3
       RETURNING *`,
      [vehiculo_id, conductor_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.json({
      mensaje: 'Asignación actualizada',
      ruta: result.rows[0]
    });

  } catch (error) {
    console.error('Error al asignar:', error);
    res.status(500).json({ error: 'Error al asignar vehículo y conductor' });
  }
};
// Obtener rutas por fecha (YYYY-MM-DD)
const obtenerRutasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;
    const resultado = await pool.query(
      `SELECT r.*, v.placa AS vehiculo, c.nombre AS conductor
       FROM rutas r
       LEFT JOIN vehiculos v ON r.vehiculo_id = v.id
       LEFT JOIN conductores c ON r.conductor_id = c.id
       WHERE r.fecha = $1
       ORDER BY r.id ASC`,
      [fecha]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener rutas por fecha:", error);
    res.status(500).json({ error: "Error al obtener rutas por fecha" });
  }
};

// Obtener rutas por estado
const obtenerRutasPorEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const resultado = await pool.query(
      `SELECT r.*, v.placa AS vehiculo, c.nombre AS conductor
       FROM rutas r
       LEFT JOIN vehiculos v ON r.vehiculo_id = v.id
       LEFT JOIN conductores c ON r.conductor_id = c.id
       WHERE r.estado = $1
       ORDER BY r.fecha ASC`,
      [estado]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener rutas por estado:", error);
    res.status(500).json({ error: "Error al obtener rutas por estado" });
  }
};

// Obtener rutas por barrio (exacto)
const obtenerRutasPorBarrio = async (req, res) => {
  try {
    const { barrio } = req.params;
    const resultado = await pool.query(
      `SELECT r.*, v.placa AS vehiculo, c.nombre AS conductor
       FROM rutas r
       LEFT JOIN vehiculos v ON r.vehiculo_id = v.id
       LEFT JOIN conductores c ON r.conductor_id = c.id
       WHERE r.barrio = $1
       ORDER BY r.fecha ASC`,
      [barrio]
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener rutas por barrio:", error);
    res.status(500).json({ error: "Error al obtener rutas por barrio" });
  }
};

// Actualizar ruta (PUT /api/rutas/:id)
const actualizarRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, barrio, estado, vehiculo_id, conductor_id } = req.body;

    const resultado = await pool.query(
      `UPDATE rutas
       SET fecha = COALESCE($1, fecha),
           barrio = COALESCE($2, barrio),
           estado = COALESCE($3, estado),
           vehiculo_id = COALESCE($4, vehiculo_id),
           conductor_id = COALESCE($5, conductor_id)
       WHERE id = $6
       RETURNING *`,
      [fecha, barrio, estado, vehiculo_id, conductor_id, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Ruta no encontrada" });
    }

    res.json({
      mensaje: "Ruta actualizada correctamente",
      ruta: resultado.rows[0]
    });

  } catch (error) {
    console.error("Error al actualizar ruta:", error);
    res.status(500).json({ error: "Error al actualizar ruta" });
  }
};
// Eliminar ruta
const eliminarRuta = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM rutas WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.json({ mensaje: "Ruta eliminada correctamente" });

  } catch (error) {
    console.error("Error al eliminar ruta:", error);
    res.status(500).json({ error: "Error al eliminar ruta" });
  }
};

module.exports = {
  crearRuta,
  obtenerRutas,
  obtenerRutaPorId,
  finalizarRuta,
  asignarVehiculoConductor,
  obtenerRutasPorFecha,
  obtenerRutasPorEstado,
  obtenerRutasPorBarrio,
  actualizarRuta,
  eliminarRuta
};
