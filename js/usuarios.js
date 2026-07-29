document.addEventListener('DOMContentLoaded', function() {
    cargarUsuarios();

    const btnNuevo = document.getElementById('btnNuevoUsuario');
    const modal = document.getElementById('modalUsuario');
    const btnCerrar = document.getElementById('cerrarModal');
    const formUsuario = document.getElementById('formUsuario');

    // Abrir ventana modal
    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    // Cerrar ventana modal
    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formUsuario.reset();
        });
    }

    // Registrar usuario en la BD
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formUsuario);
            formData.append('accion', 'crear');

            fetch('php/usuarios.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formUsuario.reset();
                    modal.style.display = 'none';
                    cargarUsuarios();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarUsuarios() {
    const cuerpoTabla = document.getElementById('cuerpoTablaUsuarios');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/usuarios.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(usuario => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.id_usuario}</td>
                    <td>${usuario.nombre} ${usuario.apellido1}</td>
                    <td>${usuario.ci}</td>
                    <td>${usuario.rol}</td>
                    <td><span class="estado activo">${usuario.estado}</span></td>
                    <td>
                        <button class="btn-editar"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="eliminarUsuario(${usuario.id_usuario})" class="btn-eliminar">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                cuerpoTabla.appendChild(fila);
            });
        }
    })
    .catch(error => console.error('Error al cargar datos:', error));
}

function eliminarUsuario(id) {
    if (confirm('¿Está seguro de que desea eliminar este usuario del sistema?')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_usuario', id);

        fetch('php/usuarios.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarUsuarios();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}