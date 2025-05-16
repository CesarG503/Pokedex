# CRUD con JavaScript y Fetch API

## Tecnologías Uzadas hasta el momento

- **HTML**: Estructura del proyecto, prueba de funcionamiento.
- **CSS**: bootstrap.min.css.
- **JavaScript**: Lógica para las operaciones CRUD.
- **Fetch API**: Para realizar las solicitudes HTTP.


# Comandos: Creación del Proyecto

### Inicializar el proyecto
```bash
npm init -y
```

### Instalar **Express**, **pg**, **bcrypt**, **CORS**, **jsonwebtoken** y **body-parser**
```bash
npm install express pg cors bcrypt jsonwebtoken body-parser
```

### Probar la API ejecutando puerto: 3000
```bash
npm run dev
```

### Descargar todas las dependencias del proyecto
En la ruta inicial donde esta el archivo `package.json`, usa:
```bash
npm install
```


# Uso de las dependencias

- **express**: Framework para crear aplicaciones web y APIs.
- **pg**: Cliente para interactuar con PostgreSQL.
- **cors**: Middleware para habilitar solicitudes desde otros dominios.
- **bcrypt**: Para encriptar contraseñas.
- **jsonwebtoken (JWT)**: Para manejar la autenticación basada en tokens.
- **body-parser**: Middleware para procesar datos JSON en solicitudes POST.


# Estructura y funcionamiento Actual ()

- **conexion.js**: Usar ```node server.js``` en la terminal para arrancar el proyecto 
- **npm run dev**: Usar el Script de node para ejecutar el servidor
- **db.js**: <span style="color:red;">EDITA ESTE ARCHIVO</span> (Archivo de configuracion del servidor)

- **js / crud**: Colocar aqui todos los modelos de las tablas para manejar las operaciones CRUD

- **main.js**: logica principal de la aplicacion, es el unico archivo que interactura con las estructuras html

- **server.js**: configura y arranca el servidor Express y protege las rutas por ahora
