document.addEventListener('DOMContentLoaded', function() {
    cargarEmpleados();

    const btnNuevo = document.getElementById('btnNuevoEmpleado');
    const modal = document.getElementById('modalEmpleado');
    const btnCerrar = document.getElementById('cerrarModal');
    const formEmpleado = document.getElementById('formEmpleado');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formEmpleado.reset();
        });
    }

    if (formEmpleado) {
        formEmpleado.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formEmpleado);
            formData.append('accion', 'crear');

            fetch('php/empleados.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formEmpleado.reset();
                    modal.style.display = 'none';
                    cargarEmpleados();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarEmpleados() {
    const cuerpoTabla = document.getElementById('cuerpoTablaEmpleados');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/empleados.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(empleado => {
                const fila = document.createElement('tr');
                const apellido2 = empleado.apellido2 ? empleado.apellido2 : '';
                
                // Los apellidos se unen en una sola celda para respetar las 5 cabeceras del HTML
                fila.innerHTML = `
                    <td>${empleado.id_empleado}</td>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.apellido1} ${apellido2}</td>
                    <td>${empleado.ci}</td>
                    <td>
                        <button class="btn-editar"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="eliminarEmpleado(${empleado.id_empleado})" class="btn-eliminar">
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

function eliminarEmpleado(id) {
    if (confirm('¿Está seguro de que desea eliminar este empleado del sistema? Esto eliminará también su usuario y registros asociados.')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_empleado', id);

        fetch('php/empleados.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarEmpleados();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}