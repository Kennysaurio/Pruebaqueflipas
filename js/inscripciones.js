document.addEventListener('DOMContentLoaded', function() {
    cargarInscripciones();

    // Declaración segura de nodos estructurales para la ventana de Nueva Inscripción
    const btnNuevo = document.getElementById('btnNuevaInscripcion');
    const modalInscripcion = document.getElementById('modalInscripcion');
    const btnCerrar = document.getElementById('cerrarModal');
    const formInscripcion = document.getElementById('formInscripcion');

    // Declaración segura de nodos estructurales para la ventana de Asistencia por Curso
    const btnModalAsistencia = document.getElementById('btnModalAsistencia');
    const modalAsistencia = document.getElementById('modalAsistencia');
    const btnCerrarAsistencia = document.getElementById('cerrarModalAsistencia');
    const formAsistencia = document.getElementById('formAsistencia');

    // Nodo estructural para el botón de Reporte General en PDF
    const btnGenerarPDFGeneral = document.getElementById('btnGenerarPDFGeneral');

    // Lógica interactiva para la apertura del modal de nueva inscripción
    if (btnNuevo && modalInscripcion) {
        btnNuevo.addEventListener('click', function() {
            modalInscripcion.style.display = 'block';
        });
    }

    // Lógica interactiva para el cierre del modal de nueva inscripción
    if (btnCerrar && modalInscripcion) {
        btnCerrar.addEventListener('click', function() {
            modalInscripcion.style.display = 'none';
            if (formInscripcion) formInscripcion.reset();
        });
    }

    // Lógica interactiva para la apertura del modal de asistencia por curso
    if (btnModalAsistencia && modalAsistencia) {
        btnModalAsistencia.addEventListener('click', function() {
            modalAsistencia.style.display = 'block';
        });
    }

    // Lógica interactiva para el cierre del modal de asistencia por curso
    if (btnCerrarAsistencia && modalAsistencia) {
        btnCerrarAsistencia.addEventListener('click', function() {
            modalAsistencia.style.display = 'none';
            if (formAsistencia) formAsistencia.reset();
        });
    }

    // Manejador global para cerrar los modales al hacer clic en el fondo oscuro exterior
    window.addEventListener('click', function(evento) {
        if (modalInscripcion && evento.target === modalInscripcion) {
            modalInscripcion.style.display = 'none';
            if (formInscripcion) formInscripcion.reset();
        }
        if (modalAsistencia && evento.target === modalAsistencia) {
            modalAsistencia.style.display = 'none';
            if (formAsistencia) formAsistencia.reset();
        }
    });

    // Petición asíncrona para procesar el registro de una nueva inscripción
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
                    if (modalInscripcion) modalInscripcion.style.display = 'none';
                    cargarInscripciones();
                }
            })
            .catch(error => console.error('Error crítico en la transacción de red:', error));
        });
    }

    // Petición asíncrona para la consulta y renderizado del reporte PDF de asistencia por curso
    if (formAsistencia) {
        formAsistencia.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!window.jspdf) {
                alert('Error de dependencias: El motor de renderizado de documentos no está disponible en la memoria del navegador.');
                return;
            }

            const formData = new FormData(formAsistencia);
            formData.append('accion', 'asistencia_curso');
            const nombreCursoRequerido = formData.get('nombre_capacitacion');

            fetch('php/inscripciones.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data && data.data.length > 0) {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();

                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(18);
                    doc.setTextColor(25, 135, 84);
                    doc.text("Control Oficial de Asistencia de Capacitación", 14, 20);
                    
                    doc.setFontSize(12);
                    doc.setTextColor(50, 50, 50);
                    doc.text(`Programa de Formación: ${nombreCursoRequerido.toUpperCase()}`, 14, 28);
                    
                    const fechaActual = new Date().toLocaleDateString('es-ES');
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text(`Documento emitido el: ${fechaActual} | Total de registros validados: ${data.data.length}`, 14, 34);

                    const matrizAsistencia = data.data.map(registro => [
                        registro.id_inscripcion,
                        `${registro.nombre} ${registro.apellido1}`,
                        registro.ci,
                        registro.fecha_inscripcion ? registro.fecha_inscripcion.split(' ')[0] : '',
                        registro.estado
                    ]);

                    doc.autoTable({
                        head: [['ID', 'Empleado Participante', 'Cédula de Identidad', 'Fecha de Registro', 'Estado']],
                        body: matrizAsistencia,
                        startY: 40,
                        theme: 'grid',
                        headStyles: { fillColor: [25, 135, 84], textColor: 255, halign: 'center' },
                        styles: { fontSize: 10, cellPadding: 4 }
                    });

                    doc.save(`Control_Asistencia_${nombreCursoRequerido.replace(/\s+/g, '_')}.pdf`);
                    
                    formAsistencia.reset();
                    if (modalAsistencia) modalAsistencia.style.display = 'none';
                } else {
                    alert('Validación de base de datos: No se encontraron registros de asistencia bajo el nombre de capacitación ingresado.');
                }
            })
            .catch(error => console.error('Fallo en la consulta asíncrona de asistencia:', error));
        });
    }

    // Algoritmo de compilación para la exportación del reporte general desde el DOM
    if (btnGenerarPDFGeneral) {
        btnGenerarPDFGeneral.addEventListener('click', function() {
            if (!window.jspdf) {
                alert('Error crítico de dependencias: La librería de generación no se encuentra activa.');
                return;
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor(13, 110, 253);
            doc.text("Reporte General de Inscripciones y Registros", 14, 20);
            
            const fechaActual = new Date().toLocaleDateString('es-ES');
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 100, 100);
            doc.text(`Documento gerencial extraído del sistema el: ${fechaActual}`, 14, 28);

            const cuerpoTabla = document.getElementById('cuerpoTablaInscripciones');
            if (!cuerpoTabla) return;

            const filasTabla = cuerpoTabla.querySelectorAll('tr');
            const matrizGeneral = [];

            filasTabla.forEach(fila => {
                const celdas = fila.querySelectorAll('td');
                if (celdas.length >= 6) {
                    matrizGeneral.push([
                        celdas[0].innerText.trim(),
                        celdas[1].innerText.trim(),
                        celdas[2].innerText.trim(),
                        celdas[3].innerText.trim(),
                        celdas[4].innerText.trim(),
                        celdas[5].innerText.trim()
                    ]);
                }
            });

            if (matrizGeneral.length === 0) {
                alert('Advertencia del sistema: No hay registros visibles en la tabla para exportar.');
                return;
            }

            doc.autoTable({
                head: [['ID', 'Empleado', 'CI', 'Capacitación', 'Fecha', 'Estado']],
                body: matrizGeneral,
                startY: 35,
                theme: 'striped',
                headStyles: { fillColor: [13, 110, 253], textColor: 255 },
                styles: { fontSize: 9 }
            });

            doc.save('Reporte_General_Inscripciones.pdf');
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
        if (data.success && data.data) {
            cuerpoTabla.innerHTML = '';
            data.data.forEach(inscripcion => {
                const fechaCorta = inscripcion.fecha_inscripcion ? inscripcion.fecha_inscripcion.split(' ')[0] : '';
                
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
    .catch(error => console.error('Error al cargar datos desde el servidor:', error));
}

function eliminarInscripcion(id) {
    if (confirm('¿Está seguro de que desea eliminar esta inscripción del sistema de manera permanente?')) {
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
        .catch(error => console.error('Error al intentar eliminar el registro:', error));
    }
}