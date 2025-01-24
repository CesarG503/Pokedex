const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../../db'); // Importar la conexión a la base de datos

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Obtener todos los entrenadores
router.get('/', authenticateToken, async (req, res) => {
  console.log('Fetching entrenadores...');
  try {
    const result = await pool.query('SELECT * FROM entrenadores');
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching entrenadores:', err);
    res.status(500).json({ error: 'Error fetching entrenadores' });
  }
});

// Obtener un entrenador por ID
router.get('/:id', authenticateToken, async (req, res) => {
  console.log('Fetching entrenador con ID:', req.params.id);
  try {
    const result = await pool.query('SELECT * FROM entrenadores WHERE id = $1', [req.params.id]);
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching entrenador:', err);
    res.status(500).json({ error: 'Error fetching entrenador' });
  }
});

// Crear un nuevo entrenador
router.post('/', authenticateToken, async (req, res) => {
  console.log('Creando un entrenador nuevo...');
  const { nombre, correo, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO entrenadores (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, password]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Error creando un entrenador:', err);
    res.status(500).json({ error: 'Error creando un  entrenador' });
  }
});

// Actualizar un entrenador
router.put('/:id', authenticateToken, async (req, res) => {
  console.log('Actualizando un entrenador con el ID:', req.params.id);
  const { nombre, correo, password } = req.body;
  try {
    const result = await pool.query(
      'UPDATE entrenadores SET nombre = $1, correo = $2, password = $3 WHERE id = $4 RETURNING *',
      [nombre, correo, password, req.params.id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Error Actualizando el entrenador:', err);
    res.status(500).json({ error: 'Error Actualizando el entrenador' });
  }
});

// Borrar un entrenador
router.delete('/:id', authenticateToken, async (req, res) => {
  console.log('Borrando el entrenado con el ID:', req.params.id);
  try {
    const result = await pool.query('DELETE FROM entrenadores WHERE id = $1 RETURNING *', [req.params.id]);
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Error borrando el entrenador', err);
    res.status(500).json({ error: 'Error borrando el entrenador' });
  }
});

module.exports = router;
