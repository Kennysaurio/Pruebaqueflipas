<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT p.id_programacion, c.nombre AS capacitacion, p.fecha_inicio, p.fecha_fin, p.hora_inicio, p.hora_fin, p.lugar, p.cupo_maximo 
                      FROM programacion_capacitacion p 
                      INNER JOIN capacitaciones c ON p.id_capacitacion = c.id_capacitacion 
                      ORDER BY p.id_programacion DESC";
            $stmt = $conexion->query($query);
            $programaciones = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $programaciones]);
            break;

        case 'crear':
            $id_capacitacion = $_POST['id_capacitacion'];
            $id_responsable = $_POST['id_responsable'];
            $fecha_inicio = $_POST['fecha_inicio'];
            $fecha_fin = $_POST['fecha_fin'];
            $hora_inicio = $_POST['hora_inicio'];
            $hora_fin = $_POST['hora_fin'];
            $lugar = $_POST['lugar'];
            $cupo_maximo = $_POST['cupo_maximo'];

            $query = "INSERT INTO programacion_capacitacion (id_capacitacion, id_responsable, fecha_inicio, fecha_fin, hora_inicio, hora_fin, lugar, cupo_maximo) 
                      VALUES (:id_capacitacion, :id_responsable, :fecha_inicio, :fecha_fin, :hora_inicio, :hora_fin, :lugar, :cupo_maximo)";
            
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_capacitacion', $id_capacitacion);
            $stmt->bindParam(':id_responsable', $id_responsable);
            $stmt->bindParam(':fecha_inicio', $fecha_inicio);
            $stmt->bindParam(':fecha_fin', $fecha_fin);
            $stmt->bindParam(':hora_inicio', $hora_inicio);
            $stmt->bindParam(':hora_fin', $hora_fin);
            $stmt->bindParam(':lugar', $lugar);
            $stmt->bindParam(':cupo_maximo', $cupo_maximo);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Programación registrada exitosamente.']);
            break;

        case 'eliminar':
            $id_programacion = $_POST['id_programacion'];
            $query = "DELETE FROM programacion_capacitacion WHERE id_programacion = :id_programacion";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_programacion', $id_programacion);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Programación eliminada del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error interno de base de datos. Verifique que los IDs existan.']);
}
?>