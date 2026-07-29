//=====================================
// GESTIÓN DE CERTIFICADOS
//=====================================

// Nuevo Certificado
const btnNuevo = document.querySelector(".panel-header button");

if (btnNuevo) {

    btnNuevo.addEventListener("click", () => {

        alert("Formulario de nuevo certificado (Próximamente).");

    });

}

// Editar Certificado
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar certificado.");

    });

});

// Eliminar Certificado
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar este certificado?");

        if (confirmar) {

            alert("Certificado eliminado.");

        }

    });

});