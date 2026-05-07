USE Conocimiento_Universitario;

CREATE TABLE usuario (
    email VARCHAR(200) PRIMARY KEY,
    contrasena VARCHAR(200) NOT NULL
);

CREATE TABLE rol (
    id INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE rol_usuario (
    id INT IDENTITY PRIMARY KEY,
    fkemail VARCHAR(200) REFERENCES usuario(email),
    fkidrol INTEGER REFERENCES rol(id)
);

CREATE TABLE ruta (
    id INT IDENTITY PRIMARY KEY,
    ruta VARCHAR(200) NOT NULL,
    descripcion TEXT DEFAULT ''
);

CREATE TABLE rutarol (
    id INT IDENTITY PRIMARY KEY,
    fkidrol INTEGER REFERENCES rol(id),
    fkidruta INTEGER REFERENCES ruta(id)
);



insert into ruta (ruta, descripcion) values
('/beca', ''),
('/docente', ''),
('/apoyo_profesoral', ''),
('/aliados', ''),
('/docente_departamento', ''),
('/alianza', ''),
('/estudios_realizados', ''),
('/estudio_ac', ''),
('/reconocimiento', ''),
('/experiencia', '');

insert into rol (nombre) values
('admin'),
('user');

insert into rutarol (fkidrol, fkidruta) values
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(2, 2),
(2, 7);

insert into rol_usuario (fkemail, fkidrol) values
('estebancespedesg@gmail.com', 1)
insert into rol_usuario (fkemail, fkidrol) values
('carolinagomez1132493@correo.itm.edu.co', 1)

DELETE FROM rol_usuario WHERE fkemail = 'carolinagomez1132493@correo.itm.edu.co'

insert into rol_usuario (fkemail, fkidrol) values
('estebancespedesg@gmail.com', 2)

CREATE OR ALTER PROCEDURE dbo.obtener_acceso
	@email VARCHAR(200)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT ruta.ruta
	FROM dbo.usuario u
	INNER JOIN rol_usuario ON u.email = rol_usuario.fkemail
	INNER JOIN rol ON rol_usuario.fkidrol = rol.id
	INNER JOIN rutarol ON rol.id = rutarol.fkidrol
	INNER JOIN ruta ON rutarol.fkidruta = ruta.id
	WHERE u.email = 'estebancespedesg@gmail.com';
END;
