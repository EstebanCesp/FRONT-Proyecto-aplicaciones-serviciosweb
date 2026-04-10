use UNI
-- leer reconocimiento
ALTER PROCEDURE dbo.sp_leer_reconocimiento
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        (SELECT doc.* FROM dbo.docente doc WHERE doc.cedula = r.docente 
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS docente,
        r.id,
        r.tipo,
        r.fecha,
        r.institucion,
        r.nombre,
        r.ambito
    FROM dbo.reconocimiento r
END
GO
-- crear reconocimiento
ALTER PROCEDURE dbo.sp_crear_reconocimiento(
    @docente INT,
    @tipo VARCHAR(50),
    @fecha DATE,
    @institucion VARCHAR(100),
    @nombre VARCHAR(100),
    @ambito VARCHAR(50),
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.reconocimiento(
        docente,
        tipo,
        fecha,
        institucion,
        nombre,
        ambito
    ) VALUES (
        @docente,
        @tipo,
        @fecha,
        @institucion,
        @nombre,
        @ambito
    );
    SET @p_resultado = (
        SELECT * FROM dbo.reconocimiento
        WHERE docente = @docente AND tipo = @tipo AND fecha = @fecha AND institucion = @institucion AND nombre = @nombre AND ambito = @ambito
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END
GO
-- actualizar reconocimiento
ALTER PROCEDURE dbo.sp_actualizar_reconocimiento(
    @id INT,
    @docente INT,
    @tipo VARCHAR(50),
    @fecha DATE,
    @institucion VARCHAR(100),
    @nombre VARCHAR(100),
    @ambito VARCHAR(50),
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.reconocimiento
    SET
        docente = @docente,
        tipo = @tipo,
        fecha = @fecha,
        institucion = @institucion,
        nombre = @nombre,
        ambito = @ambito
    WHERE id = @id;
    SET @p_resultado = (SELECT * FROM dbo.reconocimiento WHERE id = @id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END
GO
-- eliminar reconocimiento
ALTER PROCEDURE dbo.sp_eliminar_reconocimiento(
    @id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.reconocimiento WHERE id = @id;
END
GO
-- leer experiencia
ALTER PROCEDURE dbo.sp_leer_experiencia
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        (SELECT doc.* FROM dbo.docente doc WHERE doc.cedula = e.docente 
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS docente,
        e.id,
        e.nombre_cargo,
        e.institucion,
        e.tipo,
        e.fecha_inicio,
        e.fecha_fin
    FROM dbo.experiencia e
END
-- crear experiencia
CREATE PROCEDURE dbo.sp_crear_experiencia(
    @docente INT,
    @nombre_cargo VARCHAR(100),
    @institucion VARCHAR(100),
    @tipo VARCHAR(50),
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.experiencia(
        docente,
        nombre_cargo,
        institucion,
        tipo,
        fecha_inicio,
        fecha_fin
    ) VALUES (
        @docente,
        @nombre_cargo,
        @institucion,
        @tipo,
        @fecha_inicio,
        @fecha_fin
    );
    SET @p_resultado = (
        SELECT * FROM dbo.experiencia
        WHERE docente = @docente AND nombre_cargo = @nombre_cargo AND institucion = @institucion AND tipo = @tipo AND fecha_inicio = @fecha_inicio AND fecha_fin = @fecha_fin
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END
GO
-- actualizar experiencia
ALTER PROCEDURE dbo.sp_actualizar_experiencia(
    @id INT,
    @docente INT,
    @nombre_cargo VARCHAR(100),
    @institucion VARCHAR(100),
    @tipo VARCHAR(50),
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.experiencia
    SET
        docente = @docente,
        nombre_cargo = @nombre_cargo,
        institucion = @institucion,
        tipo = @tipo,
        fecha_inicio = @fecha_inicio,
        fecha_fin = @fecha_fin
    WHERE id = @id;
    SET @p_resultado = (SELECT * FROM dbo.experiencia WHERE id = @id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END
GO
-- eliminar experiencia
ALTER PROCEDURE dbo.sp_eliminar_experiencia(
    @id INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.experiencia WHERE id = @id;
END
GO
--leer beca
ALTER PROCEDURE dbo.sp_leer_beca
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        (SELECT * FROM dbo.estudios_realizados WHERE b.estudios = id 
         FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS estudios,
        b.tipo,
        b.institucion,
        b.fecha_inicio,
        b.fecha_fin
    FROM dbo.beca b
END
GO
--crear beca
ALTER PROCEDURE dbo.sp_crear_beca(
    @estudios INT,
    @tipo VARCHAR(50),
    @institucion VARCHAR(100),
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.beca(
        estudios,
        tipo,
        institucion,
        fecha_inicio,
        fecha_fin
    ) VALUES (
        @estudios,
        @tipo,
        @institucion,
        @fecha_inicio,
        @fecha_fin
    );
    SET @p_resultado = (
        SELECT * FROM dbo.beca
        WHERE estudios = @estudios AND tipo = @tipo AND institucion = @institucion AND fecha_inicio = @fecha_inicio AND fecha_fin = @fecha_fin
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END
GO
--actualizar beca
ALTER PROCEDURE dbo.sp_actualizar_beca(
    @estudios INT,
    @tipo VARCHAR(50),
    @institucion VARCHAR(100),
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.beca
    SET
        estudios = @estudios,
        tipo = @tipo,
        institucion = @institucion,
        fecha_inicio = @fecha_inicio,
        fecha_fin = @fecha_fin
    WHERE estudios = @estudios;
    SET @p_resultado = (SELECT * FROM dbo.beca WHERE estudios = @estudios FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END
GO
--eliminar beca
ALTER PROCEDURE dbo.sp_eliminar_beca(
    @estudios INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.beca WHERE estudios = @estudios;
END
GO
