<?php
$host = 'aws-0-ca-central-1.pooler.supabase.com';
$port = '5432';
$dbname = 'postgres';
$user = 'postgres.mjvxguimdjzxubwpsuxh';
$password = 'tugfaen4pendejo';

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    
    $opciones = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $conexion = new PDO($dsn, $user, $password, $opciones);
    
    // Si al guardar este archivo y recargar localhost/Novatech/php/conexion.php 
    // la pantalla se queda completamente en blanco, la conexion fue un exito total.
    
} catch (PDOException $e) {
    die("Error critico en la conexion a la base de datos: " . $e->getMessage());
}
?>