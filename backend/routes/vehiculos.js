const express = require('express');
const router = express.Router();
const { registrarVehiculo, obtenerVehiculos } = require('../controllers/vehiculosController');

// Registrar vehículo
router.post('/registro', registrarVehiculo);

// Listar vehículos
router.get('/', obtenerVehiculos);

module.exports = router;
