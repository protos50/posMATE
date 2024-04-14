USE [DB_posnet]
GO
/****** Object:  StoredProcedure [dbo].[SP_AGREGARCATEGORIA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AGREGARCATEGORIA]
(
    @Descripcion NVARCHAR(100),
    @Estado BIT,
    @Success BIT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO Categoria (Descripcion, estado)
        VALUES (@Descripcion, @Estado);
        
        SET @Success = 1;
    END TRY
    BEGIN CATCH
        SET @Success = 0;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AGREGARCLIENTE]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AGREGARCLIENTE]
(
    @DNI INT,
    @Nombre NVARCHAR(50),
    @Apellido NVARCHAR(50)
)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Cliente (DNI, Nombre, Apellido) 
    VALUES (@DNI, @Nombre, @Apellido);
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AGREGARCOMPRA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AGREGARCOMPRA]
    @IdUsuario INT,
    @IdProveedor INT,
    @MontoTotal DECIMAL,
    @FechaRegistro DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO compra(IdUsuario, IdProveedor, MontoTotal, FechaRegistro)
        VALUES (@IdUsuario, @IdProveedor, @MontoTotal, @FechaRegistro);

        SELECT 1 AS Success; -- Indicador de éxito
    END TRY
    BEGIN CATCH
        SELECT 0 AS Success; -- Indicador de error
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AGREGARDETALLECOMPRA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AGREGARDETALLECOMPRA]
    @IdCompra INT,
    @IdProducto INT,
    @PrecioCompra DECIMAL(18, 2),
    @PrecioVenta DECIMAL(18, 2),
    @Cantidad INT,
    @MontoTotal DECIMAL(18, 2),
    @FechaRegistro DATETIME
AS
BEGIN
    INSERT INTO DETALLE_COMPRA(IdCompra, IdProducto, PrecioCompra, PrecioVenta, Cantidad, MontoTotal, FechaRegistro)
    VALUES (@IdCompra, @IdProducto, @PrecioCompra, @PrecioVenta, @Cantidad, @MontoTotal, @FechaRegistro)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_BUSCARCLIENTEPORDNI]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_BUSCARCLIENTEPORDNI]
(
    @DNI INT
)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCliente, DNI, Nombre, Apellido
    FROM Cliente
    WHERE DNI = @DNI;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CALCULARMONTOTOTALCOMPRASPORFECHA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_CALCULARMONTOTOTALCOMPRASPORFECHA]
    @FechaDesde DATETIME,
    @FechaHasta DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @MontoTotal DECIMAL(18, 2);

    BEGIN TRY
        SELECT @MontoTotal = SUM(MontoTotal)
        FROM COMPRA
        WHERE FechaRegistro >= @FechaDesde AND FechaRegistro <= @FechaHasta;

        SELECT ISNULL(@MontoTotal, 0) AS MontoTotal; -- Devuelve el monto total calculado
    END TRY
    BEGIN CATCH
        SELECT -1 AS MontoTotal; -- Devuelve -1 en caso de error
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EDITARCATEGORIA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_EDITARCATEGORIA]
(
    @IdCategoria INT,
    @Descripcion NVARCHAR(100),
    @Estado BIT,
    @Success BIT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE Categoria
        SET Descripcion = @Descripcion, estado = @Estado
        WHERE IdCategoria = @IdCategoria;
        
        SET @Success = 1;
    END TRY
    BEGIN CATCH
        SET @Success = 0;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EDITARUSUARIO]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[SP_EDITARUSUARIO]
(
	@IdUsuario int,
    @Nombre NVARCHAR(50),
    @Apellido NVARCHAR(50),
    @Clave NVARCHAR(50),
    @Email NVARCHAR(100),
    @DNI NVARCHAR(20),
    @Direccion NVARCHAR(100),
    @FechaNacimiento DATETIME,
    @Telefono NVARCHAR(20),
    @IdRol INT,
    @Estado BIT,
	@Respuesta bit output,
	@Mensaje varchar(500) output
)
as
begin
		set @Respuesta = 0
		set @mensaje = ''
		 IF NOT EXISTS (SELECT * FROM Usuario WHERE DNI = @DNI and IdUsuario != @IdUsuario)
		 begin
		  UPDATE Usuario set
		  Nombre = @Nombre,
		  Apellido = @Apellido,
		  Clave = @Clave,
		  Email = @Email,
		  DNI = @DNI,
		  Direccion = @Direccion,
		  FechaNacimiento = @FechaNacimiento, 
		  Telefono = @Telefono,
		  IdRol = @IdRol,
		  Estado = @Estado
		  where idUsuario = @IdUsuario
         
		  set @Respuesta = 1
		  
		 end
		 else
			set  @Mensaje = 'No se puede repetir el DNI para mas de un usuario'


end
GO
/****** Object:  StoredProcedure [dbo].[SP_LISTARUSUARIOS]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_LISTARUSUARIOS]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT u.IdUsuario, u.DNI, u.Nombre, u.Apellido, u.Email, u.Clave, u.Direccion, 
           ISNULL(u.FechaNacimiento, '') AS FechaNacimiento, u.Telefono, u.Estado, 
           r.IdRol, r.Descripcion 
    FROM usuario u
    INNER JOIN rol r ON r.IdRol = u.IdRol;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERCATEGORIAPORID]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_OBTENERCATEGORIAPORID]
(
    @IdCategoria INT,
    @Descripcion NVARCHAR(100) OUTPUT,
    @Estado BIT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @Descripcion = Descripcion, @Estado = Estado
    FROM CATEGORIA
    WHERE IdCategoria = @IdCategoria;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERCATEGORIAS]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERCATEGORIAS]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdCategoria, Descripcion, estado
    FROM Categoria;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERCATEGORIASMASVENDIDAS]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_OBTENERCATEGORIASMASVENDIDAS]
(
    @TopN INT,
    @FechaDesde DATETIME,
    @FechaHasta DATETIME
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (@TopN) c.IdCategoria, c.Descripcion, c.Estado, SUM(dv.Cantidad) AS TotalVendido
    FROM CATEGORIA c
    INNER JOIN PRODUCTO p ON c.IdCategoria = p.IdCategoria
    INNER JOIN DETALLE_VENTA dv ON p.IdProducto = dv.IdProducto
    WHERE dv.FechaRegistro BETWEEN @FechaDesde AND @FechaHasta
    GROUP BY c.IdCategoria, c.Descripcion, c.Estado
    ORDER BY TotalVendido DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERCLIENTES]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERCLIENTES]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCliente, DNI, Nombre, Apellido
    FROM Cliente;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERCOMPRAS]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERCOMPRAS]
    @IdUsuario INT = NULL
AS
BEGIN
    SELECT c.IdCompra, u.Nombre AS NombreUsuario, p.Nombre AS NombreProveedor, c.MontoTotal, c.FechaRegistro 
    FROM COMPRA c
    INNER JOIN USUARIO u ON c.IdUsuario = u.IdUsuario
    INNER JOIN PROVEEDOR p ON c.IdProveedor = p.IdProveedor
    WHERE (@IdUsuario IS NULL OR c.IdUsuario = @IdUsuario)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERDETALLESCOMPRA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERDETALLESCOMPRA]
    @IdCompra INT
AS
BEGIN
    SELECT dc.IdDetalleCompra, dc.IdProducto, dc.PrecioCompra, dc.PrecioVenta, dc.Cantidad, dc.MontoTotal, dc.FechaRegistro, p.Nombre AS NombreProducto
    FROM DETALLE_COMPRA dc
    INNER JOIN PRODUCTO p ON dc.IdProducto = p.IdProducto
    WHERE dc.IdCompra = @IdCompra
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERIDCLIENTEPORDNI]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERIDCLIENTEPORDNI]
(
    @DNI INT
)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCliente
    FROM Cliente
    WHERE DNI = @DNI;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERULTIMOIDCOMPRA]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERULTIMOIDCOMPRA]
AS
BEGIN
    SELECT TOP 1 IdCompra FROM COMPRA ORDER BY IdCompra DESC
END
GO
/****** Object:  StoredProcedure [dbo].[SP_OBTENERUSUARIOPORNOMBRE]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_OBTENERUSUARIOPORNOMBRE]
    @Nombre NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdUsuario
    FROM USUARIO
    WHERE Nombre = @Nombre;
END
GO
/****** Object:  StoredProcedure [dbo].[SP_REGISTRARUSUARIO]    Script Date: 14/4/2024 17:41:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_REGISTRARUSUARIO]
(
    @Nombre NVARCHAR(50),
    @Apellido NVARCHAR(50),
    @Clave NVARCHAR(50),
    @Email NVARCHAR(100),
    @DNI NVARCHAR(20),
    @Direccion NVARCHAR(100),
    @FechaNacimiento DATETIME,
    @Telefono NVARCHAR(20),
    @IdRol INT,
    @Estado BIT,
	@IdUsuarioResultado int output,
	@Mensaje varchar(500) output
)
as
begin
		set @IdUsuarioResultado = 0
		set @mensaje = ''
		 IF NOT EXISTS (SELECT * FROM Usuario WHERE DNI = @DNI)
		 begin
		  INSERT INTO Usuario (Nombre, Apellido, Clave, Email, DNI, Direccion, FechaNacimiento, Telefono, IdRol, Estado)
          VALUES (@Nombre, @Apellido, @Clave, @Email, @DNI, @Direccion, @FechaNacimiento, @Telefono, @IdRol, @Estado)
		  set @IdUsuarioResultado = SCOPE_IDENTITY ()
		  
		 end
		 else
			set  @Mensaje = 'No se puede repetir el DNI para mas de un usuario'


end
GO
