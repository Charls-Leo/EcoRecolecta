const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/rutasController');

// Crear ruta
router.post('/', crearRuta);

// Listar todas las rutas
router.get('/', obtenerRutas);

// Obtener ruta por ID
router.get('/:id', obtenerRutaPorId);

// Finalizar ruta
router.put('/:id/finalizar', finalizarRuta);

// Asignar vehículo + conductor
router.put('/:id/asignar', asignarVehiculoConductor);

// Filtrar por fecha
router.get('/fecha/:fecha', obtenerRutasPorFecha);

// Filtrar por estado
router.get('/estado/:estado', obtenerRutasPorEstado);

// Filtrar por barrio
router.get('/barrio/:barrio', obtenerRutasPorBarrio);

// Actualizar ruta
router.put('/:id', actualizarRuta);

// Eliminar ruta
router.delete('/:id', eliminarRuta);

module.exports = router;

