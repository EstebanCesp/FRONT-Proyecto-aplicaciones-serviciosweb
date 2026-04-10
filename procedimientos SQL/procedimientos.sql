use Conocimiento_Universitario
--leer docentes
CREATE PROCEDURE dbo.sp_leer_docentes
AS
BEGIN
    SET NOCOUNT ON;
   (
        SELECT 
            d.cedula,
            d.nombres,
            d.apellidos,
            d.genero,
            d.cargo,
            d.fecha_nacimiento,
            d.correo,
            d.telefono,
            d.url_cvlac,
            d.fecha_actualizacion,
            d.escalafon,
            d.perfil,
            d.cat_minciencia,
            d.conv_minciencia,
            d.nacionalidaad,
            (
                SELECT li.*
                FROM dbo.linea_investigacion li
                WHERE d.linea_investigacion_principal = li.id
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) AS linea_investigacion
        FROM dbo.docente d
    );
END;

--crear docente
CREATE PROCEDURE dbo.sp_crear_docente(
    @cedula INT,
    @nombres VARCHAR(60),
    @apellidos VARCHAR(60),
    @genero VARCHAR(12),
    @cargo VARCHAR(30),
    @fecha_nacimiento DATE,
    @correo VARCHAR(70),
    @telefono VARCHAR(20),  
    @url_cvlac VARCHAR(128),
    @fecha_actualizacion DATE,
    @escalafon VARCHAR(20),
    @perfil VARCHAR(20),
    @cat_minciencia VARCHAR(20),
    @conv_minciencia VARCHAR(20),
    @nacionalidaad VARCHAR(20),
    @linea_investigacion INT,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.docente(
        cedula,
        nombres,
        apellidos,
        genero,
        cargo,
        fecha_nacimiento,
        correo,
        telefono,
        url_cvlac,
        fecha_actualizacion,
        escalafon,
        perfil,
        cat_minciencia,
        conv_minciencia,
        nacionalidaad,
        linea_investigacion_principal
    ) VALUES (
        @cedula,
        @nombres,
        @apellidos,
        @genero,
        @cargo,
        @fecha_nacimiento,
        @correo,
        @telefono,
        @url_cvlac,
        @fecha_actualizacion,
        @escalafon,
        @perfil,
        @cat_minciencia,
        @conv_minciencia,
        @nacionalidaad,
        @linea_investigacion
    );

    SET @p_resultado = (
        SELECT 
            cedula, nombres, apellidos, genero, cargo, fecha_nacimiento, correo, telefono,
            url_cvlac, fecha_actualizacion, escalafon, perfil, cat_minciencia,
            conv_minciencia, nacionalidaad, linea_investigacion_principal
        FROM dbo.docente
        WHERE cedula = @cedula
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END

--actualizar docente
CREATE PROCEDURE dbo.sp_actualizar_docente(
    @cedula INT,
    @nombres VARCHAR(60),
    @apellidos VARCHAR(60),
    @genero VARCHAR(12),
    @cargo VARCHAR(30),
    @fecha_nacimiento DATE,
    @correo VARCHAR(70),
    @telefono VARCHAR(20),
    @url_cvlac VARCHAR(128),
    @fecha_actualizacion DATE,
    @escalafon VARCHAR(20),
    @perfil VARCHAR(20),
    @cat_minciencia VARCHAR(20),
    @conv_minciencia VARCHAR(20),
    @nacionalidaad VARCHAR(20),
    @linea_investigacion INT,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.docente
    SET
        nombres = @nombres,
        apellidos = @apellidos,
        genero = @genero,
        cargo = @cargo,
        fecha_nacimiento = @fecha_nacimiento,
        correo = @correo,
        telefono = @telefono,
        url_cvlac = @url_cvlac,
        fecha_actualizacion = @fecha_actualizacion,
        escalafon = @escalafon,
        perfil = @perfil,
        cat_minciencia = @cat_minciencia,
        conv_minciencia = @conv_minciencia,
        nacionalidaad = @nacionalidaad,
        linea_investigacion_principal = @linea_investigacion
    WHERE cedula = @cedula;

    SET @p_resultado = (
        SELECT 
            cedula, nombres, apellidos, genero, cargo, fecha_nacimiento, correo, telefono,
            url_cvlac, fecha_actualizacion, escalafon, perfil, cat_minciencia,
            conv_minciencia, nacionalidaad, linea_investigacion_principal
        FROM dbo.docente
        WHERE cedula = @cedula
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END

--eliminar docente
CREATE PROCEDURE dbo.sp_eliminar_docente(
    @cedula INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.docente WHERE cedula=@cedula;
END

--leer alianza
CREATE PROCEDURE dbo.sp_leer_alianza
AS
BEGIN
    SET NOCOUNT ON;
        SELECT 
            (SELECT a2.* FROM dbo.aliado a2 WHERE a2.nit = a.aliado FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS aliado,
            (SELECT d2.* FROM dbo.programa d2 WHERE d2.id = a.departamento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS departamento,
            a.fecha_inicio,
            a.fecha_fin,
            (SELECT doc.* FROM dbo.docente doc WHERE doc.cedula = a.docente FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS docente
        FROM dbo.alianza a
END

--crear alianza
CREATE PROCEDURE dbo.sp_crear_alianza(
    @aliado INT,
    @departamento INT,
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @docente INT,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.alianza(
        aliado,
        departamento,
        fecha_inicio,
        fecha_fin,
        docente
    ) VALUES (
        @aliado,
        @departamento,
        @fecha_inicio,
        @fecha_fin,
        @docente
    );

    SET @p_resultado = (
        SELECT * FROM dbo.alianza WHERE aliado = @aliado AND departamento = @departamento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END

--actualizar alianza
CREATE PROCEDURE dbo.sp_actualizar_alianza(

    @aliado INT,
    @departamento INT,
    @fecha_inicio DATE,
    @fecha_fin DATE,
    @docente INT,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.alianza
    SET
        aliado = @aliado,
        departamento = @departamento,
        fecha_inicio = @fecha_inicio,
        fecha_fin = @fecha_fin,
        docente = @docente
    WHERE @aliado = aliado AND @departamento = departamento;

    SET @p_resultado = (SELECT * FROM dbo.alianza WHERE aliado=@aliado AND departamento = @departamento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END

--eliminar alianza
CREATE PROCEDURE dbo.sp_eliminar_alianza(
    @aliado INT ,
    @departamento INT
)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.alianza WHERE aliado = @aliado AND departamento = @departamento;
END

--leer docente_departamento
CREATE PROCEDURE dbo.sp_leer_docente_departamento
AS
BEGIN
    SET NOCOUNT ON
        SELECT 
            (SELECT doc.nombres, doc.cedula, doc.apellidos FROM dbo.docente doc WHERE doc.cedula = dd.docente FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS docente,
            (SELECT dep.nombre, dep.ciudad, dep.id FROM dbo.programa dep WHERE dep.id = dd.departamento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS departamento,
            dd.dedicacion,
            dd.modalidad,
            dd.fecha_ingreso,
            dd.fecha_salida
        FROM dbo.docente_departamento dd
END


--crear docente_departamento
CREATE PROCEDURE dbo.sp_crear_docente_departamento(
    @docente INT,
    @departamento INT,
    @dedicacion VARCHAR(20),
    @modalidad VARCHAR(20),
    @fecha_ingreso DATE,
    @fecha_salida DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.docente_departamento(
        docente,
        departamento,
        dedicacion,
        modalidad,
        fecha_ingreso,
        fecha_salida
    ) VALUES (
        @docente,
        @departamento,
        @dedicacion,
        @modalidad,
        @fecha_ingreso,
        @fecha_salida
    );

    SET @p_resultado = (
        SELECT * FROM dbo.docente_departamento
        WHERE docente = @docente AND departamento = @departamento
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END

--actualizar docente_departamento
CREATE PROCEDURE dbo.sp_actualizar_docente_departamento(
    @docente INT,
    @departamento INT,
    @dedicacion VARCHAR(20),
    @modalidad VARCHAR(20),
    @fecha_ingreso DATE,
    @fecha_salida DATE,
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.docente_departamento
    SET
        docente = @docente,
        departamento = @departamento,
        dedicacion = @dedicacion,
        modalidad = @modalidad,
        fecha_ingreso = @fecha_ingreso,
        fecha_salida = @fecha_salida
    WHERE @docente =docente AND departamento =@departamento;

    SET @p_resultado = (SELECT * FROM dbo.docente_departamento WHERE @docente =docente AND departamento =@departamento FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END

--eliminar docente_departamento
CREATE PROCEDURE dbo.sp_eliminar_docente_departamento(
    @docente INT,
    @departamento INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.docente_departamento WHERE @departamento = departamento AND docente = @docente;

END

--leer evaluacion_docente
CREATE PROCEDURE dbo.sp_leer_evaluacion_docente
AS
BEGIN
    SET NOCOUNT ON;
        SELECT 
            (SELECT doc.* FROM dbo.docente doc WHERE doc.cedula = ed.docente FOR JSON PATH, WITHOUT_ARRAY_WRAPPER) AS docente,
            ed.calificacion,
            ed.semestre
        FROM dbo.evaluacion_docente ed
   
END

--crear evaluacion_docente
CREATE PROCEDURE dbo.sp_crear_evaluacion_docente(
    @docente INT,
    @calificacion INT,
    @semestre VARCHAR(20),
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.evaluacion_docente(
        docente,
        calificacion,
        semestre
    ) VALUES (
        @docente,
        @calificacion,
        @semestre
    );

    SET @p_resultado = (
        SELECT * FROM dbo.evaluacion_docente
        WHERE docente = @docente AND calificacion = @calificacion AND semestre = @semestre
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );
END

--actualizar evaluacion_docente
CREATE PROCEDURE dbo.sp_actualizar_evaluacion_docente(
    @id INT,
    @docente INT,
    @calificacion INT,
    @semestre VARCHAR(20),
    @p_resultado NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.evaluacion_docente
    SET
        docente = @docente,
        calificacion = @calificacion,
        semestre = @semestre
    WHERE id = @id;

    SET @p_resultado = (SELECT * FROM dbo.evaluacion_docente WHERE id = @id FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);
END

--eliminar evaluacion_docente
CREATE PROCEDURE dbo.sp_eliminar_evaluacion_docente(
    @id INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.evaluacion_docente WHERE id = @id;
END

