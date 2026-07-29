<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT id_empleado, nombre, apellido1, apellido2, ci FROM empleado ORDER BY id_empleado DESC";
            $stmt = $conexion->query($query);
            $empleados = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $empleados]);
            break;

        case 'crear':
            $nombre = $_POST['nombre'];
            $apellido1 = $_POST['apellido1'];
            $apellido2 = isset($_POST['apellido2']) ? $_POST['apellido2'] : '';
            $ci = $_POST['ci'];

            $query = "INSERT INTO empleado (nombre, apellido1, apellido2, ci) VALUES (:nombre, :apellido1, :apellido2, :ci)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':apellido1', $apellido1);
            $stmt->bindParam(':apellido2', $apellido2);
            $stmt->bindParam(':ci', $ci);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Empleado registrado exitosamente.']);
            break;

        case 'eliminar':
            $id_empleado = $_POST['id_empleado'];
            $query = "DELETE FROM empleado WHERE id_empleado = :id_empleado";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_empleado', $id_empleado);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Empleado eliminado del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    if ($e->getCode() == '23505') {
        echo json_encode(['success' => false, 'message' => 'Error: El número de carnet de identidad ya existe en el sistema.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error interno de base de datos.']);
    }
}
?>