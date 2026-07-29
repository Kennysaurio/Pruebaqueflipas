document.addEventListener('DOMContentLoaded', function() {
    cargarCapacitaciones();

    const btnNuevo = document.getElementById('btnNuevaCapacitacion');
    const modal = document.getElementById('modalCapacitacion');
    const btnCerrar = document.getElementById('cerrarModal');
    const formCapacitacion = document.getElementById('formCapacitacion');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formCapacitacion.reset();
        });
    }

    if (formCapacitacion) {
        formCapacitacion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formCapacitacion);
            formData.append('accion', 'crear');

            fetch('php/capacitaciones.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formCapacitacion.reset();
                    modal.style.display = 'none';
                    cargarCapacitaciones();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarCapacitaciones() {
    const cuerpoTabla = document.getElementById('cuerpoTablaCapacitaciones');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/capacitaciones.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(capacitacion => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${capacitacion.id_capacitacion}</td>
                    <td>${capacitacion.nombre}</td>
                    <td>${capacitacion.duracion}</td>
                    <td>${capacitacion.modalidad}</td>
                    <td><span class="estado activo">${capacitacion.estado}</span></td>
                    <td>
                        <button class="btn-editar"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="eliminarCapacitacion(${capacitacion.id_capacitacion})" class="btn-eliminar">
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

function eliminarCapacitacion(id) {
    if (confirm('¿Está seguro de que desea eliminar esta capacitación del sistema?')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_capacitacion', id);

        fetch('php/capacitaciones.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarCapacitaciones();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}