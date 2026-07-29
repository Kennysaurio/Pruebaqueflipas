document.addEventListener('DOMContentLoaded', function() {
    cargarInscripciones();

    const btnNuevo = document.getElementById('btnNuevaInscripcion');
    const modal = document.getElementById('modalInscripcion');
    const btnCerrar = document.getElementById('cerrarModal');
    const formInscripcion = document.getElementById('formInscripcion');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formInscripcion.reset();
        });
    }

    if (formInscripcion) {
        formInscripcion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formInscripcion);
            formData.append('accion', 'crear');

            fetch('php/inscripciones.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formInscripcion.reset();
                    modal.style.display = 'none';
                    cargarInscripciones();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarInscripciones() {
    const cuerpoTabla = document.getElementById('cuerpoTablaInscripciones');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/inscripciones.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(inscripcion => {
                // Formatear la fecha para mostrar solo la parte de la fecha si es un timestamp
                const fechaCorta = inscripcion.fecha_inscripcion.split(' ')[0];
                
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${inscripcion.id_inscripcion}</td>
                    <td>${inscripcion.nombre} ${inscripcion.apellido1}</td>
                    <td>${inscripcion.ci}</td>
                    <td>${inscripcion.capacitacion}</td>
                    <td>${fechaCorta}</td>
                    <td><span class="estado activo">${inscripcion.estado}</span></td>
                    <td>
                        <button class="btn-editar"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="eliminarInscripcion(${inscripcion.id_inscripcion})" class="btn-eliminar">
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

function eliminarInscripcion(id) {
    if (confirm('¿Está seguro de que desea eliminar esta inscripción del sistema?')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_inscripcion', id);

        fetch('php/inscripciones.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarInscripciones();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}