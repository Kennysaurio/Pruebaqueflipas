<?php
require_once 'conexion.php';
header('Content-Type: application/json');

try {
    $qEmpleados = $conexion->query("SELECT COUNT(*) as total FROM empleado");
    $tEmpleados = $qEmpleados->fetch()['total'];

    $qCapacitaciones = $conexion->query("SELECT COUNT(*) as total FROM capacitaciones WHERE estado = 'Activa'");
    $tCapacitaciones = $qCapacitaciones->fetch()['total'];

    $qInscripciones = $conexion->query("SELECT COUNT(*) as total FROM inscripciones");
    $tInscripciones = $qInscripciones->fetch()['total'];

    $qCertificados = $conexion->query("SELECT COUNT(*) as total FROM certificado");
    $tCertificados = $qCertificados->fetch()['total'];

    $qRecientes = $conexion->query("SELECT c.nombre, c.modalidad, p.fecha_inicio, p.cupo_maximo 
                                    FROM programacion_capacitacion p 
                                    INNER JOIN capacitaciones c ON p.id_capacitacion = c.id_capacitacion 
                                    ORDER BY p.id_programacion DESC LIMIT 5");
    $recientes = $qRecientes->fetchAll();

    echo json_encode([
        'success' => true,
        'tarjetas' => [
            'empleados' => $tEmpleados,
            'capacitaciones' => $tCapacitaciones,
            'inscripciones' => $tInscripciones,
            'certificados' => $tCertificados
        ],
        'recientes' => $recientes
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de BD']);
}
?>