// const boton = document.getElementById("btnLog");

// boton.addEventListener('click', () => {
//     //captura de valores de inputs
//     const email = document.getElementById('email').value;
//     const pass = document.getElementById('password').value;
//     //verificar credenciales 
//     if(email === "xx@xxx.com" && pass === "1234"){
//         alert("Bienvenido a Alky Wallet");
//         window.location.href = "menu.html"
//     }else{
//         alert("Credenciales no son validas. Intente nuevamente")
//     }
// });

// $(document).ready(function() {
//     // Escuchar el evento click en el botón con ID btnLog
//     $('#btnLog').on('click', function() {
        
//         // Captura de valores de los inputs usando .val()
//         const email = $('#email').val();
//         const pass = $('#password').val();

//         // Verificar credenciales con una estructura condicional if-else
//         if (email === "xx@xxx.com" && pass === "1234") {
//             alert("Bienvenido a Alky Wallet");
//             // Redirección
//             window.location.href = "menu.html";
//         } else {
//             alert("Credenciales no son validas. Intente nuevamente");
//         }
//     });
// });
$(document).ready(function() {
    // Referencias a los elementos del DOM
    const $emailInput = $('#email');
    const $passInput = $('#password');
    const $btnLogin = $('#btnLog');
    const $btnRegister = $('#btnReg');

    // --- FUNCIÓN REGISTRARSE ---
    $btnRegister.on('click', function(e) {
        e.preventDefault(); // Evita que el formulario se recargue

        const email = $emailInput.val().trim();
        const pass = $passInput.val().trim();

        // Validación simple
        if (email === "" || pass === "") {
            alert("⚠️ Por favor, completa todos los campos para registrarte.");
            return;
        }

        // Crear objeto de usuario
        const usuario = {
            email: email,
            password: pass
        };

        // Guardar en LocalStorage (convertido a texto)
        localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
        
        alert("✅ ¡Registro exitoso! Ahora puedes iniciar sesión con estos datos.");
        
        // Limpiar campos para el siguiente paso
        $emailInput.val('');
        $passInput.val('');
    });

    // --- FUNCIÓN INICIAR SESIÓN (LOGIN) ---
    $btnLogin.on('click', function(e) {
        e.preventDefault();

        const emailIngresado = $emailInput.val().trim();
        const passIngresada = $passInput.val().trim();

        // Obtener datos de LocalStorage
        const datosGuardados = localStorage.getItem('usuarioRegistrado');
        const usuarioDB = JSON.parse(datosGuardados);

        // 1. Verificar contra el usuario registrado en LocalStorage
        if (usuarioDB && emailIngresado === usuarioDB.email && passIngresada === usuarioDB.password) {
            alert("🚀 Bienvenido a Alky Wallet");
            window.location.href = "menu.html";
            return;
        }

        // 2. Credenciales de respaldo (Admin por defecto)
        if (emailIngresado === "xx@xxx.com" && passIngresada === "1234") {
            alert("👨‍💻 Ingresando como Administrador");
            window.location.href = "menu.html";
            return;
        }

        // 3. Si nada coincide
        alert("❌ Credenciales no válidas. Registrate si aún no tienes cuenta.");
    });
});