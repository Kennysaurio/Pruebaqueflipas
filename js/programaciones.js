document.addEventListener('DOMContentLoaded', function() {
    cargarProgramaciones();

    const btnNuevo = document.getElementById('btnNuevaProgramacion');
    const modal = document.getElementById('modalProgramacion');
    const btnCerrar = document.getElementById('cerrarModal');
    const formProgramacion = document.getElementById('formProgramacion');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formProgramacion.reset();
        });
    }

    if (formProgramacion) {
        formProgramacion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formProgramacion);
            formData.append('accion', 'crear');

            fetch('php/programaciones.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formProgramacion.reset();
                    modal.style.display = 'none';
                    cargarProgramaciones();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarProgramaciones() {
    const cuerpoTabla = document.getElementById('cuerpoTablaProgramaciones');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/programaciones.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(prog => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${prog.id_programacion}</td>
                    <td>${prog.capacitacion}</td>
                    <td>${prog.fecha_inicio} al ${prog.fecha_fin}</td>
                    <td>${prog.hora_inicio} - ${prog.hora_fin}</td>
                    <td>${prog.lugar}</td>
                    <td>${prog.cupo_maximo}</td>
                    <td>
                        <button class="btn-editar"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="eliminarProgramacion(${prog.id_programacion})" class="btn-eliminar">
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

function eliminarProgramacion(id) {
    if (confirm('¿Está seguro de que desea eliminar esta programación del sistema?')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_programacion', id);

        fetch('php/programaciones.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarProgramaciones();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}