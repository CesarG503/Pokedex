const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db'); // Importar la conexión a la base de datos
const entrenadoresRouter = require('./js/crud/Entrenadores'); // Importar las rutas de Entrenadores.js

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
pool.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("¡Conexión exitosa a la base de datos!");
  }
});

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

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO entrenadores (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM entrenadores WHERE correo = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.correo }, 'secret_key', { expiresIn: '1h' });
      res.json({ token, userId: user.id }); // Enviar el token y el id del usuario 
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

//Colocar las rutas protegidas debajo de esta línea
app.get('/index.html', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//... y arriba de esta línea (crear un archivo de rutas protegidas)


// Usar ruta del CRUD Entrenadores.js
app.use('/api/entrenador', entrenadoresRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // Exportar la instancia de app, para ser usada en conexion.js
