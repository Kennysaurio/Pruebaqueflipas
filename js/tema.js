// Algoritmo de control de persistencia visual e inyección de clases
document.addEventListener('DOMContentLoaded', function() {
    // Declaración del nodo interactivo del botón
    const btnAlternarTema = document.getElementById('btnAlternarTema');
    
    // Extracción de la preferencia histórica desde la memoria local del navegador
    const temaGuardado = localStorage.getItem('temaCorporativo');
    
    // Validación estructural: Si existe la preferencia y es oscura, se inyecta inmediatamente
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        if (btnAlternarTema) {
            btnAlternarTema.innerHTML = '<i class="fa-solid fa-sun"></i> Modo Día';
        }
    }

    // Vinculación del evento de clic para procesar el cambio en tiempo real
    if (btnAlternarTema) {
        btnAlternarTema.addEventListener('click', function() {
            // La instrucción toggle añade la clase si no existe, o la retira si ya está presente
            document.body.classList.toggle('modo-oscuro');
            
            // Validación condicional para actualizar el ícono, el texto y guardar en memoria
            if (document.body.classList.contains('modo-oscuro')) {
                localStorage.setItem('temaCorporativo', 'oscuro');
                btnAlternarTema.innerHTML = '<i class="fa-solid fa-sun"></i> Modo Día';
            } else {
                localStorage.setItem('temaCorporativo', 'claro');
                btnAlternarTema.innerHTML = '<i class="fa-solid fa-moon"></i> Modo Noche';
            }
        });
    }
});