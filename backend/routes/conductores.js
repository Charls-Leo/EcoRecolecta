const express = require('express');
const router = express.Router();
const { 
  registrarConductor, 
  obtenerConductores,
  actualizarConductor,
  eliminarConductor,
  conductorPorId
} = require('../controllers/conductoresController');

// Registrar
router.post('/registro', registrarConductor);

// Obtener ruta por ID
router.get('/:id', conductorPorId);

// Listar
router.get('/', obtenerConductores);

// Actualizar
router.put('/:id', actualizarConductor);

// Eliminar
router.delete('/:id', eliminarConductor);


module.exports = router;
