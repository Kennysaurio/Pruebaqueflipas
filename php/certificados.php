<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT c.id_certificado, c.fecha_emision, e.nombre, e.apellido1, e.ci, cap.nombre AS capacitacion 
                      FROM certificado c 
                      INNER JOIN inscripciones i ON c.id_inscripcion = i.id_inscripcion 
                      INNER JOIN empleado e ON i.id_empleado = e.id_empleado 
                      INNER JOIN programacion_capacitacion p ON i.id_programacion = p.id_programacion 
                      INNER JOIN capacitaciones cap ON p.id_capacitacion = cap.id_capacitacion 
                      ORDER BY c.id_certificado DESC";
            $stmt = $conexion->query($query);
            $certificados = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $certificados]);
            break;

        case 'crear':
            $id_inscripcion = $_POST['id_inscripcion'];
            $fecha_emision = $_POST['fecha_emision'];

            $query = "INSERT INTO certificado (id_inscripcion, fecha_emision) VALUES (:id_inscripcion, :fecha_emision)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_inscripcion', $id_inscripcion);
            $stmt->bindParam(':fecha_emision', $fecha_emision);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Certificado generado y registrado exitosamente.']);
            break;

        case 'eliminar':
            $id_certificado = $_POST['id_certificado'];
            $query = "DELETE FROM certificado WHERE id_certificado = :id_certificado";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_certificado', $id_certificado);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Certificado eliminado del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    if ($e->getCode() == '23505') {
        echo json_encode(['success' => false, 'message' => 'Error: Ya existe un certificado emitido para esta inscripción.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error interno. Verifique que el ID de inscripción sea válido.']);
    }
}
?>