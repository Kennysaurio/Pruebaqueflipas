//=====================================
// GESTIÓN DE INSCRIPCIONES
//=====================================

// Nueva Inscripción
const btnNueva = document.querySelector(".panel-header button");

if (btnNueva) {

    btnNueva.addEventListener("click", () => {

        alert("Formulario de nueva inscripción (Próximamente).");

    });

}

// Editar Inscripción
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar inscripción.");

    });

});

// Eliminar Inscripción
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar esta inscripción?");

        if (confirmar) {

            alert("Inscripción eliminada.");

        }

    });

});