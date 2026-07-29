document.addEventListener('DOMContentLoaded', function() {
    cargarCertificados();

    const btnNuevo = document.getElementById('btnNuevoCertificado');
    const modal = document.getElementById('modalCertificado');
    const btnCerrar = document.getElementById('cerrarModal');
    const formCertificado = document.getElementById('formCertificado');

    if (btnNuevo) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            formCertificado.reset();
        });
    }

    if (formCertificado) {
        formCertificado.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formCertificado);
            formData.append('accion', 'crear');

            fetch('php/certificados.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    formCertificado.reset();
                    modal.style.display = 'none';
                    cargarCertificados();
                }
            })
            .catch(error => console.error('Error en la petición:', error));
        });
    }
});

function cargarCertificados() {
    const cuerpoTabla = document.getElementById('cuerpoTablaCertificados');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/certificados.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(certificado => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>CERT-${certificado.id_certificado.toString().padStart(4, '0')}</td>
                    <td>${certificado.nombre} ${certificado.apellido1}</td>
                    <td>${certificado.ci}</td>
                    <td>${certificado.capacitacion}</td>
                    <td>${certificado.fecha_emision}</td>
                    <td>
                        <button class="btn-editar" title="Descargar PDF"><i class="fa-solid fa-download"></i></button>
                        <button onclick="eliminarCertificado(${certificado.id_certificado})" class="btn-eliminar" title="Eliminar">
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

function eliminarCertificado(id) {
    if (confirm('¿Está seguro de que desea eliminar este certificado? Esta acción no se puede deshacer.')) {
        const formData = new FormData();
        formData.append('accion', 'eliminar');
        formData.append('id_certificado', id);

        fetch('php/certificados.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                cargarCertificados();
            }
        })
        .catch(error => console.error('Error al eliminar:', error));
    }
}