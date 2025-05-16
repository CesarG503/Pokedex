let pokemons = [];
let currentIndex = -1;

function AgregarModal() {
    Swal.fire({
        title: 'Agregar pokemon',
        html:
            `
                    <h3>!!!!No hacer formulario al agregar !!!</h3>
                    <input type="text" id="pokemonName" class="swal2-input" placeholder="Prueba de agregar!!">
                    
                `,
        confirmButtonText: 'Agregar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',

        preConfirm: () => {
            const name = document.getElementById('pokemonName').value;

            if (!name) {
                Swal.showValidationMessage('Seleccionar Pokemon');
                return false;
            }
            return { name };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            pokemons.push(result.value);
            RenderizarElementos();
        }
    });
}

function EditarModal(index) {
    const pokemon = pokemons[index];
    Swal.fire({
        title: 'Edit Pokémon',
        html: `
                    <input type="text" id="pokemonName" class="swal2-input" placeholder="Nombre" value="${pokemon.name}">
                    <input type="text" id="pokemonType" class="swal2-input" placeholder="Tipo" value="${pokemon.type}">
                `,
        confirmButtonText: 'Guardar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const name = document.getElementById('pokemonName').value;
            const type = document.getElementById('pokemonType').value;
            if (!name || !type) {
                Swal.showValidationMessage('Edita tu pokemon');
                return false;
            }
            return { name, type };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            pokemons[index] = result.value;
            RenderizarElementos();
        }
    });
}

function EliminarPokemon(index) {
    Swal.fire({
        title: 'Estas Seguro?',
        text: "No puedes deshacer esta accion!",
        icon: 'Advertencia',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            pokemons.splice(index, 1);
            RenderizarElementos();
        }
    });
}

function RenderizarElementos() {
    const tbody = document.getElementById('pokemonTableBody');
    tbody.innerHTML = '';
    pokemons.forEach((pokemon, index) => {
        const row = `
                <tr>
                <td>${index + 1}</td>
                <td>${pokemon.name}</td>
                <td>${pokemon.type}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="EditarModal(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="EliminarPokemon(${index})">Eliminar</button>
                </td>
                </tr>
            `;
        tbody.innerHTML += row;
    });
}

let entrenadores = [];

function RenderizarEntrenadores() {
    const tbody = document.getElementById('entrenadorTableBody');
    tbody.innerHTML = '';
    entrenadores.forEach((entrenador, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entrenador.nombre}</td>
                <td>${entrenador.correo}</td>
                <td>${entrenador.password}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="EditarEntrenadorModal(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="EliminarEntrenador(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    console.log('Entrenadores renderizados:', entrenadores);
}
// Detectar si estamos en local o en producción
const API_BASE_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://bingo-ivxo.onrender.com';

let urlEntrenador = `${API_BASE_URL}/api/entrenador`;

function MostrarEntrenadores() {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    fetch(urlEntrenador, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        entrenadores = data;
        RenderizarEntrenadores();
    })
    .catch(error => {
        console.error('Error fetching entrenadores:', error);
    });
}

function MostrarUsuario(userId) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/entrenador/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('username').textContent = data[0].nombre;
    })
    .catch(error => {
        console.error('Error fetching usuario:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      MostrarUsuario(userId);
    }
  });

document.addEventListener('DOMContentLoaded', MostrarEntrenadores);


function AgregarEntrenadorModal() {
    Swal.fire({
        title: 'Agregar Entrenador',
        html: `
            <input type="text" id="entrenadorNombre" class="swal2-input" placeholder="Nombre">
            <input type="email" id="entrenadorCorreo" class="swal2-input" placeholder="Correo">
            <input type="password" id="entrenadorPassword" class="swal2-input" placeholder="Contraseña">
        `,
        confirmButtonText: 'Agregar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nombre = document.getElementById('entrenadorNombre').value;
            const correo = document.getElementById('entrenadorCorreo').value;
            const password = document.getElementById('entrenadorPassword').value;
            if (!nombre || !correo || !password) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
                return false;
            }
            return { nombre, correo, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            fetch('http://localhost:3000/api/entrenador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(result.value)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    Swal.fire('Error', data.error, 'error');
                } else {
                    entrenadores.push(data);
                    RenderizarEntrenadores();
                    Swal.fire('Éxito', 'Entrenador agregado correctamente', 'success');
                }
            })
            .catch(error => {
                Swal.fire('Error', 'No se pudo agregar el entrenador', 'error');
            });
        }
    });
}

