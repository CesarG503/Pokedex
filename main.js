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