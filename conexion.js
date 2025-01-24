const express = require('express'); // Importar express
const app = require('./server'); // Importar la instancia de app desde server.js
const cors = require('cors');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Importar la conexión a la base de datos

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Ruta INICIO');
});