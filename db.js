const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({

  //host: process.env.LOCAL,
  
  //user: 'postgres',
  //password: 'admin', // Ingresa tu contraseña de PostgreSQL (cambiala loco)
  //database: 'PokemonDB',
  //port: 5432
  connectionString: process.env.DATA_BASE_URL,
  ssl: true
});

pool.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("¡Conexión exitosa a la base de datos!");
  }
});

module.exports = pool;
