document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de la extracción de registros desde la base de datos
    cargarReportes();

    // Intercepción del nuevo nodo estructural del botón global
    const btnGenerarPDF = document.getElementById('btnGenerarPDF');
    
    // Vinculación del evento de clic a la función principal de renderizado
    if (btnGenerarPDF) {
        btnGenerarPDF.addEventListener('click', window.descargarDocumento);
    }
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
                    <td><strong>${reporte.total_inscritos}</strong> Registros Confirmados</td>
                    <td>
                        <button onclick="visualizarDocumento()" class="btn-editar" style="background-color: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;" title="Visualización Previa del Reporte de Auditoría">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button onclick="descargarDocumento()" class="btn-editar" style="background-color: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" title="Exportar Reporte Estadístico en Formato PDF">
                            <i class="fa-solid fa-download"></i>
                        </button>
                    </td>
                `;
                cuerpoTabla.appendChild(fila);
            });
            
            if(typeof aplicarControlDeAccesos === 'function') {
                aplicarControlDeAccesos();
            }
        }
    })
    .catch(error => console.error('Error severo al intentar cargar los datos estadísticos del reporte gerencial:', error));
}

function generarReporte() {
    cargarReportes();
    alert('Los indicadores estadísticos de participación han sido sincronizados y actualizados exitosamente con la información más reciente de los servidores de la base de datos corporativa.');
}

function visualizarDocumento() {
    alert('El módulo de visualización previa integrada se encuentra en fase de validación técnica. Se recomienda utilizar directamente la función de exportación PDF habilitada para obtener el documento gerencial de manera inmediata.');
}

window.descargarDocumento = function() {
    // Validación estricta de la existencia del motor matemático en la memoria del navegador
    if (!window.jspdf || !window.jspdf.jsPDF.API.autoTable) {
        alert('Error crítico de dependencias: Los complementos principales y secundarios para la interpretación de matrices de datos no han sido cargados correctamente en la cabecera del documento web.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Inyección de parámetros tipográficos corporativos para la cabecera del documento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 98, 255);
    doc.text("Reporte Estadístico Consolidado de Capacitaciones", 14, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const fechaActual = new Date().toLocaleDateString('es-ES');
    doc.text(`Documento gerencial oficial procesado y generado por el sistema el: ${fechaActual}`, 14, 28);

    // Algoritmo de extracción de texto plano desde el Modelo de Objetos del Documento
    const cuerpoTabla = document.getElementById('cuerpoTablaReportes');
    if (!cuerpoTabla) {
        alert('Error estructural: No se pudo localizar la matriz de datos en el documento.');
        return;
    }

    const filasTabla = cuerpoTabla.querySelectorAll('tr');
    const matrizDatos = [];

    // Iteración condicional para evitar la recolección de nodos HTML interactivos
    filasTabla.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length >= 5) {
            matrizDatos.push([
                celdas[0].innerText.trim(),
                celdas[1].innerText.trim(),
                celdas[2].innerText.trim(),
                celdas[3].innerText.trim(),
                celdas[4].innerText.trim()
            ]);
        }
    });

    if (matrizDatos.length === 0) {
        alert('Validación fallida: No existen registros estadísticos procesados para exportar en el reporte corporativo.');
        return;
    }

    // Renderizado del componente matricial mediante la extensión AutoTable
    doc.autoTable({
        head: [['ID', 'Nombre del Programa', 'Modalidad', 'Estado Operativo', 'Métrica de Participación']],
        body: matrizDatos,
        startY: 35,
        theme: 'grid',
        headStyles: { 
            fillColor: [0, 98, 255],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center'
        },
        styles: {
            font: 'helvetica',
            fontSize: 10,
            cellPadding: 5
        },
        alternateRowStyles: {
            fillColor: [245, 248, 255]
        }
    });

    // Ejecución de la orden de guardado en el almacenamiento local del usuario
    doc.save(`Reporte_Gerencial_y_Estadistico_Novatech_${fechaActual.replace(/\//g, '-')}.pdf`);
};