using System.Diagnostics;

namespace ventas.Middleware;

public class TenantMiddleware
{
    private readonly ILogger<TenantMiddleware> _logger;
    private readonly RequestDelegate _next;

    public TenantMiddleware(RequestDelegate next, ILogger<TenantMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value ?? "";
        var correlationId = context.TraceIdentifier;

        // Omitir validación de tenant para rutas de autenticación
        var skipTenantValidation = path.StartsWith("/api/Auth", StringComparison.OrdinalIgnoreCase);

        if (skipTenantValidation)
        {
            _logger.LogDebug("Omitiendo validación de tenant para ruta de auth: {Path}, CorrelationId: {CorrelationId}", 
                path, correlationId);
            
            var authSw = Stopwatch.StartNew();
            try
            {
                await _next(context);
            }
            finally
            {
                authSw.Stop();
                _logger.LogInformation("Request {Method} {Path} terminó con {StatusCode} en {Duration} ms. Tenant: (auth-bypass), CorrelationId: {CorrelationId}",
                    context.Request.Method, path, context.Response.StatusCode, authSw.ElapsedMilliseconds, correlationId);
            }
            return;
        }

        var tenantDbName = context.User.Claims
            .FirstOrDefault(c => c.Type == "TenantDbName")?.Value;

        if (string.IsNullOrEmpty(tenantDbName))
        {
            _logger.LogWarning(
                "No TenantDbName claim. Path: {Path}, Authenticated: {Auth}, CorrelationId: {CorrelationId}",
                path, context.User?.Identity?.IsAuthenticated, correlationId);
        }
        else
        {
            context.Items["TenantConnection"] = tenantDbName;
            context.Items["TenantId"] = tenantDbName; // También agregar como TenantId para los controladores
            _logger.LogDebug("TenantDbName encontrado: {Tenant}. Path: {Path}, CorrelationId: {CorrelationId}",
                tenantDbName, path, correlationId);
        }

        var sw = Stopwatch.StartNew();
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Excepción en pipeline. Path: {Path}, Tenant: {Tenant}, CorrelationId: {CorrelationId}",
                path, tenantDbName, correlationId);
            throw;
        }
        finally
        {
            sw.Stop();
            _logger.LogInformation(
                "Request {Method} {Path} terminó con {StatusCode} en {Elapsed} ms. Tenant: {Tenant}, CorrelationId: {CorrelationId}",
                context.Request.Method, path, context.Response?.StatusCode, sw.ElapsedMilliseconds, tenantDbName,
                correlationId);
        }
    }
}