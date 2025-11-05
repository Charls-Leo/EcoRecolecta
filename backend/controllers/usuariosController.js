const pool = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔹 Obtener todos los usuarios (para pruebas)
const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, correo FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// 🔹 Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    // Verificar si el correo ya existe
    const existe = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contrasena, salt);

    // Insertar usuario
    const nuevo = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING id, nombre, correo',
      [nombre, correo, hash]
    );

    res.status(201).json(nuevo.rows[0]);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// 🔹 Iniciar sesión
const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Correo no registrado' });
    }

    const usuario = result.rows[0];

    // Verificar contraseña
    const valida = bcrypt.compareSync(contrasena, usuario.contrasena);
    if (!valida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo },
      'secreto123', //  clave temporal (luego la pondremos en .env)
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = { obtenerUsuarios, registrarUsuario, loginUsuario };
