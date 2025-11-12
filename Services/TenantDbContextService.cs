using Microsoft.EntityFrameworkCore;
using ventas.Context;

namespace ventas.Services;

public class TenantDbContextService
{
    private readonly IConfiguration _config;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<TenantDbContextService> _logger;
    private readonly ILoggerFactory _loggerFactory;

    public TenantDbContextService(
        IConfiguration config,
        IHttpContextAccessor httpContextAccessor,
        ILogger<TenantDbContextService> logger,
        ILoggerFactory loggerFactory)
    {
        _config = config;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _loggerFactory = loggerFactory;
    }

    // Para uso en runtime, toma tenant desde HttpContext
    public TenantDbContext CreateContext()
    {
        var tenantDbName = _httpContextAccessor.HttpContext?.Items["TenantConnection"]?.ToString();

        if (string.IsNullOrEmpty(tenantDbName))
        {
            _logger.LogError("No se encontró el tenant en HttpContext.");
            throw new InvalidOperationException("No se encontró el tenant para la conexión.");
        }

        _logger.LogInformation("Creando TenantDbContext para tenant {TenantDbName} desde HttpContext.", tenantDbName);

        return CreateContext(tenantDbName);
    }

    // Para uso con nombre explícito (ejemplo: SeedData)
    public TenantDbContext CreateContext(string tenantDbName)
    {
        if (string.IsNullOrEmpty(tenantDbName))
        {
            _logger.LogError("Se intentó crear TenantDbContext sin tenantDbName.");
            throw new InvalidOperationException("No se proporcionó el nombre del tenant para la conexión.");
        }

        var template = _config.GetConnectionString("TemplateTenant");
        var connectionString = string.Format(template ?? string.Empty, tenantDbName);

        _logger.LogDebug("Generada connection string para tenant {TenantDbName}.", tenantDbName);

        var options = new DbContextOptionsBuilder<TenantDbContext>()
            .UseSqlServer(connectionString)
            .Options;

        _logger.LogInformation("TenantDbContext creado exitosamente para tenant {TenantDbName}.", tenantDbName);

        // Crear contexto con las dependencias necesarias para auditoría
        var tenantLogger = _loggerFactory.CreateLogger<TenantDbContext>();
        return new TenantDbContext(options, _httpContextAccessor, tenantLogger);
    }
}