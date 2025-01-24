const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Establecemos los parámetros de conexión
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin', //Ingresa tu contraseña 
    database: 'PokemonDB', 
    port: 5432
});

// Conexión a la base de datos
pool.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("¡Conexión exitosa a la base de datos!");
    }
});

app.get('/', (req, res) => {
    res.send('Ruta INICIO');
});


//CRUD DE LAS TABLAS 


app.get('/api/entrenador', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entrenadores');
        res.send(result.rows);
    } catch (err) {
        throw err;
    }
});

// Mostrar un solo usuario en la tabla entrenadores 
app.get('/api/entrenador/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM entrenadores WHERE id = $1', [req.params.id]);
        res.send(result.rows);
    } catch (err) {
        throw err;
    }
});

// Crear un usuario en la tabla entrenadores
app.post('/api/entrenador', async (req, res) => {
    const { nombre, correo, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO entrenadores (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
            [nombre, correo, password]
        );
        res.send(result.rows[0]);
    } catch (err) {
        throw err;
    }
});

// Editar entrenador
app.put('/api/entrenador/:id', async (req, res) => {
    const { nombre, correo, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE entrenadores SET nombre = $1, correo = $2, password = $3 WHERE id = $4 RETURNING *',
            [nombre, correo, password, req.params.id]
        );
        res.send(result.rows[0]);
    } catch (err) {
        throw err;
    }
});

// Eliminar Entrenador
app.delete('/api/entrenador/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM entrenadores WHERE id = $1 RETURNING *', [req.params.id]);
        res.send(result.rows[0]);
    } catch (err) {
        throw err;
    }
});


const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => {
    console.log("Servidor Ok en puerto:" + puerto);
});