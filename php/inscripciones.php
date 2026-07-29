<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT i.id_inscripcion, i.fecha_inscripcion, i.estado, e.nombre, e.apellido1, e.ci, c.nombre AS capacitacion 
                      FROM inscripciones i 
                      INNER JOIN empleado e ON i.id_empleado = e.id_empleado 
                      INNER JOIN programacion_capacitacion p ON i.id_programacion = p.id_programacion 
                      INNER JOIN capacitaciones c ON p.id_capacitacion = c.id_capacitacion 
                      ORDER BY i.id_inscripcion DESC";
            $stmt = $conexion->query($query);
            $inscripciones = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $inscripciones]);
            break;

        case 'crear':
            $id_programacion = $_POST['id_programacion'];
            $id_empleado = $_POST['id_empleado'];
            $estado = $_POST['estado'];

            $query = "INSERT INTO inscripciones (id_programacion, id_empleado, estado) VALUES (:id_programacion, :id_empleado, :estado)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_programacion', $id_programacion);
            $stmt->bindParam(':id_empleado', $id_empleado);
            $stmt->bindParam(':estado', $estado);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Inscripción registrada exitosamente.']);
            break;

        case 'eliminar':
            $id_inscripcion = $_POST['id_inscripcion'];
            $query = "DELETE FROM inscripciones WHERE id_inscripcion = :id_inscripcion";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_inscripcion', $id_inscripcion);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Inscripción eliminada del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    if ($e->getCode() == '23505') {
        echo json_encode(['success' => false, 'message' => 'Error: El empleado ya se encuentra inscrito en esta programación.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error interno. Verifique que los IDs de programación y empleado existan.']);
    }
}
?>