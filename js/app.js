document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.querySelector('.login');
    
    if(formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la pagina se recargue
            
            const formData = new FormData(formLogin);
            
            fetch('php/login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Bienvenido al sistema de gestión. Su rol es: ' + data.rol);
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error de red o de servidor:', error);
                alert('Ocurrió un error crítico al intentar conectar con el servidor.');
            });
        });
    }
});