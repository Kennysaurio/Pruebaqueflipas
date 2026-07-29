//=====================================
// GESTIÓN DE USUARIOS
//=====================================

// Nuevo Usuario
const btnNuevo = document.querySelector(".panel-header button");

if (btnNuevo) {

    btnNuevo.addEventListener("click", () => {

        alert("Formulario de registro de usuario (Próximamente).");

    });

}

// Editar Usuario
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar usuario.");

    });

});

// Eliminar Usuario
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar este usuario?");

        if(confirmar){

            alert("Usuario eliminado.");

        }

    });

});