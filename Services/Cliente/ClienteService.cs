using System.Security.Claims;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Interfaces.Cliente;
using ventas.Models.ModelsBdTenant;
using ventas.ViewModels.Cliente;

namespace ventas.Services.Cliente;

public class ClienteService : IClienteService
{
    private readonly TenantDbContext _tenantDbContext;
    private readonly CentralDbContext _centralDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<ClienteService> _logger;

    public ClienteService(
        TenantDbContext tenantDbContext,
        CentralDbContext centralDbContext,
        ILogger<ClienteService> logger,
        IHttpContextAccessor httpContextAccessor)
    {
        _tenantDbContext = tenantDbContext;
        _centralDbContext = centralDbContext;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ClienteResponse> CreateClienteAsync(CreateClienteRequest request)
    {
        using var transaction = await _tenantDbContext.Database.BeginTransactionAsync();
        try
        {
            var (empresaId, usuarioId) = await ObtenerEmpresaYUsuarioActual();
            _logger.LogInformation("Creando nuevo cliente: {Nombre} para empresa {EmpresaId} por usuario {UsuarioId}", request.Nombre, empresaId, usuarioId);

            // Validar que la cédula/RNC no exista para este tenant si se proporciona
            if (!string.IsNullOrEmpty(request.CedulaRnc))
            {
                var existeCliente = await _tenantDbContext.Clientes
                    .AnyAsync(c => c.FcedulaRnc == request.CedulaRnc && c.FkidEmpresa == empresaId);
                if (existeCliente)
                {
                    throw new InvalidOperationException($"Ya existe un cliente con la cédula/RNC '{request.CedulaRnc}'");
                }
            }

            // Obtener el siguiente número de cliente
            var ultimoNumero = await _tenantDbContext.Clientes
                .Where(c => c.FkidEmpresa == empresaId)
                .MaxAsync(c => (int?)c.FnumeroCliente) ?? 0;

            // Resolver IDs: usar Id* si viene, o nombre para crear/buscar
            int idRuta = await ResolverFkAsync(
                request.IdRuta,
                _tenantDbContext.Rutas,
                x => x.Fnombre == request.Ruta,
                x => x.FidRuta,
                request.Ruta);

            int idEstadoCivil = await ResolverFkAsync(
                request.IdEstadoCivil,
                _tenantDbContext.EstadoCiviles,
                x => x.FestadoCivil == request.EstadoCivil,
                x => x.FidEstadoCivil,
                request.EstadoCivil);

            int idSector = await ResolverFkAsync(
                request.IdSector,
                _tenantDbContext.Sectores,
                x => x.Fsector == request.Sector,
                x => x.FidSector,
                request.Sector);

            int idMunicipio = await ResolverFkAsync(
                request.IdMunicipio,
                _tenantDbContext.Municipios,
                x => x.Fmunicipio == request.Municipio,
                x => x.FidMunicipio,
                request.Municipio);

            int idCiudad = await ResolverFkAsync(
                request.IdCiudad,
                _tenantDbContext.Ciudades,
                x => x.Fciudad == request.Ciudad,
                x => x.FidCiudad,
                request.Ciudad);

            int idProvincia = await ResolverFkAsync(
                request.IdProvincia,
                _tenantDbContext.Provincias,
                x => x.Fprovincia == request.Provincia,
                x => x.FidProvincia,
                request.Provincia);

            int idPais = await ResolverFkAsync(
                request.IdPais,
                _tenantDbContext.Paises,
                x => x.Fpais == request.Pais,
                x => x.FidPais,
                request.Pais);

            int idNacionalidad = await ResolverFkAsync(
                request.IdNacionalidad,
                _tenantDbContext.Nacionalidades,
                x => x.Fnacionalidad == request.Nacionalidad,
                x => x.FidNacionalidad,
                request.Nacionalidad);

            int idTipoCliente = await ResolverFkAsync(
                request.IdTipoCliente,
                _tenantDbContext.TiposCliente,
                x => x.FtipoCliente == request.TipoCliente,
                x => x.FidTipoCliente,
                request.TipoCliente);

            int idActividadComercial = await ResolverFkAsync(
                request.IdActividadComercial,
                _tenantDbContext.ActividadComerciales,
                x => x.FactividadComercial == request.ActividadComercial,
                x => x.FidActividadComercial,
                request.ActividadComercial);

            int idMoneda = await ResolverFkAsync(
                request.IdMoneda,
                _tenantDbContext.Monedas,
                x => x.Fmoneda == request.Moneda,
                x => x.FidMoneda,
                request.Moneda);

            var nuevoCliente = new TbCliente
            {
                FnumeroCliente = ultimoNumero + 1,
                FcedulaRnc = request.CedulaRnc,
                Fnombre = request.Nombre,
                Ftelefono = request.Telefono,
                Fcelular = request.Celular,
                Fdireccion = request.Direccion,
                FfechaNacimiento = request.FechaNacimiento ?? DateOnly.FromDateTime(DateTime.Now),
                FtipoEntidad = request.TipoEntidad,
                Fcalle = request.Calle,
                FlimiteCredito = request.LimiteCredito,
                Fubicaciongps = request.UbicacionGps ?? "",
                FdirFoto = "", // Se actualizará si se recibe imagen
                FkidRuta = idRuta,
                FkidEstadoCivil = idEstadoCivil,
                FkidSector = idSector,
                FkidMunicipio = idMunicipio,
                FkidCiudad = idCiudad,
                FkidProvincia = idProvincia,
                FkidPais = idPais,
                FkidNacionalidad = idNacionalidad,
                FkidTipoCliente = idTipoCliente,
                FkidActividadComercial = idActividadComercial,
                FkidMoneda = idMoneda,
                FkidEmpresa = empresaId,
                FkidUsuario = usuarioId,
                Factivo = true
            };

            _tenantDbContext.Clientes.Add(nuevoCliente);
            await _tenantDbContext.SaveChangesAsync();
            _logger.LogInformation("Cliente creado exitosamente con ID: {ClienteId}", nuevoCliente.FidCliente);

            // Guardar imagen si se recibe
            if (request.Imagen != null && request.Imagen.Length > 0)
            {
                await GuardarImagenClienteAsync(nuevoCliente.FidCliente, request.Imagen);
            }

            await transaction.CommitAsync();
            return await MapToResponseAsync(nuevoCliente);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error al crear cliente: {Nombre}", request.Nombre);
            throw;
        }
    }

    public async Task<List<ClienteResponse>> GetClientesByTenantAsync()
    {
        try
        {
            var (empresaId, _) = await ObtenerEmpresaYUsuarioActual();
            _logger.LogInformation("Obteniendo clientes de la empresa {EmpresaId}", empresaId);

            var clientes = await _tenantDbContext.Clientes
                .Where(c => c.FkidEmpresa == empresaId)
                .OrderByDescending(c => c.FidCliente)
                .ToListAsync();

            var clientesResponse = new List<ClienteResponse>();
            foreach (var cliente in clientes)
            {
                var response = await MapToResponseAsync(cliente); // Espera cada uno secuencialmente
                clientesResponse.Add(response);
            }

            _logger.LogInformation("Se obtuvieron {Count} clientes para la empresa {EmpresaId}", clientesResponse.Count, empresaId);
            return clientesResponse;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener clientes");
            throw;
        }
    }

    public async Task<ClienteResponse?> GetClienteByIdAsync(int clienteId)
    {
        try
        {
            var (empresaId, _) = await ObtenerEmpresaYUsuarioActual();

            var cliente = await _tenantDbContext.Clientes
                .FirstOrDefaultAsync(c => c.FidCliente == clienteId && c.FkidEmpresa == empresaId);

            return cliente == null ? null : await MapToResponseAsync(cliente);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener cliente por ID: {ClienteId}", clienteId);
            throw;
        }
    }

    public async Task<ClienteResponse> UpdateClienteAsync(UpdateClienteRequest request)
    {
        using var transaction = await _tenantDbContext.Database.BeginTransactionAsync();
        try
        {
            var (empresaId, usuarioId) = await ObtenerEmpresaYUsuarioActual();
            var cliente = await _tenantDbContext.Clientes
                .FirstOrDefaultAsync(c => c.FidCliente == request.IdCliente && c.FkidEmpresa == empresaId);
            if (cliente == null)
            {
                throw new InvalidOperationException($"Cliente con ID {request.IdCliente} no encontrado");
            }
            // Validar que la cédula/RNC no exista para otro cliente
            if (!string.IsNullOrEmpty(request.CedulaRnc) && request.CedulaRnc != cliente.FcedulaRnc)
            {
                var existeCliente = await _tenantDbContext.Clientes
                    .AnyAsync(c => c.FcedulaRnc == request.CedulaRnc && 
                                   c.FkidEmpresa == empresaId && 
                                   c.FidCliente != request.IdCliente);
                if (existeCliente)
                {
                    throw new InvalidOperationException(
                        $"Ya existe otro cliente con la cédula/RNC '{request.CedulaRnc}'");
                }
            }
            _logger.LogInformation("Actualizando cliente {ClienteId} por usuario {UsuarioId}", request.IdCliente, usuarioId);
            // Actualizar campos
            cliente.FcedulaRnc = request.CedulaRnc;
            cliente.Fnombre = request.Nombre;
            cliente.Ftelefono = request.Telefono;
            cliente.Fcelular = request.Celular;
            cliente.Fdireccion = request.Direccion;
            cliente.FfechaNacimiento = request.FechaNacimiento ?? cliente.FfechaNacimiento;
            cliente.FtipoEntidad = request.TipoEntidad;
            cliente.Fcalle = request.Calle;
            cliente.FlimiteCredito = request.LimiteCredito;
            cliente.Fubicaciongps = request.UbicacionGps ?? cliente.Fubicaciongps;
            // Actualizar foreign keys y crear registro si no existe SOLO si se envía nombre válido
            if (!string.IsNullOrWhiteSpace(request.Ruta)) {
                var idRuta = await ObtenerOInsertarIdAsync(_tenantDbContext.Rutas, x => x.Fnombre == request.Ruta, x => x.FidRuta, request.Ruta);
                if (idRuta > 0) cliente.FkidRuta = idRuta;
            }
            if (!string.IsNullOrWhiteSpace(request.EstadoCivil)) {
                var idEstadoCivil = await ObtenerOInsertarIdAsync(_tenantDbContext.EstadoCiviles, x => x.FestadoCivil == request.EstadoCivil, x => x.FidEstadoCivil, request.EstadoCivil);
                if (idEstadoCivil > 0) cliente.FkidEstadoCivil = idEstadoCivil;
            }
            if (!string.IsNullOrWhiteSpace(request.Sector)) {
                var idSector = await ObtenerOInsertarIdAsync(_tenantDbContext.Sectores, x => x.Fsector == request.Sector, x => x.FidSector, request.Sector);
                if (idSector > 0) cliente.FkidSector = idSector;
            }
            if (!string.IsNullOrWhiteSpace(request.Municipio)) {
                var idMunicipio = await ObtenerOInsertarIdAsync(_tenantDbContext.Municipios, x => x.Fmunicipio == request.Municipio, x => x.FidMunicipio, request.Municipio);
                if (idMunicipio > 0) cliente.FkidMunicipio = idMunicipio;
            }
            if (!string.IsNullOrWhiteSpace(request.Ciudad)) {
                var idCiudad = await ObtenerOInsertarIdAsync(_tenantDbContext.Ciudades, x => x.Fciudad == request.Ciudad, x => x.FidCiudad, request.Ciudad);
                if (idCiudad > 0) cliente.FkidCiudad = idCiudad;
            }
            if (!string.IsNullOrWhiteSpace(request.Provincia)) {
                var idProvincia = await ObtenerOInsertarIdAsync(_tenantDbContext.Provincias, x => x.Fprovincia == request.Provincia, x => x.FidProvincia, request.Provincia);
                if (idProvincia > 0) cliente.FkidProvincia = idProvincia;
            }
            if (!string.IsNullOrWhiteSpace(request.Pais)) {
                var idPais = await ObtenerOInsertarIdAsync(_tenantDbContext.Paises, x => x.Fpais == request.Pais, x => x.FidPais, request.Pais);
                if (idPais > 0) cliente.FkidPais = idPais;
            }
            if (!string.IsNullOrWhiteSpace(request.Nacionalidad)) {
                var idNacionalidad = await ObtenerOInsertarIdAsync(_tenantDbContext.Nacionalidades, x => x.Fnacionalidad == request.Nacionalidad, x => x.FidNacionalidad, request.Nacionalidad);
                if (idNacionalidad > 0) cliente.FkidNacionalidad = idNacionalidad;
            }
            if (!string.IsNullOrWhiteSpace(request.TipoCliente)) {
                var idTipoCliente = await ObtenerOInsertarIdAsync(_tenantDbContext.TiposCliente, x => x.FtipoCliente == request.TipoCliente, x => x.FidTipoCliente, request.TipoCliente);
                if (idTipoCliente > 0) cliente.FkidTipoCliente = idTipoCliente;
            }
            if (!string.IsNullOrWhiteSpace(request.ActividadComercial)) {
                var idActividadComercial = await ObtenerOInsertarIdAsync(_tenantDbContext.ActividadComerciales, x => x.FactividadComercial == request.ActividadComercial, x => x.FidActividadComercial, request.ActividadComercial);
                if (idActividadComercial > 0) cliente.FkidActividadComercial = idActividadComercial;
            }
            if (!string.IsNullOrWhiteSpace(request.Moneda)) {
                var idMoneda = await ObtenerOInsertarIdAsync(_tenantDbContext.Monedas, x => x.Fmoneda == request.Moneda, x => x.FidMoneda, request.Moneda);
                if (idMoneda > 0) cliente.FkidMoneda = idMoneda;
            }
            await _tenantDbContext.SaveChangesAsync();
            _logger.LogInformation("Cliente {ClienteId} actualizado exitosamente", request.IdCliente);
            await transaction.CommitAsync();
            return await MapToResponseAsync(cliente);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error al actualizar cliente: {ClienteId}", request.IdCliente);
            throw;
        }
    }

    public async Task<bool> DeleteClienteAsync(int clienteId)
    {
        try
        {
            var (empresaId, _) = await ObtenerEmpresaYUsuarioActual();

            var cliente = await _tenantDbContext.Clientes
                .FirstOrDefaultAsync(c => c.FidCliente == clienteId && c.FkidEmpresa == empresaId);

            if (cliente == null)
            {
                throw new InvalidOperationException($"Cliente con ID {clienteId} no encontrado");
            }

            cliente.Factivo = false;
            await _tenantDbContext.SaveChangesAsync();

            _logger.LogInformation("Cliente {ClienteId} desactivado exitosamente", clienteId);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al desactivar cliente: {ClienteId}", clienteId);
            throw;
        }
    }

    public async Task<bool> ActivateClienteAsync(int clienteId)
    {
        try
        {
            var (empresaId, _) = await ObtenerEmpresaYUsuarioActual();

            var cliente = await _tenantDbContext.Clientes
                .FirstOrDefaultAsync(c => c.FidCliente == clienteId && c.FkidEmpresa == empresaId);

            if (cliente == null)
            {
                throw new InvalidOperationException($"Cliente con ID {clienteId} no encontrado");
            }

            cliente.Factivo = true;
            await _tenantDbContext.SaveChangesAsync();

            _logger.LogInformation("Cliente {ClienteId} activado exitosamente", clienteId);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al activar cliente: {ClienteId}", clienteId);
            throw;
        }
    }

    public async Task<bool> ToggleActivoClienteAsync(int clienteId)
    {
        try
        {
            var (empresaId, _) = await ObtenerEmpresaYUsuarioActual();

            var cliente = await _tenantDbContext.Clientes
                .FirstOrDefaultAsync(c => c.FidCliente == clienteId && c.FkidEmpresa == empresaId);

            if (cliente == null)
            {
                throw new InvalidOperationException($"Cliente con ID {clienteId} no encontrado");
            }

            cliente.Factivo = !cliente.Factivo;
            await _tenantDbContext.SaveChangesAsync();

            _logger.LogInformation("Cliente {ClienteId} cambió a estado {Estado}", clienteId, cliente.Factivo ? "Activo" : "Inactivo");

            return cliente.Factivo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al cambiar estado del cliente: {ClienteId}", clienteId);
            throw;
        }
    }

    #region Métodos Privados

    /// <summary>
    ///     Obtiene la empresa y el usuario del contexto HTTP actual
    /// </summary>
    private async Task<(int empresaId, int usuarioId)> ObtenerEmpresaYUsuarioActual()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new InvalidOperationException("No se pudo acceder al contexto HTTP");
        }

        // Obtener Identity ID del usuario autenticado
        var identityId = httpContext.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(identityId))
        {
            throw new InvalidOperationException("No se pudo identificar el usuario autenticado");
        }

        try
        {
            // Buscar el usuario en la base de datos central usando el IdentityId
            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.IdentityId == identityId)
                .Select(u => new { u.FkidEmpresa, u.FidUsuario })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                throw new InvalidOperationException("Usuario no encontrado en el sistema");
            }

            _logger.LogInformation("Usuario autenticado: EmpresaId={EmpresaId}, UsuarioId={UsuarioId}", 
                usuario.FkidEmpresa, usuario.FidUsuario);

            return (usuario.FkidEmpresa, usuario.FidUsuario);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error obteniendo información del usuario actual");
            throw;
        }
    }

    /// <summary>
    ///     Mapea un TbCliente a ClienteResponse incluyendo los nombres de las entidades relacionadas
    /// </summary>
    private async Task<ClienteResponse> MapToResponseAsync(TbCliente cliente)
    {
        var response = new ClienteResponse
        {
            FidCliente = cliente.FidCliente,
            FnumeroCliente = cliente.FnumeroCliente,
            FcedulaRnc = cliente.FcedulaRnc,
            Fnombre = cliente.Fnombre,
            Ftelefono = cliente.Ftelefono,
            Fcelular = cliente.Fcelular,
            Fdireccion = cliente.Fdireccion,
            FfechaNacimiento = cliente.FfechaNacimiento,
            FkidRuta = cliente.FkidRuta,
            FtipoEntidad = cliente.FtipoEntidad,
            Fcalle = cliente.Fcalle,
            FlimiteCredito = cliente.FlimiteCredito,
            FdirFoto = cliente.FdirFoto,
            Fubicaciongps = cliente.Fubicaciongps,
            FkidEstadoCivil = cliente.FkidEstadoCivil,
            FkidSector = cliente.FkidSector,
            FkidMunicipio = cliente.FkidMunicipio,
            FkidCiudad = cliente.FkidCiudad,
            FkidProvincia = cliente.FkidProvincia,
            FkidPais = cliente.FkidPais,
            FkidNacionalidad = cliente.FkidNacionalidad,
            FkidTipoCliente = cliente.FkidTipoCliente,
            FkidActividadComercial = cliente.FkidActividadComercial,
            FkidMoneda = cliente.FkidMoneda,
            FkidEmpresa = cliente.FkidEmpresa,
            FkidUsuario = cliente.FkidUsuario,
            Factivo = cliente.Factivo
        };

        response.Ruta = await _tenantDbContext.Rutas.Where(x => x.FidRuta == cliente.FkidRuta).Select(x => x.Fnombre).FirstOrDefaultAsync();
        response.EstadoCivil = await _tenantDbContext.EstadoCiviles.Where(x => x.FidEstadoCivil == cliente.FkidEstadoCivil).Select(x => x.FestadoCivil).FirstOrDefaultAsync();
        response.Sector = await _tenantDbContext.Sectores.Where(x => x.FidSector == cliente.FkidSector).Select(x => x.Fsector).FirstOrDefaultAsync();
        response.Municipio = await _tenantDbContext.Municipios.Where(x => x.FidMunicipio == cliente.FkidMunicipio).Select(x => x.Fmunicipio).FirstOrDefaultAsync();
        response.Ciudad = await _tenantDbContext.Ciudades.Where(x => x.FidCiudad == cliente.FkidCiudad).Select(x => x.Fciudad).FirstOrDefaultAsync();
        response.Provincia = await _tenantDbContext.Provincias.Where(x => x.FidProvincia == cliente.FkidProvincia).Select(x => x.Fprovincia).FirstOrDefaultAsync();
        response.Pais = await _tenantDbContext.Paises.Where(x => x.FidPais == cliente.FkidPais).Select(x => x.Fpais).FirstOrDefaultAsync();
        response.Nacionalidad = await _tenantDbContext.Nacionalidades.Where(x => x.FidNacionalidad == cliente.FkidNacionalidad).Select(x => x.Fnacionalidad).FirstOrDefaultAsync();
        response.TipoCliente = await _tenantDbContext.TiposCliente.Where(x => x.FidTipoCliente == cliente.FkidTipoCliente).Select(x => x.FtipoCliente).FirstOrDefaultAsync();
        response.ActividadComercial = await _tenantDbContext.ActividadComerciales.Where(x => x.FidActividadComercial == cliente.FkidActividadComercial).Select(x => x.FactividadComercial).FirstOrDefaultAsync();
        response.Moneda = await _tenantDbContext.Monedas.Where(x => x.FidMoneda == cliente.FkidMoneda).Select(x => x.Fmoneda).FirstOrDefaultAsync();
        response.Empresa = await _centralDbContext.Empresas.Where(x => x.FidEmpresa == cliente.FkidEmpresa).Select(x => x.FnombreEmpresa).FirstOrDefaultAsync();
        response.Usuario = await _centralDbContext.Usuarios.Where(x => x.FidUsuario == cliente.FkidUsuario).Select(x => x.Fnombre).FirstOrDefaultAsync();
        return response;
    }

    // Método auxiliar para resolver FK usando Id* o nombre
    private async Task<int> ResolverFkAsync<TEntity>(
        int? idExistente,
        DbSet<TEntity> dbSet,
        Expression<Func<TEntity, bool>> predicate,
        Func<TEntity, int> idSelector,
        string? nombre
    ) where TEntity : class, new()
    {
        if (idExistente.HasValue && idExistente.Value > 0)
        {
            return idExistente.Value;
        }

        return await ObtenerOInsertarIdAsync(dbSet, predicate, idSelector, nombre ?? string.Empty);
    }

    // Método auxiliar para obtener el ID o insertar si no existe
    private async Task<int> ObtenerOInsertarIdAsync<TEntity>(DbSet<TEntity> dbSet, System.Linq.Expressions.Expression<System.Func<TEntity, bool>> predicate, System.Func<TEntity, int> idSelector, string nombre) where TEntity : class, new()
    {
        if (string.IsNullOrWhiteSpace(nombre)) return 0;
        var entidad = dbSet.Local.AsQueryable().FirstOrDefault(predicate.Compile()) ?? await dbSet.FirstOrDefaultAsync(predicate);
        if (entidad != null) return idSelector(entidad);
        
        // Crear nueva entidad
        var nuevaEntidad = new TEntity();
        var prop = typeof(TEntity).GetProperties().FirstOrDefault(p =>
            (p.Name.ToLower().Contains("nombre") || p.Name.ToLower().Contains("sector") || p.Name.ToLower().Contains("ciudad") || p.Name.ToLower().Contains("pais") || p.Name.ToLower().Contains("provincia") || p.Name.ToLower().Contains("municipio") || p.Name.ToLower().Contains("nacionalidad") || p.Name.ToLower().Contains("actividadcomercial") || p.Name.ToLower().Contains("moneda") || p.Name.ToLower().Contains("estadocivil") || p.Name.ToLower().Contains("tipocliente"))
            && p.PropertyType == typeof(string)
        );
        if (prop != null) prop.SetValue(nuevaEntidad, nombre);
        dbSet.Add(nuevaEntidad);
        await _tenantDbContext.SaveChangesAsync();
        return idSelector(nuevaEntidad);
    }

    /// <summary>
    /// Guarda la imagen de un cliente, acepta png, jpg, jpeg y actualiza la URL en la base de datos
    /// </summary>
    public async Task<string> GuardarImagenClienteAsync(int clienteId, IFormFile imagen)
    {
        if (imagen == null || imagen.Length == 0)
            throw new ArgumentException("No se recibió ninguna imagen");
        var formatosPermitidos = new[] { ".png", ".jpg", ".jpeg" };
        var extension = Path.GetExtension(imagen.FileName).ToLowerInvariant();
        if (!formatosPermitidos.Contains(extension))
            throw new ArgumentException("Formato de imagen no permitido. Solo se aceptan png, jpg, jpeg");
        var nombreArchivo = $"cliente_{clienteId}_{Guid.NewGuid()}{extension}";
        var rutaCarpeta = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", "Clientes");
        if (!Directory.Exists(rutaCarpeta))
            Directory.CreateDirectory(rutaCarpeta);
        var rutaCompleta = Path.Combine(rutaCarpeta, nombreArchivo);
        using (var stream = new FileStream(rutaCompleta, FileMode.Create))
        {
            await imagen.CopyToAsync(stream);
        }
        // Guardar la URL en la base de datos
        var cliente = await _tenantDbContext.Clientes.FirstOrDefaultAsync(c => c.FidCliente == clienteId);
        if (cliente == null)
            throw new InvalidOperationException($"Cliente con ID {clienteId} no encontrado");
        var urlImagen = $"/img/Clientes/{nombreArchivo}";
        cliente.FdirFoto = urlImagen;
        await _tenantDbContext.SaveChangesAsync();
        _logger.LogInformation("Imagen guardada para cliente {ClienteId}: {UrlImagen}", clienteId, urlImagen);
        return urlImagen;
    }

    #endregion
}
