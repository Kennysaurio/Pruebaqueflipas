//=====================================
// GESTIÓN DE REPORTES
//=====================================

// Generar Reporte
const btnGenerar = document.querySelector(".panel-header button");

if (btnGenerar) {

    btnGenerar.addEventListener("click", () => {

        alert("Generación de reporte (Próximamente).");

    });

}

// Visualizar Reporte
const botonesVer = document.querySelectorAll(".btn-editar");

botonesVer.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Visualizar reporte.");

    });

});

// Descargar Reporte
const botonesDescargar = document.querySelectorAll(".btn-eliminar");

botonesDescargar.forEach(boton => {

    boton.addEventListener("click", () => {

        alert("Descarga del reporte iniciada.");

    });

});