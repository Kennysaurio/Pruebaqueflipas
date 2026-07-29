//=====================================
// GESTIÓN DE EMPLEADOS
//=====================================

// Nuevo Empleado
const btnNuevo = document.querySelector(".panel-header button");

if (btnNuevo) {

    btnNuevo.addEventListener("click", () => {

        alert("Formulario de registro de empleado (Próximamente).");

    });

}

// Editar Empleado
const botonesEditar = document.querySelectorAll(".btn-editar");

botonesEditar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Editar empleado.");

    });

});

// Eliminar Empleado
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", () => {

        const confirmar = confirm("¿Desea eliminar este empleado?");

        if(confirmar){

            alert("Empleado eliminado.");

        }

    });

});