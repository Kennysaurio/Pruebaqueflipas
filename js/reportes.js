document.addEventListener('DOMContentLoaded', function() {
    cargarReportes();
});

function cargarReportes() {
    const cuerpoTabla = document.getElementById('cuerpoTablaReportes');
    if (!cuerpoTabla) return;

    const formData = new FormData();
    formData.append('accion', 'leer');

    fetch('php/reportes.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(reporte => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${reporte.id_capacitacion}</td>
                    <td>${reporte.nombre}</td>
                    <td>${reporte.modalidad}</td>
                    <td><span class="estado activo">${reporte.estado}</span></td>
                    <td><strong>${reporte.total_inscritos}</strong> Empleados</td>
                    <td>
                        <button onclick="visualizarDocumento()" class="btn-editar" title="Visualizar">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button onclick="descargarDocumento()" class="btn-editar" style="background-color: #28a745;" title="Descargar PDF">
                            <i class="fa-solid fa-download"></i>
                        </button>
                    </td>
                `;
                cuerpoTabla.appendChild(fila);
            });
        }
    })
    .catch(error => console.error('Error al cargar datos del reporte:', error));
}

function generarReporte() {
    cargarReportes();
    alert('Los datos estadísticos han sido actualizados exitosamente con la información más reciente de la base de datos.');
}

function visualizarDocumento() {
    alert('Visualizando la vista previa del documento. La generación nativa de PDF se implementará en la etapa de optimización.');
}

function descargarDocumento() {
    alert('Iniciando descarga del reporte en formato estructurado. Funcionalidad en desarrollo para la fase de librerías externas.');
}