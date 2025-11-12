using System.Security.Claims;
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
            // Obtener información del usuario actual
            var (empresaId, usuarioId) = await ObtenerEmpresaYUsuarioActual();

            _logger.LogInformation("Creando nuevo cliente: {Nombre} para empresa {EmpresaId} por usuario {UsuarioId}",
                request.Nombre, empresaId, usuarioId);

            // Validar que la cédula/RNC no exista para este tenant si se proporciona
            if (!string.IsNullOrEmpty(request.CedulaRnc))
            {
                var existeCliente = await _tenantDbContext.Clientes
                    .AnyAsync(c => c.FcedulaRnc == request.CedulaRnc && c.FkidEmpresa == empresaId);

                if (existeCliente)
                {
                    throw new InvalidOperationException(
                        $"Ya existe un cliente con la cédula/RNC '{request.CedulaRnc}'");
                }
            }

            // Obtener el siguiente número de cliente
            var ultimoNumero = await _tenantDbContext.Clientes
                .Where(c => c.FkidEmpresa == empresaId)
                .MaxAsync(c => (int?)c.FnumeroCliente) ?? 0;

            // Crear nuevo cliente
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
                FdirFoto = "", // Se puede implementar después
                FkidRuta = request.IdRuta ?? 0,
                FkidEstadoCivil = request.IdEstadoCivil ?? 0,
                FkidSector = request.IdSector ?? 0,
                FkidMunicipio = request.IdMunicipio ?? 0,
                FkidCiudad = request.IdCiudad ?? 0,
                FkidProvincia = request.IdProvincia ?? 0,
                FkidPais = request.IdPais ?? 0,
                FkidNacionalidad = request.IdNacionalidad ?? 0,
                FkidTipoCliente = request.IdTipoCliente ?? 0,
                FkidActividadComercial = request.IdActividadComercial ?? 0,
                FkidMoneda = request.IdMoneda ?? 0,
                FkidEmpresa = empresaId,
                FkidUsuario = usuarioId,
                Factivo = true
            };

            _tenantDbContext.Clientes.Add(nuevoCliente);
            await _tenantDbContext.SaveChangesAsync();

            _logger.LogInformation("Cliente creado exitosamente con ID: {ClienteId}", nuevoCliente.FidCliente);

            await transaction.CommitAsync();

            return MapToResponse(nuevoCliente);
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

            var clientesResponse = clientes.Select(MapToResponse).ToList();

            _logger.LogInformation("Se obtuvieron {Count} clientes para la empresa {EmpresaId}",
                clientesResponse.Count, empresaId);

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

            return cliente == null ? null : MapToResponse(cliente);
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

            _logger.LogInformation("Actualizando cliente {ClienteId} por usuario {UsuarioId}",
                request.IdCliente, usuarioId);

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

            // Actualizar foreign keys opcionales
            if (request.IdRuta.HasValue) cliente.FkidRuta = request.IdRuta.Value;
            if (request.IdEstadoCivil.HasValue) cliente.FkidEstadoCivil = request.IdEstadoCivil.Value;
            if (request.IdSector.HasValue) cliente.FkidSector = request.IdSector.Value;
            if (request.IdMunicipio.HasValue) cliente.FkidMunicipio = request.IdMunicipio.Value;
            if (request.IdCiudad.HasValue) cliente.FkidCiudad = request.IdCiudad.Value;
            if (request.IdProvincia.HasValue) cliente.FkidProvincia = request.IdProvincia.Value;
            if (request.IdPais.HasValue) cliente.FkidPais = request.IdPais.Value;
            if (request.IdNacionalidad.HasValue) cliente.FkidNacionalidad = request.IdNacionalidad.Value;
            if (request.IdTipoCliente.HasValue) cliente.FkidTipoCliente = request.IdTipoCliente.Value;
            if (request.IdActividadComercial.HasValue) cliente.FkidActividadComercial = request.IdActividadComercial.Value;
            if (request.IdMoneda.HasValue) cliente.FkidMoneda = request.IdMoneda.Value;

            await _tenantDbContext.SaveChangesAsync();

            _logger.LogInformation("Cliente {ClienteId} actualizado exitosamente", request.IdCliente);

            await transaction.CommitAsync();

            return MapToResponse(cliente);
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

            _logger.LogInformation("Cliente {ClienteId} cambió a estado {Estado}",
                clienteId, cliente.Factivo ? "Activo" : "Inactivo");

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
    ///     Mapea un TbCliente a ClienteResponse
    /// </summary>
    private ClienteResponse MapToResponse(TbCliente cliente)
    {
        return new ClienteResponse
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
    }

    #endregion
}
