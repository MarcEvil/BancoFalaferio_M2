

const btnRealizarDeposito = document.getElementById('btnRealizarDeposito');
const inputMonto = document.getElementById('depositAmount');

if (btnRealizarDeposito) {
    btnRealizarDeposito.addEventListener('click', (event) => {
        // 1. Evitamos que el formulario se envíe y recargue la página
        event.preventDefault();

        // 2. Obtenemos el valor del input y lo convertimos a número entero
        const montoIngresado = parseInt(inputMonto.value);

        // 3. Validaciones de seguridad
        if (isNaN(montoIngresado) || montoIngresado <= 0) {
            alert("Por favor, ingresa un monto válido mayor a 0.");
            return;
        }

        // 4. Obtener el saldo actual del LocalStorage
        // Si no existe nada guardado aún, usamos 60000 como saldo base
        let saldoActual = localStorage.getItem('saldoWallet');
        saldoActual = saldoActual === null ? 60000 : parseInt(saldoActual);

        // 5. Calcular el nuevo saldo
        const nuevoSaldo = saldoActual + montoIngresado;

        // 6. Guardar el nuevo saldo en LocalStorage
        localStorage.setItem('saldoWallet', nuevoSaldo);

        // 7. REGISTRAR EN EL HISTORIAL
        // Primero traemos el historial existente o creamos uno vacío si no hay nada
        const historial = JSON.parse(localStorage.getItem('historialWallet') || '[]');
        
        // Creamos el objeto del nuevo movimiento
        const nuevoMovimiento = {
            tipo: 'Depósito Realizado',
            monto: montoIngresado,
            fecha: new Date().toLocaleString(), // Genera fecha y hora actual
            clase: 'monto-positivo' // Clase CSS para que se vea verde en el historial
        };

        // Agregamos el movimiento al principio de la lista (unshift)
        historial.unshift(nuevoMovimiento);

        // Guardamos la lista actualizada de vuelta en LocalStorage
        localStorage.setItem('historialWallet', JSON.stringify(historial));

        // 8. Notificar al usuario y redirigir al menú para ver los cambios
        alert(`¡Éxito! Has depositado $${montoIngresado.toLocaleString()}.`);
        window.location.href = "menu.html";
    });
}