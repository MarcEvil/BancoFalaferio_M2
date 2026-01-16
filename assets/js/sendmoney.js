// --- 1. SELECCIÓN DE ELEMENTOS ---
const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnCancelarModal = document.getElementById('btnCancelarModal');
const btnGuardarContacto = document.getElementById('btnGuardarContacto');
const btnEnviarDinero = document.getElementById('btnEnviarDinero');
const modal = document.getElementById('modalContacto');
const overlay = document.getElementById('overlay');
const listado = document.getElementById('contactList');

let contactoSeleccionado = null;

// --- 2. LÓGICA DE PERSISTENCIA ---

// Guarda la lista actual de la interfaz en el LocalStorage
const guardarContactosEnStorage = () => {
    const contactos = [];
    document.querySelectorAll('#contactList li').forEach(li => {
        // Ignoramos el mensaje de lista vacía si existe
        const nombreElem = li.querySelector('.contact-name');
        if (nombreElem) {
            contactos.push({
                nombre: nombreElem.textContent,
                detalles: li.querySelector('small').textContent
            });
        }
    });
    localStorage.setItem('misContactos', JSON.stringify(contactos));
};

// Crea el HTML de un contacto (Reutilizable para carga y creación)
const crearElementoContacto = (nombre, detalles) => {
    const nuevoItem = document.createElement('li');
    nuevoItem.className = "list-group-item d-flex justify-content-between align-items-center";
    nuevoItem.innerHTML = `
        <div class="contact-info">
            <strong class="contact-name">${nombre}</strong><br>
            <small>${detalles}</small>
        </div>
        <button class="btn btn-sm btn-outline-danger btn-delete" title="Eliminar contacto">🗑️</button>
    `;
    return nuevoItem;
};

// Carga contactos desde LocalStorage al iniciar
const cargarContactos = () => {
    const contactosGuardados = JSON.parse(localStorage.getItem('misContactos') || '[]');
    
    if (contactosGuardados.length > 0) {
        const emptyMsg = document.getElementById('emptyMessage');
        if (emptyMsg) emptyMsg.remove();

        contactosGuardados.forEach(c => {
            const item = crearElementoContacto(c.nombre, c.detalles);
            listado.appendChild(item);
        });
    }
};

// --- 3. GESTIÓN DEL MODAL ---

const cerrarModal = () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.querySelectorAll('#modalContacto input').forEach(i => i.value = '');
};

btnAbrirModal?.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
});

btnCancelarModal?.addEventListener('click', cerrarModal);

// Cerrar al hacer clic fuera del modal (en el overlay)
overlay?.addEventListener('click', cerrarModal);

// --- 4. AGREGAR NUEVO CONTACTO ---

btnGuardarContacto?.addEventListener('click', () => {
    const nombre = document.getElementById('newName').value.trim();
    const cbu = document.getElementById('newCbu').value.trim();
    const alias = document.getElementById('newAlias').value.trim();
    const banco = document.getElementById('newBank').value.trim();

    if (nombre && cbu) {
        const emptyMsg = document.getElementById('emptyMessage');
        if (emptyMsg) emptyMsg.remove();

        const detalles = `CBU: ${cbu} | Alias: ${alias} | Banco: ${banco}`;
        const nuevoItem = crearElementoContacto(nombre, detalles);
        
        listado.appendChild(nuevoItem);
        guardarContactosEnStorage();
        cerrarModal();
    } else {
        alert("Por favor, completa al menos el Nombre y el CBU.");
    }
});

// --- 5. SELECCIONAR O ELIMINAR (Delegación de Eventos) ---

listado?.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    if (!item) return;

    // Lógica para ELIMINAR
    if (e.target.classList.contains('btn-delete')) {
        const nombreC = item.querySelector('.contact-name').textContent;
        if (confirm(`¿Eliminar a ${nombreC} de tu agenda?`)) {
            item.remove();
            guardarContactosEnStorage();
            
            // Si no quedan contactos, mostramos el mensaje de vacío
            if (listado.querySelectorAll('li').length === 0) {
                listado.innerHTML = '<p id="emptyMessage" class="text-muted text-center py-4">No hay contactos registrados.</p>';
            }
        }
        return; // Salimos para no seleccionar el contacto
    }

    // Lógica para SELECCIONAR
    document.querySelectorAll('#contactList li').forEach(li => li.classList.remove('active'));
    item.classList.add('active');
    contactoSeleccionado = item.querySelector('.contact-name').textContent;
});

// --- 6. ENVIAR DINERO ---

btnEnviarDinero?.addEventListener('click', () => {
    if (!contactoSeleccionado) return alert("Selecciona un contacto de la lista.");

    const montoStr = prompt(`¿Cuánto dinero deseas enviar a ${contactoSeleccionado}?`);
    if (montoStr === null) return; // Si cancela el prompt

    const monto = parseInt(montoStr);

    if (isNaN(monto) || monto <= 0) {
        return alert("Por favor, ingresa un monto válido.");
    }

    let saldoActual = parseInt(localStorage.getItem('saldoWallet') || 60000);

    if (monto > saldoActual) {
        alert(`Saldo insuficiente. Tu saldo actual es $${saldoActual.toLocaleString()}`);
    } else {
        if (confirm(`¿Confirmas el envío de $${monto.toLocaleString()} a ${contactoSeleccionado}?`)) {
            // Actualizar Saldo
            localStorage.setItem('saldoWallet', saldoActual - monto);

            // Registrar en Historial
            const historial = JSON.parse(localStorage.getItem('historialWallet') || '[]');
            historial.unshift({
                tipo: `Envío a ${contactoSeleccionado}`,
                monto: monto,
                fecha: new Date().toLocaleString(),
                clase: 'monto-negativo'
            });
            localStorage.setItem('historialWallet', JSON.stringify(historial));

            alert("¡Transferencia realizada con éxito!");
            window.location.href = "menu.html";
        }
    }
});

// --- INICIALIZACIÓN ---
cargarContactos();