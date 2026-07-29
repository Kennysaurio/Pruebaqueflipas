//=====================================
// GESTIÓN DE PROGRAMACIONES
//=====================================

// Nueva Programación
const btnNueva = document.querySelector(".panel-header button");

if (btnNueva) {

    btnNueva.addEventListener("click", () => {

        alert("Formulario de nueva programación (Próximamente).");

    });

}

// Editar Programación
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar programación.");

    });

});

// Eliminar Programación
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar esta programación?");

        if (confirmar) {

            alert("Programación eliminada.");

        }

    });

});