
// --- 1. ACTUALIZACIÓN DEL SALDO ---

function cargarSaldo() {
    const elementoSaldo = document.getElementById('saldoActual');
    
    // Intentamos obtener el saldo de localStorage
    let saldoGuardado = localStorage.getItem('saldoWallet');

    // Si es la primera vez que el usuario entra (es null), 
    // lo inicializamos con el valor por defecto de 60000
    if (saldoGuardado === null) {
        saldoGuardado = "60000";
        localStorage.setItem('saldoWallet', saldoGuardado);
    }

    // Actualizamos el texto en el HTML
    if (elementoSaldo) {
        // Usamos toLocaleString para que aparezca con puntos de miles (ej: 60.000)
        const saldoNumerico = parseInt(saldoGuardado);
        elementoSaldo.textContent = `$${saldoNumerico.toLocaleString()}`;
    }
}

// --- 2. CONFIGURACIÓN DE NAVEGACIÓN REUTILIZABLE ---

/**
 * @param {string} id - El ID del botón en el HTML
 * @param {string} nombrePantalla - Nombre para el mensaje de confirmación
 * @param {string} url - El archivo HTML al que redirige
 */
function configurarBoton(id, nombrePantalla, url) {
    const boton = document.getElementById(id);
    
    if (boton) {
        boton.addEventListener('click', (event) => {
            event.preventDefault(); // Evitamos comportamientos por defecto

            // Preguntamos al usuario antes de salir del menú
            const confirmacion = confirm(`¿Deseas ir a la sección de ${nombrePantalla}?`);
            
            if (confirmacion) {
                window.location.href = url;
            }
        });
    }
}

// --- 3. EJECUCIÓN ---

// Ejecutamos la carga de saldo apenas abre la página
document.addEventListener('DOMContentLoaded', () => {
    cargarSaldo();

    // Activamos los botones del menú
    configurarBoton('btnDeposit', 'Depósitos', 'deposit.html');
    configurarBoton('btnRetirar', 'Retiro', 'retiro.html');
    configurarBoton('btnSendmoney', 'Enviar Dinero', 'sendmoney.html');
    configurarBoton('btnTransaction', 'Últimos Movimientos', 'transactions.html');
});