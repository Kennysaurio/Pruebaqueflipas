<?php
session_start();
require_once 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
    $contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';

    if (empty($usuario) || empty($contrasena)) {
        echo json_encode(['success' => false, 'message' => 'Debe ingresar su usuario y contraseña.']);
        exit;
    }

    try {
        $query = "SELECT u.id_usuario, u.rol, u.estado, e.nombre, e.apellido1 
                  FROM usuarios u 
                  INNER JOIN empleado e ON u.id_empleado = e.id_empleado 
                  WHERE e.ci = :usuario AND u.contrasena = :contrasena";
        
        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':usuario', $usuario);
        $stmt->bindParam(':contrasena', $contrasena);
        $stmt->execute();
        
        $user = $stmt->fetch();

        if ($user) {
            if ($user['estado'] === 'Activo') {
                $_SESSION['id_usuario'] = $user['id_usuario'];
                $_SESSION['rol'] = $user['rol'];
                $_SESSION['nombre_completo'] = $user['nombre'] . ' ' . $user['apellido1'];
                
                echo json_encode([
                    'success' => true, 
                    'message' => 'Acceso autorizado.', 
                    'rol' => $user['rol']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Su cuenta de usuario se encuentra inactiva.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas. Verifique su información.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error interno en el servidor de base de datos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
?>