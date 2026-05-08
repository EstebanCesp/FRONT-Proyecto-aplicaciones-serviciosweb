USE SG_Conocimiento
--Leer apoyo_profesoral
CREATE PROCEDURE dbo.sp_leer_apoyo_profesoral
AS
BEGIN
	SET NOCOUNT ON;
	(SELECT 
		(SELECT * FROM dbo.estudios_realizados WHERE id = A.estudios FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as estudios ,
		A.con_apoyo,
		A.institucion,
		A.tipo
		FROM dbo.apoyo_profesoral A
		);
END


--Crear apoyo_profesoral
CREATE PROCEDURE dbo.sp_crear_apoyo_profesoral(
@estudios INT,
@con_apoyo BIT,
@institucion NVARCHAR(45),
@tipo NVARCHAR(45),
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.apoyo_profesoral (estudios, con_apoyo, institucion, tipo)
	VALUES (@estudios, @con_apoyo, @institucion, @tipo);
	SET @p_respuesta = 'Apoyo profesoral creado exitosamente.';
END

--Actualizar apoyo_profesoral
CREATE PROCEDURE dbo.sp_actualizar_apoyo_profesoral(
@estudios INT,
@con_apoyo BIT,
@institucion NVARCHAR(45),
@tipo NVARCHAR(45),
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE dbo.apoyo_profesoral
	SET estudios = @estudios,
		con_apoyo = @con_apoyo,
		institucion = @institucion,
		tipo = @tipo
	WHERE estudios = @estudios;
	SET @p_respuesta = 'Apoyo profesoral actualizado exitosamente.';
END

--Eliminar apoyo_profesoral
CREATE PROCEDURE dbo.sp_eliminar_apoyo_profesoral(
@estudios INT
)
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM dbo.apoyo_profesoral
	WHERE estudios = @estudios;
END

--Leer estudios_realizados
CREATE PROCEDURE dbo.sp_leer_estudios_realizados
AS
BEGIN
	SET NOCOUNT ON;
	(SELECT 
	id,
	titulo,
	universidad,
	fecha,
	tipo,
	ciudad,
	(SELECT * FROM docente WHERE docente = cedula FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as docente ,
	ins_acreditada,
	metodologia,
	perfil_egresado,
	pais
	FROM dbo.estudios_realizados
	);
END

--Crear estudios_realizados
CREATE PROCEDURE dbo.sp_crear_estudios_realizados(
@id INT,
@titulo NVARCHAR(45),
@universidad NVARCHAR(50),
@fecha DATE,
@tipo NVARCHAR(45),
@ciudad NVARCHAR(255),
@docente INT,
@ins_acreditada BIT,
@metodologia NVARCHAR(45),
@perfil_egresado NVARCHAR(MAX),
@pais NVARCHAR(45),
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.estudios_realizados (id, titulo, universidad, fecha, tipo, ciudad, docente, ins_acreditada, metodologia, perfil_egresado, pais)
	VALUES (@id, @titulo, @universidad, @fecha, @tipo, @ciudad, @docente, @ins_acreditada, @metodologia, @perfil_egresado, @pais);
	SET @p_respuesta = 'Estudios realizados creado exitosamente.';
END

--Actualizar estudios_realizados
CREATE PROCEDURE dbo.sp_actualizar_estudios_realizados(
@id INT,
@titulo NVARCHAR(45),
@universidad NVARCHAR(50),
@fecha DATE,
@tipo NVARCHAR(45),
@ciudad NVARCHAR(45),
@docente INT,
@ins_acreditada BIT,
@metodologia NVARCHAR(45),
@perfil_egresado NVARCHAR(MAX),
@pais NVARCHAR(45),
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE dbo.estudios_realizados
	SET titulo = @titulo,
		universidad = @universidad,
		fecha = @fecha,
		tipo = @tipo,
		ciudad = @ciudad,
		docente = @docente,
		ins_acreditada = @ins_acreditada,
		metodologia = @metodologia,
		perfil_egresado = @perfil_egresado,
		pais = @pais
	WHERE id = @id;
	SET @p_respuesta = 'Estudios realizados actualizado exitosamente.';
END

--Eliminar estudios_realizados
CREATE PROCEDURE dbo.sp_eliminar_estudios_realizados(
@id INT,
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM dbo.apoyo_profesoral
	WHERE estudios = @id;
	DELETE FROM dbo.estudios_realizados
	WHERE id = @id;
	SET @p_respuesta = 'Estudios realizados eliminado exitosamente.';
END

--Leer estudio_ac
CREATE PROCEDURE dbo.sp_leer_estudio_ac
AS
BEGIN
	SET NOCOUNT ON;
	(SELECT 
	(SELECT * FROM area_conocimiento WHERE area_conocimiento.id= est_ac.area_conocimiento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as area_conocimiento ,
	(SELECT * FROM estudios_realizados WHERE id = est_ac.estudio FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) as estudios
	FROM dbo.estudio_ac est_ac
	);
END

SELECT * FROM dbo.estudio_ac est_ac

--Crear estudio_ac
CREATE PROCEDURE dbo.sp_crear_estudio_ac(
@estudios INT,
@area_conocimiento INT,
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.estudio_ac (estudio, area_conocimiento)
	VALUES (@estudios, @area_conocimiento);
	SET @p_respuesta = 'Estudio AC creado exitosamente.';
END

--Actualizar estudio_ac
CREATE PROCEDURE dbo.sp_actualizar_estudio_ac(
@estudios INT,
@area_conocimiento INT,
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE dbo.estudio_ac
	SET estudio = @estudios,
		area_conocimiento = @area_conocimiento
	WHERE estudio = @estudios 
	SET @p_respuesta = 'Estudio AC actualizado exitosamente.';
END

--Eliminar estudio_ac
CREATE PROCEDURE dbo.sp_eliminar_estudio_ac(
@estudios INT,
@area_conocimiento INT,
@p_respuesta NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM dbo.estudio_ac
	WHERE estudio = @estudios AND area_conocimiento = @area_conocimiento;
	SET @p_respuesta = 'Estudio AC eliminado exitosamente.';
END




