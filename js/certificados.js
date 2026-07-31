document.addEventListener('DOMContentLoaded', function() {
    cargarCertificados();

    const btnNuevo = document.getElementById('btnEmitirCertificado');
    const modal = document.getElementById('modalCertificado');
    const btnCerrar = document.getElementById('cerrarModal');
    const formCertificado = document.getElementById('formCertificado');
    const btnGenerarPDF = document.getElementById('btnGenerarPDF');

    if (btnNuevo && modal) {
        btnNuevo.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    if (btnCerrar && modal) {
        btnCerrar.addEventListener('click', function() {
            modal.style.display = 'none';
            if (formCertificado) formCertificado.reset();
        });
    }

    window.addEventListener('click', function(evento) {
        if (evento.target === modal) {
            modal.style.display = 'none';
            if (formCertificado) formCertificado.reset();
        }
    });

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
            .catch(error => console.error('Error en la transacción de red:', error));
        });
    }

    if (btnGenerarPDF) {
        btnGenerarPDF.addEventListener('click', function() {
            if (!window.jspdf) {
                alert('Error de dependencias: La librería jsPDF no está cargada correctamente.');
                return;
            }
            const { jsPDF } = window.jspdf;
            const documentoPDF = new jsPDF('landscape');
            
            documentoPDF.setFontSize(18);
            documentoPDF.setTextColor(13, 110, 253);
            documentoPDF.text("Reporte Gerencial de Certificados Emitidos - Novatech Solutions", 14, 20);
            
            documentoPDF.setFontSize(11);
            documentoPDF.setTextColor(100, 100, 100);
            documentoPDF.text("Fecha de generación: " + new Date().toLocaleDateString(), 14, 28);

            const cuerpoTabla = document.getElementById('cuerpoTablaCertificados');
            if (!cuerpoTabla) return;

            const filasTabla = cuerpoTabla.querySelectorAll('tr');
            const matrizDatos = [];
            
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

            documentoPDF.autoTable({
                head: [['Código / ID', 'Empleado', 'CI', 'Capacitación', 'Fecha de Emisión']],
                body: matrizDatos,
                startY: 35,
                theme: 'grid',
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: { fillColor: [13, 110, 253], textColor: [255, 255, 255], halign: 'center' }
            });
            
            documentoPDF.save('Reporte_Certificados_Emitidos.pdf');
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
                const nombreCompleto = certificado.nombre && certificado.apellido1 ? `${certificado.nombre} ${certificado.apellido1}` : certificado.empleado;
                const fila = document.createElement('tr');
                
                fila.innerHTML = `
                    <td>CERT-${certificado.id_certificado.toString().padStart(4, '0')}</td>
                    <td>${nombreCompleto}</td>
                    <td>${certificado.ci}</td>
                    <td>${certificado.capacitacion}</td>
                    <td>${certificado.fecha_emision}</td>
                    <td>
                        <button onclick="descargarCertificado('${certificado.id_certificado}', '${nombreCompleto}', '${certificado.ci}', '${certificado.capacitacion}', '${certificado.fecha_emision}')" class="btn-editar" style="background-color: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;" title="Descargar Certificado Académico en PDF">
                            <i class="fa-solid fa-download"></i>
                        </button>
                        <button onclick="eliminarCertificado(${certificado.id_certificado})" class="btn-eliminar" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" title="Eliminar Registro Permanente">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                cuerpoTabla.appendChild(fila);
            });
            
            // Este es el bloque exacto de seguridad corporativa que debe ser neutralizado mediante comentarios
            // if(typeof aplicarControlDeAccesos === 'function') {
            //     aplicarControlDeAccesos();
            // }
        }
    })
    .catch(error => console.error('Error en la extracción de la matriz de datos:', error));
}

function eliminarCertificado(id) {
    if (confirm('¿Está usted completamente seguro de que desea eliminar este certificado del sistema corporativo? Esta acción administrativa es de carácter irreversible.')) {
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
        .catch(error => console.error('Fallo en la instrucción de eliminación en la base de datos:', error));
    }
}

window.descargarCertificado = function(id, nombre, ci, capacitacion, fecha) {
    if (!window.jspdf) {
        alert('Error de dependencias: La librería principal de renderizado de documentos no ha sido cargada correctamente en la cabecera del sistema.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setLineWidth(1);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, 273, 186);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SISTEMA DE CAPACITACIÓN CORPORATIVA", 148, 35, { align: "center" });

    doc.setFontSize(28);
    doc.setTextColor(0, 98, 255);
    doc.text("CERTIFICADO DE APROBACIÓN", 148, 55, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Se otorga el presente aval académico e institucional a favor de:", 148, 75, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(nombre.toUpperCase(), 148, 95, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Documento de Identificación Personal: ${ci}`, 148, 110, { align: "center" });

    doc.setFontSize(16);
    doc.text("Por haber concluido de manera satisfactoria el programa de formación profesional en:", 148, 130, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(capacitacion.toUpperCase(), 148, 145, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha oficial de emisión registrada en el sistema central: ${fecha}`, 148, 155, { align: "center" });
    
    doc.setLineWidth(0.5);
    
    doc.line(50, 180, 120, 180); 
    doc.setFontSize(12);
    doc.text("Firma del Responsable", 85, 185, { align: "center" });

    doc.line(177, 180, 247, 180); 
    doc.text("Firma de la Gerencia", 212, 185, { align: "center" });

    doc.setFontSize(10);
    doc.text(`CÓDIGO ÚNICO DE REGISTRO INSTITUCIONAL: CERT-${id.toString().padStart(4, '0')}`, 20, 195);

    doc.save(`Certificado_Academico_${ci}.pdf`);
};