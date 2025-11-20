const express = require('express');
const router = express.Router();
const { 
  registrarVehiculo, 
  obtenerVehiculos, 
  obtenerVehiculoPorId,
  actualizarVehiculo, 
  eliminarVehiculo 
} = require('../controllers/vehiculosController');


// Registrar vehículo
router.post('/registro', registrarVehiculo);

// Listar vehículos
router.get('/', obtenerVehiculos);

// Listar uno por ID
router.get('/:id', obtenerVehiculoPorId);

// Actualizar vehículo
router.put('/:id', actualizarVehiculo);

// Eliminar vehículo
router.delete('/:id', eliminarVehiculo);

module.exports = router;
