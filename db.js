const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin', // Ingresa tu contraseña de PostgreSQL (cambiala loco)
  database: 'PokemonDB',
  port: 5432
});

pool.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("¡Conexión exitosa a la base de datos!");
  }
});

module.exports = pool;
