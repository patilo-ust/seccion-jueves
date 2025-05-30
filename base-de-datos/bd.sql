CREATE DATABASE sistema_ventas;
USE sistema_ventas;

-- Crear la tabla de usuarios para almacenar información de clientes o empleados
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID único para cada usuario
    nombre VARCHAR(50), -- Nombre del usuario
    correo VARCHAR(100) UNIQUE, -- Correo electrónico único
    contraseña VARCHAR(255), -- Contraseña almacenada en formato seguro
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del usuario
);

-- Crear la tabla de ventas para registrar compras realizadas por los usuarios
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT, -- ID del usuario que realizó la compra
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de la venta
    total DECIMAL(10,2), -- Monto total de la venta
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear la tabla de tickets para gestionar consultas, reclamos o soporte
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT, -- ID de la venta asociada al ticket
    detalle TEXT, -- Detalles o descripción del ticket
    estado ENUM('abierto', 'proceso', 'cerrado', 'derivado') DEFAULT 'abierto', -- Estado del ticket
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación del ticket
    FOREIGN KEY (venta_id) REFERENCES ventas(id)
);

-- Crear la tabla historial_tickets para registrar cambios en los estados de los tickets
CREATE TABLE historial_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT, -- ID del ticket asociado
    estado_anterior ENUM('abierto', 'proceso', 'cerrado', 'derivado'), -- Estado previo del ticket
    estado_nuevo ENUM('abierto', 'proceso', 'cerrado', 'derivado'), -- Estado actualizado del ticket
    cambiado_en DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha en que se realizó el cambio
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

-- Crear un trigger que registra cambios en los estados de los tickets
DELIMITER //

CREATE TRIGGER registrar_cambio_estado AFTER UPDATE ON tickets
FOR EACH ROW
BEGIN
    IF OLD.estado <> NEW.estado THEN
        INSERT INTO historial_tickets (ticket_id, estado_anterior, estado_nuevo, cambiado_en)
        VALUES (NEW.id, OLD.estado, NEW.estado, NOW());
    END IF;
END;

//
DELIMITER ;

-- Crear un trigger que actualiza el total de ventas al agregar nuevos tickets (requiere una columna monto en tickets)
DELIMITER //

CREATE TRIGGER actualizar_total_venta AFTER INSERT ON tickets
FOR EACH ROW
BEGIN
    UPDATE ventas 
    SET total = total + (SELECT SUM(monto) FROM tickets WHERE venta_id = NEW.venta_id)
    WHERE id = NEW.venta_id;
END;

//
DELIMITER ;

-- Crear un trigger que evita borrar usuarios si tienen ventas registradas
DELIMITER //

CREATE TRIGGER prevenir_borrado_usuario BEFORE DELETE ON usuarios
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM ventas WHERE usuario_id = OLD.id) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede eliminar un usuario con ventas registradas';
    END IF;
END;

//
DELIMITER ;

-- Crear una vista para mostrar los usuarios con el número total de ventas que han realizado
CREATE VIEW vista_usuarios_ventas AS
SELECT u.id, u.nombre, u.correo, u.creado_en, 
       COUNT(v.id) AS total_ventas
FROM usuarios u
LEFT JOIN ventas v ON u.id = v.usuario_id
GROUP BY u.id, u.nombre, u.correo, u.creado_en;

-- Crear una vista para mostrar detalles de tickets junto con la venta y usuario relacionado
CREATE VIEW vista_tickets_detalle AS
SELECT t.id, t.detalle, t.estado, t.creado_en, 
       v.id AS venta_id, v.fecha AS fecha_venta, v.total AS total_venta,
       u.nombre AS usuario
FROM tickets t
JOIN ventas v ON t.venta_id = v.id
JOIN usuarios u ON v.usuario_id = u.id;

-- Crear una vista para calcular el total de ingresos generados por cada usuario
CREATE VIEW vista_ingresos_por_usuario AS
SELECT u.id, u.nombre, SUM(v.total) AS ingresos_totales
FROM usuarios u
JOIN ventas v ON u.id = v.usuario_id
GROUP BY u.id, u.nombre;
