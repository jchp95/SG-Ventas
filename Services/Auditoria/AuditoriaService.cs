using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Interfaces.Auditoria;
using ventas.Interfaces.Tenant;
using ventas.Services;

namespace ventas.Services.Auditoria;

/// <summary>
/// Servicio de auditoría dual: registra acciones tanto en la base central como en el tenant
/// </summary>
public class AuditoriaService : IAuditoriaService
{
    private readonly CentralDbContext _centralDbContext;
    private readonly ITenantDatabaseService _tenantDatabaseService;
    private readonly ILogger<AuditoriaService> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IServiceProvider _serviceProvider;

    public AuditoriaService(
        CentralDbContext centralDbContext,
        ITenantDatabaseService tenantDatabaseService,
        ILogger<AuditoriaService> logger,
        IHttpContextAccessor httpContextAccessor,
        IServiceProvider serviceProvider)
    {
        _centralDbContext = centralDbContext;
        _tenantDatabaseService = tenantDatabaseService;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
        _serviceProvider = serviceProvider;
    }

    public async Task<bool> RegistrarAuditoriaUsuarioAsync(
        string tabla,
        string accion,
        int registroId,
        int usuarioId,
        int tenantId,
        string? tenantDbName = null)
    {
        var exitoCentral = false;
        var exitoTenant = false;

        try
        {
            // ========== PASO 1: Registrar en la base de datos CENTRAL ==========
            var auditoriaCentral = new Models.ModelsBdCentral.TbAuditoria
            {
                Ftabla = tabla,
                Faccion = accion,
                Ffecha = DateTime.UtcNow.Date,
                Fhora = DateTime.UtcNow.ToString("HH:mm:ss"),
                FkidUsuario = usuarioId,
                FkidRegistro = registroId,
                FkidEmpresa = tenantId
            };

            // Deshabilitar temporalmente la auditoría automática para evitar recursión
            var originalIsSeeding = _centralDbContext.IsSeeding;
            _centralDbContext.IsSeeding = true;

            _centralDbContext.Auditorias.Add(auditoriaCentral);
            await _centralDbContext.SaveChangesAsync();

            _centralDbContext.IsSeeding = originalIsSeeding;

            exitoCentral = true;
            _logger.LogInformation(
                "✅ Auditoría guardada en BD Central: Tabla={Tabla}, Acción={Accion}, Usuario={Usuario}, Tenant={Tenant}",
                tabla, accion, usuarioId, tenantId);

            // ========== PASO 2: Registrar en la base de datos del TENANT ==========
            // Obtener el nombre de la base de datos tenant si no se proporcionó
            if (string.IsNullOrWhiteSpace(tenantDbName))
            {
                var httpContext = _httpContextAccessor.HttpContext;
                tenantDbName = httpContext?.User?.FindFirst("TenantDbName")?.Value;

                // Si aún no se puede obtener, buscar por el tenantId
                if (string.IsNullOrWhiteSpace(tenantDbName))
                {
                    var conexion = await _centralDbContext.Empresas
                        .Where(e => e.FidEmpresa == tenantId)
                        .Join(_centralDbContext.Conexiones,
                            empresa => empresa.FkidConexion,
                            conexion => conexion.FidConexion,
                            (empresa, conexion) => conexion)
                        .FirstOrDefaultAsync();

                    if (conexion != null)
                    {
                        tenantDbName = conexion.FnombreBd;
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(tenantDbName))
            {
                try
                {
                    // Crear un nuevo scope para obtener el contexto del tenant
                    using var scope = _serviceProvider.CreateScope();
                    var tenantDbContextService = scope.ServiceProvider.GetRequiredService<TenantDbContextService>();
                    
                    // Crear el contexto del tenant con el nombre de la base de datos
                    var tenantDbContext = tenantDbContextService.CreateContext(tenantDbName);

                    if (tenantDbContext != null)
                    {
                        var auditoriaTenant = new Models.ModelsBdTenant.TbAuditoria
                        {
                            FkidTabla = ObtenerTablaId(tabla),
                            FkidAccion = ObtenerAccionId(accion),
                            Ffecha = DateOnly.FromDateTime(DateTime.Now),
                            Fhora = DateTime.Now.ToString("HH:mm:ss"),
                            FkidUsuario = usuarioId,
                            FkidRegistro = registroId,
                            Fnombrepc = _httpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString() 
                                        ?? Environment.MachineName,
                            Fjustificacion = $"{accion} en {tabla}",
                            FestadoSync = "S"
                        };

                        // Deshabilitar temporalmente la auditoría automática en el tenant
                        var originalTenantIsSeeding = tenantDbContext.IsSeeding;
                        tenantDbContext.IsSeeding = true;

                        tenantDbContext.Auditoria.Add(auditoriaTenant);
                        await tenantDbContext.SaveChangesAsync();

                        tenantDbContext.IsSeeding = originalTenantIsSeeding;

                        exitoTenant = true;
                        _logger.LogInformation(
                            "✅ Auditoría guardada en BD Tenant ({TenantDb}): Tabla={Tabla}, Acción={Accion}, Usuario={Usuario}",
                            tenantDbName, tabla, accion, usuarioId);
                    }
                    else
                    {
                        _logger.LogWarning(
                            "⚠️ No se pudo obtener el contexto del tenant {TenantDb} para registrar auditoría",
                            tenantDbName);
                    }
                }
                catch (Exception tenantEx)
                {
                    _logger.LogError(tenantEx,
                        "❌ Error al registrar auditoría en tenant {TenantDb}",
                        tenantDbName);
                }
            }
            else
            {
                _logger.LogWarning(
                    "⚠️ No se pudo determinar la base de datos del tenant para registrar auditoría (TenantId={TenantId})",
                    tenantId);
            }

            return exitoCentral; // Retornar true si al menos se guardó en la base central
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "❌ Error al registrar auditoría: Tabla={Tabla}, Acción={Accion}, Usuario={Usuario}, Tenant={Tenant}",
                tabla, accion, usuarioId, tenantId);
            return false;
        }
    }

    /// <summary>
    /// Mapea el nombre de la tabla a su ID correspondiente en tb_auditoria_tabla
    /// </summary>
    private int ObtenerTablaId(string tablaNombre)
    {
        return tablaNombre switch
        {
            "TbUsuarioCentral" => 2, // Asumiendo que los usuarios centrales tienen ID 2
            "TbCliente" => 1,
            "TbUsuario" => 2,
            "TbEmpresa" => 3,
            "TbSucursal" => 4,
            "TbRuta" => 5,
            "TbConfiguracion" => 6,
            "TbParametro" => 7,
            _ => 0
        };
    }

    /// <summary>
    /// Mapea el nombre de la acción a su ID correspondiente en tb_auditoria_accion
    /// </summary>
    private int ObtenerAccionId(string accion)
    {
        return accion.ToLower() switch
        {
            "creación" => 1,
            "crear" => 1,
            "modificación" => 2,
            "modificar" => 2,
            "editar" => 2,
            "eliminación" => 3,
            "eliminar" => 3,
            "activar" => 4,
            "desactivar" => 5,
            "asignar permisos" => 6,
            _ => 0
        };
    }
}
