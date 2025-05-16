const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function resetMessage(element) {
  setTimeout(() => {
    element.classList.add('hidden');
    setTimeout(() => {
      element.textContent = '';
      element.classList.remove('hidden');
    }, 1000);
  }, 3000);
}

function clearFields(form) {
  form.querySelectorAll('input').forEach(input => {
    if (input.type !== 'submit') {
      input.value = '';
    }
  });
}

// Detectar si estamos en local o en producción
const API_BASE_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://bingo-ivxo.onrender.com';

document.getElementById('sign-in-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  const messageElement = document.getElementById('sign-in-message');
  messageElement.textContent = '';
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId); // Almacenar el id del usuario
    messageElement.textContent = 'Inicio de sesion Exitoso!';
    messageElement.style.color = 'green';
    window.location.href = 'index.html'; // redirigir a la pagina principal con la sesion iniciada 
  } else {
    messageElement.textContent = 'Correo o contraseña Incorrectos.';
    messageElement.style.color = 'red';
  }
  resetMessage(messageElement);
});

document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  const messageElement = document.getElementById('sign-up-message');
  messageElement.textContent = '';
  if (data.success) {

    Swal.fire({
      title: 'Su perfil ha sido creado exitosamente!',
      html: `
      <br>
      <p>¡Bienvenido a la comunidad de entrenadores Pokémon!</p>
      `,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((e) => {
      container.classList.remove("sign-up-mode"); // Regresa al panel de iniciar sesion 
      clearFields(document.getElementById('sign-up-form')); // Limpia todos los imputs siempre que se llame
    });

    messageElement.textContent = 'Registro Exitoso';
    messageElement.style.color = 'green';
   
  } else {
    
    messageElement.textContent = 'No se pudo realizar el registro verifique los campos de registro.';
    messageElement.style.color = 'red';
  }
  resetMessage(messageElement);
});



