//==============================
// SISTEMA DE CAPACITACIÓN
// Novatech Solutions
//==============================

// Obtener el formulario
const formulario = document.querySelector(".login");

// Obtener los campos
const usuario = document.querySelector("input[type='text']");
const password = document.querySelector("input[type='password']");

// Evento al enviar el formulario
formulario.addEventListener("submit", function(e){

    e.preventDefault();

    if(usuario.value.trim() === ""){

        usuario.focus();

        mostrarMensaje("Debe ingresar el usuario.","error");

        return;

    }

    if(password.value.trim() === ""){

        password.focus();

        mostrarMensaje("Debe ingresar la contraseña.","error");

        return;

    }

    mostrarMensaje("Validación correcta. Conectaremos con la base de datos más adelante.","ok");

});

//==============================
// MENSAJES
//==============================

function mostrarMensaje(texto,tipo){

    let mensaje = document.createElement("div");

    mensaje.className = "mensaje";

    mensaje.innerHTML = texto;

    document.body.appendChild(mensaje);

    if(tipo==="ok"){

        mensaje.style.background="#16a34a";

    }else{

        mensaje.style.background="#ef4444";

    }

    setTimeout(()=>{

        mensaje.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        mensaje.classList.remove("mostrar");

        setTimeout(()=>{

            mensaje.remove();

        },500);

    },3000);

}

//==============================
// EFECTO EN INPUTS
//==============================

const inputs=document.querySelectorAll("input");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.parentElement.style.transform="scale(1.03)";

    });

    input.addEventListener("blur",()=>{

        input.parentElement.style.transform="scale(1)";

    });

});