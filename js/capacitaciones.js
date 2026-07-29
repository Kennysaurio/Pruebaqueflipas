//=====================================
// GESTIÓN DE CAPACITACIONES
//=====================================

// Nueva Capacitación
const btnNueva = document.querySelector(".panel-header button");

if (btnNueva) {

    btnNueva.addEventListener("click", () => {

        alert("Formulario de nueva capacitación (Próximamente).");

    });

}

// Editar Capacitación
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar capacitación.");

    });

});

// Eliminar Capacitación
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar esta capacitación?");

        if (confirmar) {

            alert("Capacitación eliminada.");

        }

    });

});