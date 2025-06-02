// Simulación de base de datos en memoria
let datos = []; // Arreglo que almacena objetos de usuario { id, nombre, correo }
let accionPendiente = null; // Guarda la acción que el usuario quiere confirmar (eliminar o editar)

/**
 * Busca un usuario por su ID y carga su información en los campos.
 * Se activa al hacer clic en el botón "Buscar".
 */
function buscar() {
  const id = document.getElementById("id").value;
  const resultado = datos.find(d => d.id === id);

  if (resultado) {
    document.getElementById("nombre").value = resultado.nombre;
    document.getElementById("correo").value = resultado.correo;
    alert("Usuario encontrado");
  } else {
    alert("Usuario no encontrado");
  }

  // Sugerencia para los del backend: este método puede conectarse con un endpoint GET /usuarios/:id
}

/**
 * Abre el popup de confirmación y guarda qué acción se desea realizar.
 * @param {string} accion - Puede ser 'eliminar' o 'editar'
 */
function confirmarAccion(accion) {
  accionPendiente = accion;
  document.getElementById("popup").style.display = "block";
}

/**
 * Ejecuta la acción pendiente (eliminar o editar/agregar)
 * Se llama cuando el usuario confirma en el popup.
 */
function ejecutarAccion() {
  const id = document.getElementById("id").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  // Validación básica
  if (!id) {
    alert("Por favor, ingresa un ID.");
    return;
  }

  // Eliminar usuario
  if (accionPendiente === "eliminar") {
    datos = datos.filter(d => d.id !== id);

    // 📌 Backend sugerencia: aquí iría una llamada DELETE /usuarios/:id
  }

  // editar/agregar usuario
  if (accionPendiente === "editar") {
    const index = datos.findIndex(d => d.id === id);

    if (index !== -1) {
      // Si existe, actualizar datos
      datos[index] = { id, nombre, correo };

      // Sugerencia para los de backend: aquí podría llamarse PUT /usuarios/:id
    } else {
      // Si no existe, agregar nuevo usuario (hasta máximo 5)
      if (datos.length < 5) {
        datos.push({ id, nombre, correo });

        // sugerencia: aquí podría llamarse POST /usuarios
      } else {
        alert("Máximo de 5 usuarios alcanzado. No se puede agregar más.");
      }
    }
  }

  // Cierra el popup y limpia estado
  accionPendiente = null;
  document.getElementById("popup").style.display = "none";
  actualizarTabla();
}

/**
 * Actualiza la tabla HTML con los datos actuales.
 * Siempre muestra 5 filas, con datos o vacías.
 */
function actualizarTabla() {
  const tbody = document.getElementById("tabla-datos");
  tbody.innerHTML = ""; // Limpia la tabla

  for (let i = 0; i < 5; i++) {
    const fila = datos[i];
    const tr = document.createElement("tr");

    if (fila) {
      tr.innerHTML = `<td>${fila.id}</td><td>${fila.nombre}</td><td>${fila.correo}</td>`;
    } else {
      tr.innerHTML = "<td></td><td></td><td></td>";
    }

    tbody.appendChild(tr);
  }
}
