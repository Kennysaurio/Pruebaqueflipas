<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT id_capacitacion, nombre, descripcion, duracion, modalidad, estado FROM capacitaciones ORDER BY id_capacitacion DESC";
            $stmt = $conexion->query($query);
            $capacitaciones = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $capacitaciones]);
            break;

        case 'crear':
            $nombre = $_POST['nombre'];
            $descripcion = $_POST['descripcion'];
            $duracion = $_POST['duracion'];
            $modalidad = $_POST['modalidad'];
            $estado = 'Activa';

            $query = "INSERT INTO capacitaciones (nombre, descripcion, duracion, modalidad, estado) VALUES (:nombre, :descripcion, :duracion, :modalidad, :estado)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':duracion', $duracion);
            $stmt->bindParam(':modalidad', $modalidad);
            $stmt->bindParam(':estado', $estado);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Capacitación registrada exitosamente.']);
            break;

        case 'eliminar':
            $id_capacitacion = $_POST['id_capacitacion'];
            $query = "DELETE FROM capacitaciones WHERE id_capacitacion = :id_capacitacion";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_capacitacion', $id_capacitacion);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Capacitación eliminada del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error interno de base de datos: ' . $e->getMessage()]);
}
?>