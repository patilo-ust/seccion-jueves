// Botón para buscar usuario
const buscarBtn = document.getElementById('buscar-btn');

// Botón para reportar usuario
const reportarBtn = document.getElementById('reportar-btn');

// Input donde el usuario escribe el nombre
const usernameInput = document.getElementById('username');

// Elementos donde se muestran los datos del perfil
const nombreEl = document.getElementById('nombre-usuario');
const correoEl = document.getElementById('correo-usuario');
const trabajosEl = document.getElementById('trabajos-usuario');

// Foto de perfil (círculo que puede cambiarse por imagen)
const fotoPerfil = document.getElementById('foto-perfil');

// Evento cuando se hace clic en "Buscar"
buscarBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();

  if (!username) {
    alert("Por favor escribe un nombre de usuario.");
    return;
  }

  // Simulación de datos (para pruebas front-end)
  // Aquí se puede hacer una llamada fetch() al backend con el nombre ingresado
  // Ejemplo: fetch(`/api/usuarios/${username}`).then(...)...

  // Simulamos la respuesta de back-end
  nombreEl.textContent = 'Matias Sanchez';
  correoEl.textContent = 'm.sanchez@hotmail.es';
  trabajosEl.textContent = 'Arquitecto, Ilustrador';

  // Si se quiere usar una imagen en vez de color:
  // fotoPerfil.style.backgroundImage = 'url("ruta/imagen.jpg")';
  // fotoPerfil.style.backgroundSize = 'cover';
});

// Evento cuando se hace clic en "Reportar usuario"
reportarBtn.addEventListener('click', () => {
  // Aquí se puede enviar un POST al backend con la info del usuario reportado
  // Ejemplo:
  // fetch('/api/reportar', { method: 'POST', body: JSON.stringify({ user: username }) })

  alert("Usuario reportado. Gracias por tu colaboración.");
});
