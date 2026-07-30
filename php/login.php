<?php
require_once 'conexion.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuarioFormulario = $_POST['usuario'] ?? '';
    $passwordFormulario = $_POST['password'] ?? '';

    if (empty($usuarioFormulario) || empty($passwordFormulario)) {
        echo json_encode(['success' => false, 'message' => 'Validación fallida: Por favor, complete todos los campos de autenticación obligatorios.']);
        exit;
    }

    try {
        // La consulta estructural une la tabla usuarios con la tabla empleado para permitir la autenticación mediante el Carnet de Identidad
        $query = "SELECT u.id_usuario, u.contrasena, u.rol 
                  FROM usuarios u 
                  INNER JOIN empleado e ON u.id_empleado = e.id_empleado 
                  WHERE e.ci = :usuario";
                  
        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':usuario', $usuarioFormulario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($passwordFormulario === $user['contrasena']) {
                $rolAsignado = $user['rol'];
                
                if ($rolAsignado !== 'Gerente' && $rolAsignado !== 'Responsable') {
                    $rolAsignado = 'Responsable';
                }

                echo json_encode([
                    'success' => true, 
                    'message' => 'Autenticación procesada exitosamente. Estableciendo conexión segura con el sistema central.',
                    'rol' => $rolAsignado
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Credenciales denegadas: La contraseña ingresada no coincide con nuestros registros de seguridad.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Acceso denegado: El identificador proporcionado no existe en la base de datos corporativa.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Fallo técnico interno: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error de protocolo HTTP: Método de transmisión no permitido en este controlador.']);
}
?>