// script.js

// Obtener referencias a los elementos HTML
const btnCrear = document.getElementById('btnCrear');
const inputNombreTarea = document.getElementById('nombreTarea');
const selectEstado = document.getElementById('estado');
const inputUsuario = document.getElementById('usuario');
const tablaTareas = document.getElementById('tareasTable').getElementsByTagName('tbody')[0]; // Obtenemos el tbody de la tabla

// Función para agregar una nueva tarea a la tabla
function agregarTarea() {
    const nombreTarea = inputNombreTarea.value.trim();
    const estado = selectEstado.value; // Este ya obtiene el valor del select del formulario
    const usuario = inputUsuario.value.trim();

    if (nombreTarea === "") {
        alert("Por favor, ingresa el nombre de la tarea.");
        return;
    }

    // ¡NUEVA VALIDACIÓN PARA EL CAMPO USUARIO!
    if (usuario === "") {
        alert("Por favor, ingresa un usuario para la tarea.");
        return; // Detiene la función si el usuario está vacío
    }

    const newRow = tablaTareas.insertRow();
    const cellTarea = newRow.insertCell(0);
    const cellEstado = newRow.insertCell(1);
    const cellUsuario = newRow.insertCell(2);
    const cellAcciones = newRow.insertCell(3); // ¡NUEVA CELDA PARA EL BOTÓN DE BORRAR!

    cellTarea.textContent = nombreTarea;

    // Para el estado, creamos un nuevo select con las opciones
    const newSelectEstado = document.createElement('select');

    // Definir las nuevas opciones
    const estados = [
        { value: 'nuevo', text: 'Nuevo' },
        { value: 'en_proceso', text: 'En Proceso' },
        { value: 'finalizado', text: 'Finalizado' }
    ];

    estados.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        newSelectEstado.appendChild(option);
    });

    // Selecciona la opción que el usuario eligió en el formulario de entrada
    newSelectEstado.value = estado;
    
    cellEstado.appendChild(newSelectEstado);

    cellUsuario.textContent = usuario;

    // --- CÓDIGO PARA EL BOTÓN BORRAR ---
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('delete-button'); // Añade una clase para estilos si quieres

    // Añadir el evento click al botón de borrar
    deleteButton.addEventListener('click', function() {
        // 'this' se refiere al botón que fue clickeado
        // .parentNode es el <td> que contiene el botón
        // .parentNode.parentNode es el <tr> (la fila de la tabla) que contiene el <td>
        tablaTareas.removeChild(this.parentNode.parentNode);
    });

    cellAcciones.appendChild(deleteButton); // Añade el botón a la nueva celda de acciones
    // --- FIN CÓDIGO PARA EL BOTÓN BORRAR ---

    // Limpiar los campos de entrada después de agregar la tarea
    inputNombreTarea.value = '';
    selectEstado.value = 'nuevo'; // Ahora, el valor por defecto al limpiar será 'nuevo'
    inputUsuario.value = '';
}

// Añadir el evento click al botón "Crear"
btnCrear.addEventListener('click', agregarTarea);

// Opcional: También podrías querer que se agregue la tarea al presionar "Enter"
inputNombreTarea.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});
inputUsuario.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

// --- CÓDIGO ADICIONAL PARA LOS BOTONES DE BORRAR DE LAS FILAS YA EXISTENTES ---
// Seleccionar todos los botones de borrar existentes al cargar la página
// Esto es necesario porque los botones del HTML inicial no se crearon con JS
// y, por lo tanto, no tienen el listener asignado por la función `agregarTarea`.
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        // 'this' se refiere al botón que fue clickeado
        // .parentNode es el <td> que contiene el botón
        // .parentNode.parentNode es el <tr> (la fila de la tabla) que contiene el <td>
        tablaTareas.removeChild(this.parentNode.parentNode);
    });
});