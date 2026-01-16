

const btnRealizarRetiro = document.getElementById('btnRealizarRetiro');
const inputMonto = document.getElementById('retirarMonto');

if (btnRealizarRetiro) {
    btnRealizarRetiro.addEventListener('click', (event) => {
        // 1. Evitamos que el formulario recargue la página (comportamiento por defecto)
        event.preventDefault();

        // 2. Obtenemos el monto del input y lo convertimos a número entero
        const montoARetirar = parseInt(inputMonto.value);

        // 3. Validación: ¿Es un número válido y mayor a cero?
        if (isNaN(montoARetirar) || montoARetirar <= 0) {
            alert("Por favor, ingresa un monto válido mayor a 0.");
            return;
        }

        // 4. Obtener el saldo actual de LocalStorage
        // Si no existe, usamos 60000 como base
        let saldoActual = localStorage.getItem('saldoWallet');
        saldoActual = (saldoActual === null) ? 60000 : parseInt(saldoActual);

        // 5. VALIDACIÓN DE SEGURIDAD: ¿Tiene fondos suficientes?
        if (montoARetirar > saldoActual) {
            alert(`Saldo insuficiente. Tu saldo disponible es de $${saldoActual.toLocaleString()}`);
            return; // Detenemos la función aquí
        }

        // 6. Realizar la operación matemática
        const nuevoSaldo = saldoActual - montoARetirar;

        // 7. Guardar el nuevo saldo en LocalStorage
        localStorage.setItem('saldoWallet', nuevoSaldo);

        // 8. REGISTRAR LA OPERACIÓN EN EL HISTORIAL
        // Traemos el historial actual o creamos uno vacío
        const historial = JSON.parse(localStorage.getItem('historialWallet') || '[]');
        
        // Creamos el objeto con los datos del retiro
        const nuevoMovimiento = {
            tipo: 'Retiro de Efectivo',
            monto: montoARetirar,
            fecha: new Date().toLocaleString(), // Fecha y hora del momento
            clase: 'monto-negativo' // Para que aparezca en rojo en el historial
        };

        // Lo agregamos al inicio de la lista
        historial.unshift(nuevoMovimiento);

        // Guardamos el historial actualizado
        localStorage.setItem('historialWallet', JSON.stringify(historial));

        // 9. Feedback y redirección al menú
        alert(`¡Éxito! Has retirado $${montoARetirar.toLocaleString()}. Tu saldo restante es $${nuevoSaldo.toLocaleString()}`);
        window.location.href = "menu.html";
    });
}