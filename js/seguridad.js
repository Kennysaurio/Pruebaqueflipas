document.addEventListener('DOMContentLoaded', function() {
    // Intercepción estricta de la variable de sesión almacenada por el controlador de ingreso
    const rolActual = localStorage.getItem('rolUsuario');

    // Validación de seguridad: Si la variable es nula, el usuario es un intruso y debe ser expulsado
    if (!rolActual) {
        alert('Restricción de seguridad: Su sesión ha expirado o no ha sido validada. Por favor, ingrese sus credenciales en el portal principal.');
        window.location.replace('index.html');
        return;
    }

    // Lógica de enmascaramiento y restricción de interfaz según la jerarquía del usuario validado
    if (rolActual === 'Gerente') {
        // Se define una matriz con todos los selectores de los botones que permiten alterar la base de datos
        const elementosRestringidos = document.querySelectorAll('.btn-editar, .btn-eliminar, .quick-buttons button, button[type="submit"]');
        
        // Se itera sobre cada elemento encontrado en el Modelo de Objetos del Documento para ocultarlo
        elementosRestringidos.forEach(function(elemento) {
            elemento.style.display = 'none';
        });

        // Restricción adicional para ocultar columnas de acciones en las tablas si fuera necesario
        const columnasAcciones = document.querySelectorAll('th:last-child, td:last-child');
        // Dependiendo de la estructura de sus tablas, esta lógica puede expandirse para proteger los datos gerenciales
    }
});

// Función de apoyo global para aplicar las restricciones de acceso después de que una tabla se cargue de forma asíncrona
window.aplicarControlDeAccesos = function() {
    const rolActual = localStorage.getItem('rolUsuario');
    if (rolActual === 'Gerente') {
        const elementosRestringidos = document.querySelectorAll('.btn-editar, .btn-eliminar');
        elementosRestringidos.forEach(function(elemento) {
            elemento.style.display = 'none';
        });
    }
};