const express = require('express');
const router = express.Router();
const { obtenerUsuarios, registrarUsuario, loginUsuario } = require('../controllers/usuariosController');

// Rutas
router.get('/', obtenerUsuarios);        // Listar todos los usuarios
router.post('/registro', registrarUsuario); // Registrar un nuevo usuario
router.post('/login', loginUsuario);       // Iniciar sesión

module.exports = router;
