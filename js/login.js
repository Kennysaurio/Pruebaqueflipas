document.addEventListener('DOMContentLoaded', function() {
    // Protocolo de limpieza de seguridad: Destruye cualquier sesión huérfana al cargar la página principal
    localStorage.removeItem('rolUsuario');

    const formLogin = document.getElementById('formLogin');
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formLogin);

            fetch('php/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // INSTRUCCIÓN CRÍTICA: Inscripción de la credencial jerárquica en la memoria local del navegador
                    localStorage.setItem('rolUsuario', data.rol);
                    
                    alert(data.message);
                    
                    // Transición forzada con reemplazo de historial para evitar conflictos de navegación
                    window.location.replace('dashboard.html');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Fallo en la trazabilidad de la petición asíncrona de red:', error);
                alert('Fallo crítico de comunicación: El servidor central no ha emitido una respuesta válida.');
            });
        });
    }
});