const boton = document.getElementById("btnLog");

boton.addEventListener('click', () => {
    //captura de valores de inputs
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    //verificar credenciales 
    if(email === "xx@xxx.com" && pass === "1234"){
        alert("Bienvenido a Alky Wallet");
        window.location.href = "menu.html"
    }else{
        alert("Credenciales no son validas. Intente nuevamente")
    }
});