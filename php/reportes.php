<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT c.id_capacitacion, c.nombre, c.modalidad, c.estado, 
                             COUNT(i.id_inscripcion) AS total_inscritos 
                      FROM capacitaciones c 
                      LEFT JOIN programacion_capacitacion p ON c.id_capacitacion = p.id_capacitacion 
                      LEFT JOIN inscripciones i ON p.id_programacion = i.id_programacion 
                      GROUP BY c.id_capacitacion, c.nombre, c.modalidad, c.estado 
                      ORDER BY total_inscritos DESC";
            
            $stmt = $conexion->query($query);
            $reportes = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'data' => $reportes]);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error interno al generar el reporte en la base de datos.']);
}
?>