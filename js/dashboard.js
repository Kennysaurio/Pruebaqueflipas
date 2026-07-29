document.addEventListener('DOMContentLoaded', function() {
    cargarDashboard();
});

function cargarDashboard() {
    fetch('php/dashboard.php')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('totEmpleados').textContent = data.tarjetas.empleados;
            document.getElementById('totCapacitaciones').textContent = data.tarjetas.capacitaciones;
            document.getElementById('totInscripciones').textContent = data.tarjetas.inscripciones;
            document.getElementById('totCertificados').textContent = data.tarjetas.certificados;

            const cuerpoTabla = document.getElementById('cuerpoTablaDashboard');
            if (cuerpoTabla) {
                cuerpoTabla.innerHTML = '';
                data.recientes.forEach(item => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${item.nombre}</td>
                        <td>${item.modalidad}</td>
                        <td>${item.fecha_inicio}</td>
                        <td>${item.cupo_maximo}</td>
                    `;
                    cuerpoTabla.appendChild(fila);
                });
            }

            renderizarGrafico(data.tarjetas);
        }
    })
    .catch(error => console.error('Error al cargar dashboard:', error));
}

function renderizarGrafico(tarjetas) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Empleados', 'Cursos Activos', 'Inscripciones', 'Certificados'],
            datasets: [{
                label: 'Métricas del Sistema',
                data: [tarjetas.empleados, tarjetas.capacitaciones, tarjetas.inscripciones, tarjetas.certificados],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}