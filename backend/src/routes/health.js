// src/routes/health.js
const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/healthController');

// Ruta de estado de salud del servidor
router.get('/health', getHealth);

module.exports = router;
