# Sistema de Gestión de Capacitaciones - Novatech

## Descripción del Proyecto
El presente proyecto consiste en un Sistema de Información web desarrollado como parte de los requerimientos académicos para la gestión integral de capacitaciones corporativas. Su objetivo principal es sistematizar y optimizar los procesos de administración de recursos humanos, control de cursos, asignación de programaciones, registro de inscripciones, emisión de certificados y generación de reportes estadísticos. La arquitectura del software está diseñada bajo un estricto modelo cliente-servidor, garantizando la integridad de los datos, la seguridad en las transacciones y una experiencia de usuario fluida mediante la actualización dinámica del Modelo de Objetos del Documento sin necesidad de recargar la interfaz visual.

## Módulos del Sistema
El aplicativo web se compone de múltiples módulos relacionales interconectados que manejan operaciones completas de creación, lectura, actualización y eliminación (CRUD) en la base de datos:

* **Módulo de Usuarios:** Control de credenciales y roles de acceso para la administración segura del sistema.
* **Módulo de Empleados:** Registro detallado del personal corporativo, incluyendo información de identificación y estado.
* **Módulo de Capacitaciones:** Catálogo centralizado de los programas formativos, detallando su duración y modalidad.
* **Módulo de Programaciones:** Planificación temporal y espacial de las capacitaciones, con un control riguroso de cupos máximos.
* **Módulo de Inscripciones:** Gestión asíncrona de la participación del personal en las distintas programaciones habilitadas.
* **Módulo de Certificados:** Emisión y control histórico de las certificaciones otorgadas tras la aprobación de los cursos.
* **Panel de Control (Dashboard) y Reportes:** Interfaz gráfica para la visualización de métricas clave de rendimiento y resúmenes estadísticos generados en tiempo real a partir del procesamiento de datos en el servidor.

## Tecnologías Implementadas
Para el desarrollo de esta plataforma se ha seleccionado un ecosistema de tecnologías que aseguran un rendimiento óptimo, mantenibilidad y escalabilidad del código:

* **Frontend:** Construido con HTML5 semántico, hojas de estilo en cascada (CSS3) estructuradas de manera modular, y lógica de control de interfaz utilizando JavaScript puro (Vanilla JS) para la captura de eventos y el manejo de peticiones asíncronas mediante la API Fetch.
* **Backend:** Programado en PHP, actuando como controlador para interceptar las directivas del cliente, procesar las variables, formatear las respuestas en notación de objetos (JSON) y gestionar los encabezados de red.
* **Base de Datos:** Almacenamiento relacional alojado en la nube mediante Supabase (PostgreSQL), integrado al servidor local utilizando Objetos de Datos de PHP (PDO) y sentencias preparadas (Prepared Statements) para asegurar el sistema contra vulnerabilidades de inyección SQL.
* **Librerías de Terceros:** Implementación de la herramienta Chart.js para la renderización matemática y visualización de gráficos estadísticos en el panel principal.

## Requisitos del Entorno de Ejecución
Para desplegar este sistema en un entorno de desarrollo local y garantizar su correcto funcionamiento, es indispensable contar con las siguientes herramientas informáticas configuradas:

1. Un entorno de servidor web local que soporte la interpretación de scripts del lado del servidor, como Apache (incluido de manera predeterminada en paquetes de software como XAMPP o WAMP).
2. Soporte nativo para el lenguaje de programación PHP en su versión 7.4 o superior.
3. Habilitación de la extensión PDO específica para bases de datos PostgreSQL en el archivo de configuración principal de PHP (`php.ini`), lo cual es un requerimiento absoluto para permitir la comunicación remota con el clúster de Supabase.

## Instrucciones de Instalación
1. Clonar el presente repositorio en el directorio raíz de los documentos de su servidor web local (por ejemplo, dentro de la ruta `C:\xampp\htdocs\`).
2. Verificar la correcta configuración de las credenciales de acceso hacia la base de datos de Supabase ubicadas dentro del archivo controlador `php/conexion.php`.
3. Iniciar los servicios de ejecución del servidor web Apache directamente desde el panel de control de su entorno (ej. XAMPP Control Panel).
4. Acceder al aplicativo web a través de un navegador de internet estándar, ingresando la ruta de anclaje local correspondiente (ej. `http://localhost/nombre-de-la-carpeta/index.html`).
