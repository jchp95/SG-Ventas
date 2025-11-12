using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Services;

namespace ventas.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AuditoriaController : ControllerBase
{
    private readonly ILogger<AuditoriaController> _logger;
    private readonly TenantDbContextService _tenantDbContextService;
    private readonly CentralDbContext _centralDbContext;

    public AuditoriaController(
        TenantDbContextService tenantDbContextService,
        CentralDbContext centralDbContext,
        ILogger<AuditoriaController> logger)
    {
        _tenantDbContextService = tenantDbContextService;
        _centralDbContext = centralDbContext;
        _logger = logger;
    }

    /// <summary>
    ///     Obtiene todas las auditorías con filtros opcionales
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAuditorias(
        [FromQuery] int? accionId = null,
        [FromQuery] int? tablaId = null,
        [FromQuery] int? usuarioId = null,
        [FromQuery] string? fechaDesde = null,
        [FromQuery] string? fechaHasta = null,
        [FromQuery] string? busqueda = null)
    {
        try
        {
            var tenantId = HttpContext.Items["TenantId"]?.ToString();
            if (string.IsNullOrEmpty(tenantId))
            {
                _logger.LogWarning("TenantId no encontrado en el contexto");
                return BadRequest(new { error = "No se pudo identificar el tenant" });
            }

            using var context = _tenantDbContextService.CreateContext(tenantId);

            var query = context.Auditoria.AsQueryable();

            // Aplicar filtros
            if (accionId.HasValue) query = query.Where(a => a.FkidAccion == accionId.Value);

            if (tablaId.HasValue) query = query.Where(a => a.FkidTabla == tablaId.Value);

            if (usuarioId.HasValue) query = query.Where(a => a.FkidUsuario == usuarioId.Value);

            if (!string.IsNullOrEmpty(fechaDesde) && DateOnly.TryParse(fechaDesde, out var dateDesde))
                query = query.Where(a => a.Ffecha >= dateDesde);

            if (!string.IsNullOrEmpty(fechaHasta) && DateOnly.TryParse(fechaHasta, out var dateHasta))
                query = query.Where(a => a.Ffecha <= dateHasta);

            if (!string.IsNullOrEmpty(busqueda))
            {
                var busquedaLower = busqueda.ToLower();
                query = query.Where(a =>
                    a.Fjustificacion.ToLower().Contains(busquedaLower) ||
                    a.Fnombrepc.ToLower().Contains(busquedaLower)
                );
            }

            // Ordenar por fecha y hora descendente (más recientes primero)
            var auditorias = query
                .OrderByDescending(a => a.Ffecha)
                .ThenByDescending(a => a.Fhora)
                .Take(1000) // Limitar a 1000 registros para evitar sobrecargas
                .Select(a => new
                {
                    fid = a.Fid,
                    fnombrepc = a.Fnombrepc,
                    fkid_tabla = a.FkidTabla,
                    fkid_registro = a.FkidRegistro,
                    ffecha = a.Ffecha.ToString("yyyy-MM-dd"),
                    fhora = a.Fhora,
                    fkid_accion = a.FkidAccion,
                    fjustificacion = a.Fjustificacion,
                    fkid_usuario = a.FkidUsuario,
                    festado_sync = a.FestadoSync
                })
                .ToList();

            _logger.LogInformation("Se obtuvieron {Count} registros de auditoría para el tenant {TenantId}",
                auditorias.Count, tenantId);

            return Ok(auditorias);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener auditorías");
            return StatusCode(500, new { error = "Error al obtener auditorías", details = ex.Message });
        }
    }

    /// <summary>
    ///     Obtiene una auditoría específica por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuditoria(int id)
    {
        try
        {
            var tenantId = HttpContext.Items["TenantId"]?.ToString();
            if (string.IsNullOrEmpty(tenantId)) return BadRequest(new { error = "No se pudo identificar el tenant" });

            using var context = _tenantDbContextService.CreateContext(tenantId);

            var auditoria = context.Auditoria
                .Where(a => a.Fid == id)
                .Select(a => new
                {
                    fid = a.Fid,
                    fnombrepc = a.Fnombrepc,
                    fkid_tabla = a.FkidTabla,
                    fkid_registro = a.FkidRegistro,
                    ffecha = a.Ffecha.ToString("yyyy-MM-dd"),
                    fhora = a.Fhora,
                    fkid_accion = a.FkidAccion,
                    fjustificacion = a.Fjustificacion,
                    fkid_usuario = a.FkidUsuario,
                    festado_sync = a.FestadoSync
                })
                .FirstOrDefault();

            if (auditoria == null) return NotFound(new { error = "Auditoría no encontrada" });

            return Ok(auditoria);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener auditoría por ID");
            return StatusCode(500, new { error = "Error al obtener auditoría", details = ex.Message });
        }
    }

    /// <summary>
    ///     Obtiene auditoría de usuarios desde la base central filtrada por tenant
    /// </summary>
    [HttpGet("usuarios")]
    public async Task<IActionResult> GetAuditoriaUsuarios(
        [FromQuery] int? usuarioId = null,
        [FromQuery] string? fechaDesde = null,
        [FromQuery] string? fechaHasta = null,
        [FromQuery] string? accion = null,
        [FromQuery] string? busqueda = null)
    {
        try
        {
            // Obtener el tenant del usuario autenticado desde los claims
            var empresaIdClaim = User.FindFirst("EmpresaId")?.Value;
            if (string.IsNullOrEmpty(empresaIdClaim) || !int.TryParse(empresaIdClaim, out var empresaId))
            {
                _logger.LogWarning("EmpresaId no encontrado en los claims del usuario");
                return BadRequest(new { error = "No se pudo identificar el tenant del usuario" });
            }

            // Consultar auditoría central filtrada por tenant
            var query = _centralDbContext.Auditorias
                .Where(a => a.FkidEmpresa == empresaId &&  // Filtrar por tenant
                           (a.Ftabla == "TbUsuarioCentral" || 
                            a.Ftabla.Contains("IdentityUser")));  // Solo auditoría de usuarios

            // Aplicar filtros opcionales
            if (usuarioId.HasValue)
                query = query.Where(a => a.FkidUsuario == usuarioId.Value);

            if (!string.IsNullOrEmpty(fechaDesde) && DateTime.TryParse(fechaDesde, out var dateDesde))
                query = query.Where(a => a.Ffecha >= dateDesde.Date);

            if (!string.IsNullOrEmpty(fechaHasta) && DateTime.TryParse(fechaHasta, out var dateHasta))
                query = query.Where(a => a.Ffecha <= dateHasta.Date);

            if (!string.IsNullOrEmpty(accion))
                query = query.Where(a => a.Faccion.ToLower().Contains(accion.ToLower()));

            if (!string.IsNullOrEmpty(busqueda))
            {
                var busquedaLower = busqueda.ToLower();
                query = query.Where(a => 
                    a.Ftabla.ToLower().Contains(busquedaLower) ||
                    a.Faccion.ToLower().Contains(busquedaLower));
            }

            // Obtener resultados ordenados con información del usuario
            var auditorias = await query
                .OrderByDescending(a => a.Ffecha)
                .ThenByDescending(a => a.Fhora)
                .Take(1000)
                .Join(_centralDbContext.Usuarios,
                    auditoria => auditoria.FkidUsuario,
                    usuario => usuario.FidUsuario,
                    (auditoria, usuario) => new
                    {
                        fid_auditoria = auditoria.FidAuditoria,
                        fkid_usuario = auditoria.FkidUsuario,
                        nombre_usuario = usuario.FnombreUsuario,
                        nombre_completo = usuario.Fnombre,
                        fkid_registro = auditoria.FkidRegistro,
                        fkid_empresa = auditoria.FkidEmpresa,
                        ftabla = auditoria.Ftabla,
                        ffecha = auditoria.Ffecha.ToString("yyyy-MM-dd"),
                        fhora = auditoria.Fhora,
                        faccion = auditoria.Faccion,
                        fdireccion_ip = auditoria.FdireccionIp ?? "N/A",
                        fdetalles = auditoria.Fdetalles ?? "Sin descripción"
                    })
                .ToListAsync();

            _logger.LogInformation(
                "Se obtuvieron {Count} registros de auditoría de usuarios para el tenant {TenantId}",
                auditorias.Count, empresaId);

            return Ok(auditorias);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener auditoría de usuarios");
            return StatusCode(500, new { error = "Error al obtener auditoría de usuarios", details = ex.Message });
        }
    }

    /// <summary>
    ///     Obtiene estadísticas de auditoría de usuarios desde la base central
    /// </summary>
    [HttpGet("usuarios/estadisticas")]
    public async Task<IActionResult> GetEstadisticasUsuarios()
    {
        try
        {
            // Obtener el tenant del usuario autenticado
            var empresaIdClaim = User.FindFirst("EmpresaId")?.Value;
            if (string.IsNullOrEmpty(empresaIdClaim) || !int.TryParse(empresaIdClaim, out var empresaId))
            {
                _logger.LogWarning("EmpresaId no encontrado en los claims del usuario");
                return BadRequest(new { error = "No se pudo identificar el tenant del usuario" });
            }

            var hoy = DateTime.UtcNow.Date;

            // Consultar estadísticas de auditoría de usuarios
            var query = _centralDbContext.Auditorias
                .Where(a => a.FkidEmpresa == empresaId &&
                           (a.Ftabla == "TbUsuarioCentral" || 
                            a.Ftabla.Contains("IdentityUser")));

            var estadisticas = new
            {
                totalRegistros = await query.CountAsync(),
                registrosHoy = await query.CountAsync(a => a.Ffecha == hoy),
                porAccion = await query
                    .GroupBy(a => a.Faccion)
                    .Select(g => new { accion = g.Key, cantidad = g.Count() })
                    .OrderByDescending(x => x.cantidad)
                    .ToListAsync(),
                porTabla = await query
                    .GroupBy(a => a.Ftabla)
                    .Select(g => new { tabla = g.Key, cantidad = g.Count() })
                    .OrderByDescending(x => x.cantidad)
                    .ToListAsync(),
                usuariosMasActivos = await query
                    .GroupBy(a => a.FkidUsuario)
                    .Select(g => new { usuarioId = g.Key, cantidad = g.Count() })
                    .OrderByDescending(x => x.cantidad)
                    .Take(10)
                    .Join(_centralDbContext.Usuarios,
                        stat => stat.usuarioId,
                        usuario => usuario.FidUsuario,
                        (stat, usuario) => new
                        {
                            usuario_id = usuario.FidUsuario,
                            nombre_usuario = usuario.FnombreUsuario,
                            nombre_completo = usuario.Fnombre,
                            cantidad_acciones = stat.cantidad
                        })
                    .ToListAsync()
            };

            return Ok(estadisticas);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener estadísticas de auditoría de usuarios");
            return StatusCode(500, new { error = "Error al obtener estadísticas", details = ex.Message });
        }
    }
}