<?php
require_once 'conexion.php';
header('Content-Type: application/json');

$accion = isset($_POST['accion']) ? $_POST['accion'] : (isset($_GET['accion']) ? $_GET['accion'] : '');

try {
    switch ($accion) {
        case 'leer':
            $query = "SELECT u.id_usuario, u.rol, u.estado, e.nombre, e.apellido1, e.ci 
                      FROM usuarios u 
                      INNER JOIN empleado e ON u.id_empleado = e.id_empleado 
                      ORDER BY u.id_usuario DESC";
            $stmt = $conexion->query($query);
            $usuarios = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $usuarios]);
            break;

        case 'crear':
            $id_empleado = $_POST['id_empleado'];
            $contrasena = $_POST['contrasena'];
            $rol = $_POST['rol'];
            $estado = 'Activo';

            $query = "INSERT INTO usuarios (id_empleado, contrasena, rol, estado) VALUES (:id_empleado, :contrasena, :rol, :estado)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_empleado', $id_empleado);
            $stmt->bindParam(':contrasena', $contrasena);
            $stmt->bindParam(':rol', $rol);
            $stmt->bindParam(':estado', $estado);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Usuario registrado exitosamente.']);
            break;

        case 'eliminar':
            $id_usuario = $_POST['id_usuario'];
            $query = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();
            
            echo json_encode(['success' => true, 'message' => 'Usuario eliminado del sistema.']);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no especificada o inválida.']);
            break;
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error interno de base de datos.']);
}
?>