/** 
 * Objetivo: Leer el historial de movimientos guardado y mostrarlo en la lista.
 */

const listaUl = document.getElementById('listaMovimientos');

function renderizarHistorial() {
    // 1. Obtener la cadena de texto de localStorage
    const datosGuardados = localStorage.getItem('historialWallet');
    
    // 2. Convertir el texto de vuelta a un Array de objetos (JSON.parse)
    // Si no hay nada guardado, usamos un array vacío []
    const historial = datosGuardados ? JSON.parse(datosGuardados) : [];

    // 3. Verificar si el historial tiene elementos
    if (historial.length === 0) {
        listaUl.innerHTML = `
            <li class="list-group-item text-center py-4">
                <p class="text-muted mb-0">Aún no has realizado ninguna operación.</p>
                <small>Tus depósitos y envíos aparecerán aquí.</small>
            </li>
        `;
        return;
    }

    // 4. Limpiar la lista antes de llenarla (por seguridad)
    listaUl.innerHTML = '';

    // 5. Recorrer el historial y crear el HTML para cada movimiento
    // Usamos .forEach para iterar sobre cada objeto del array
    historial.forEach(movimiento => {
        const item = document.createElement('li');
        
        // Clases de Bootstrap para el diseño
        item.className = "list-group-item d-flex justify-content-between align-items-center";

        // Determinamos el símbolo (+ o -) según la clase guardada
        const simbolo = movimiento.clase === 'monto-positivo' ? '+' : '-';

        // Estructura interna del elemento de lista
        item.innerHTML = `
            <div>
                <strong style="text-transform: capitalize;">${movimiento.tipo}</strong><br>
                <span class="text-muted" style="font-size: 0.85rem;">${movimiento.fecha}</span>
            </div>
            <span class="${movimiento.clase}" style="font-size: 1.1rem;">
                ${simbolo} $${movimiento.monto.toLocaleString()}
            </span>
        `;

        // Agregamos el item al contenedor <ul>
        listaUl.appendChild(item);
    });
}

// 6. Ejecutar la función inmediatamente al cargar el archivo
document.addEventListener('DOMContentLoaded', renderizarHistorial);