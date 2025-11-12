using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ventas.Models.ModelsBdCentral;

namespace ventas.Context;

public partial class CentralDbContext : IdentityDbContext<IdentityUser>
{
    private readonly CentralDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CentralDbContext> _logger;

    public CentralDbContext(DbContextOptions<CentralDbContext> options, IHttpContextAccessor httpContextAccessor, ILogger<CentralDbContext> logger) : base(options)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
        _context = this;
    }

    public virtual DbSet<TbUsuarioCentral> Usuarios { get; set; } = null!;
    public virtual DbSet<TbEmpresa> Empresas { get; set; } = null!;
    public virtual DbSet<TbConexion> Conexiones { get; set; } = null!;
    public virtual DbSet<TbAuditoria> Auditorias { get; set; } = null!;
    public virtual DbSet<TbMoneda> Monedas { get; set; } = null!;
    public new virtual DbSet<IdentityUserClaim<string>> UserClaims { get; set; } = null!;

    // Add this property to track seeding state
    public bool IsSeeding { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TbUsuarioCentral>(entity =>
        {
            entity.ToTable("tb_usuario_central");
            entity.HasKey(u => u.FidUsuario);
            entity.Property(u => u.FidUsuario).HasColumnName("fid_usuario");
            entity.Property(u => u.Fnombre).HasColumnName("fnombre").IsRequired().HasMaxLength(100);
            entity.Property(u => u.FnombreUsuario).HasColumnName("fnombre_usuario").IsRequired().HasMaxLength(20);
            entity.Property(u => u.Fpassword).HasColumnName("fpassword").IsRequired().HasMaxLength(int.MaxValue);
            entity.Property(u => u.Femail).HasColumnName("femail").IsRequired().HasMaxLength(100);
            entity.Property(u => u.Factivo).HasColumnName("factivo").IsRequired();
            entity.Property(u => u.FkidEmpresa).HasColumnName("fkid_empresa").IsRequired();

            // Relación con la tabla empresa
            entity.HasOne<TbEmpresa>().WithMany().HasForeignKey(u => u.FkidEmpresa).OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<TbEmpresa>(entity =>
        {
            entity.ToTable("tb_empresa");
            entity.HasKey(e => e.FidEmpresa);
            entity.Property(e => e.FidEmpresa).HasColumnName("fid_empresa");
            entity.Property(e => e.FnombreEmpresa).HasColumnName("fnombre_empresa").IsRequired().HasMaxLength(100);
            entity.Property(e => e.Frnc).HasColumnName("frnc").IsRequired().HasMaxLength(20);
            entity.Property(e => e.Femail).HasColumnName("femail").IsRequired().HasMaxLength(100);
            entity.Property(e => e.Flogo).HasColumnName("flogo").IsRequired();
            entity.Property(e => e.Feslogan).HasColumnName("feslogan").IsRequired().HasMaxLength(200);
            entity.Property(e => e.Factivo).HasColumnName("factivo").IsRequired();
            entity.Property(e => e.FkidConexion).HasColumnName("fkid_conexion").IsRequired();

            // Relacion con la tabla conexion
            entity.HasOne<TbConexion>().WithMany().HasForeignKey(e => e.FkidConexion).OnDelete(DeleteBehavior.NoAction);
        });

        modelBuilder.Entity<TbConexion>(entity =>
        {
            entity.ToTable("tb_conexion");
            entity.HasKey(c => c.FidConexion);
            entity.Property(c => c.FidConexion).HasColumnName("fid_conexion");
            entity.Property(c => c.FnombreBd).HasColumnName("fnombre_base_datos").IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<TbAuditoria>(entity =>
        {
            entity.ToTable("tb_auditoria");
            entity.HasKey(a => a.FidAuditoria);
            entity.Property(a => a.FidAuditoria).HasColumnName("fid_auditoria");
            entity.Property(a => a.FkidUsuario).HasColumnName("fkid_usuario");
            entity.Property(a => a.FkidRegistro).HasColumnName("fkid_registro");
            entity.Property(a => a.FkidEmpresa).HasColumnName("fkid_empresa");
            entity.Property(a => a.Ftabla).HasColumnName("ftabla").HasColumnType("varchar(50)").IsRequired();
            entity.Property(a => a.Ffecha).HasColumnName("ffecha").HasColumnType("Date").IsRequired();
            entity.Property(a => a.Fhora).HasColumnName("fhora").IsRequired();
            entity.Property(a => a.Faccion).HasColumnName("faccion").HasColumnType("varchar(50)").IsRequired();
            entity.Property(a => a.FdireccionIp).HasColumnName("fdireccion_ip").HasColumnType("varchar(50)");
            entity.Property(a => a.FuserAgent).HasColumnName("fuser_agent").HasColumnType("varchar(500)");
            entity.Property(a => a.Fdetalles).HasColumnName("fdetalles").HasColumnType("text");
        });

        modelBuilder.Entity<TbMoneda>(entity =>
        {
            entity.ToTable("tb_moneda");
            entity.HasKey(m => m.FidMoneda);
            entity.Property(m => m.FidMoneda).HasColumnName("fid_moneda");
            entity.Property(m => m.Fmoneda).HasColumnName("fmoneda").HasColumnType("varchar(10)").IsRequired();
            entity.Property(m => m.Fsimbolo).HasColumnName("fsimbolo").HasColumnType("varchar(5)").IsRequired();
            entity.Property(m => m.Factivo).HasColumnName("factivo").IsRequired();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        // Saltar auditoría durante la inicialización de datos
        if (IsSeeding) return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

        // Saltar auditoría SOLO para tablas de Identity framework (NO excluir TbUsuarioCentral)
        var entriesToSkip = ChangeTracker.Entries()
            .Where(e => e.Entity is IdentityUser ||
                        e.Entity is IdentityRole ||
                        e.Entity is IdentityUserClaim<string> ||
                        e.Entity is IdentityUserLogin<string> ||
                        e.Entity is IdentityUserToken<string> ||
                        e.Entity is IdentityRoleClaim<string> ||
                        e.Entity is TbAuditoria); // No auditar la propia tabla de auditoría

        var auditorias = new List<TbAuditoria>();
        var (usuarioId, tenantId) = await ObtenerUsuarioActual();

        var entriesToAudit = ChangeTracker.Entries()
            .Where(e => e.State != EntityState.Unchanged &&
                        e.State != EntityState.Detached &&
                        !entriesToSkip.Any(s => s.Entity == e.Entity));

        foreach (var entrada in entriesToAudit)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var ipAddressRaw = httpContext?.Connection?.RemoteIpAddress?.ToString() ?? "Unknown";
            
            // Normalizar la IP (convertir ::1 a Localhost o 127.0.0.1)
            var ipAddress = NormalizarDireccionIp(ipAddressRaw);
            
            var userAgent = httpContext?.Request?.Headers["User-Agent"].ToString() ?? "Unknown";
            
            // Generar detalles de los cambios
            var detalles = GenerarDetallesCambios(entrada);
            
            var auditoria = new TbAuditoria
            {
                Ftabla = entrada.Entity.GetType().Name,
                Faccion = TraducirEstadoEntidad(entrada.State),
                Ffecha = DateTime.UtcNow.Date,
                Fhora = DateTime.UtcNow.ToString("HH:mm:ss"),
                FkidUsuario = usuarioId ?? 0,
                FkidRegistro = ObtenerIdRegistro(entrada),
                FkidEmpresa = tenantId, // Agregar TenantId para saber de qué tenant es la acción
                FdireccionIp = ipAddress,
                FuserAgent = userAgent.Length > 500 ? userAgent.Substring(0, 500) : userAgent,
                Fdetalles = detalles
            };
            auditorias.Add(auditoria);

            _logger.LogInformation("📝 Auditoría registrada en BD Central: Tabla={Tabla}, Acción={Accion}, Usuario={Usuario}, TenantId={TenantId}, IP={IP}",
                auditoria.Ftabla, auditoria.Faccion, auditoria.FkidUsuario, auditoria.FkidEmpresa, ipAddress);
        }

        if (auditorias.Any())
        {
            // Verificar si ya existe una transacción activa (por ejemplo, de Identity Framework)
            var transaccionExistente = Database.CurrentTransaction != null;
            
            if (transaccionExistente)
            {
                // Si ya hay una transacción, NO crear una nueva, usar la existente
                try
                {
                    var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    await Auditorias.AddRangeAsync(auditorias, cancellationToken);
                    await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    _logger.LogInformation("✅ {Count} registros de auditoría guardados en BD Central (transacción existente)", auditorias.Count);
                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Error guardando auditoría en BD Central (transacción existente)");
                    throw;
                }
            }
            else
            {
                // Si NO hay transacción, crear una nueva
                await using var transaccion = await Database.BeginTransactionAsync(cancellationToken);
                try
                {
                    var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    await Auditorias.AddRangeAsync(auditorias, cancellationToken);
                    await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    await transaccion.CommitAsync(cancellationToken);
                    _logger.LogInformation("✅ {Count} registros de auditoría guardados en BD Central (nueva transacción)", auditorias.Count);
                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "❌ Error guardando auditoría en BD Central (nueva transacción)");
                    await transaccion.RollbackAsync(cancellationToken);
                    throw;
                }
            }
        }

        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private string TraducirEstadoEntidad(EntityState estado)
    {
        switch (estado)
        {
            case EntityState.Added:
                return "Creación";
            case EntityState.Modified:
                return "Modificación";
            case EntityState.Deleted:
                return "Eliminación";
            case EntityState.Detached:
                return "Desconectado";
            case EntityState.Unchanged:
                return "Sin cambios";
            default:
                return estado.ToString();
        }
    }

    private async Task<(int? usuarioId, int? tenantId)> ObtenerUsuarioActual()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return (null, null);

        // Verificar si ya tenemos los datos almacenados en el contexto para esta solicitud
        if (httpContext.Items.TryGetValue("CurrentUserData", out var cachedData) && cachedData != null)
            return ((int?, int?))cachedData;

        // Obtener Identity ID del usuario autenticado
        var identityId = httpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(identityId)) return (null, null);

        try
        {
            // Buscar el usuario en TbUsuarios usando el IdentityId
            var usuario = await _context.Set<TbUsuarioCentral>()
                .Where(u => u.IdentityId == identityId)
                .Select(u => new { u.FidUsuario, u.FkidEmpresa })
                .FirstOrDefaultAsync();

            if (usuario == null) return (null, null);

            // Cachear el resultado para esta solicitud
            var result = ((int?)usuario.FidUsuario, (int?)usuario.FkidEmpresa);
            httpContext.Items["CurrentUserData"] = result;

            return result;  
        }
        catch (Exception ex)
        {
            // Loggear error sin interrumpir el flujo
            _logger.LogError(ex, "Error obteniendo datos de usuario");
            return (null, null);
        }
    }

    private int ObtenerIdRegistro(EntityEntry entrada)
    {
        try
        {
            // 1. Primero intentamos obtener el ID real (para entidades existentes)
            if (entrada.State != EntityState.Added)
            {
                var propClave = entrada.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey());
                if (propClave?.CurrentValue != null)
                    // Handle different ID types
                    return propClave.CurrentValue switch
                    {
                        int intValue => intValue,
                        long longValue => (int)longValue,
                        string strValue when int.TryParse(strValue, out var parsedInt) => parsedInt,
                        Guid guidValue => Math.Abs(guidValue.GetHashCode()), // Convert GUID to a pseudo-int
                        _ => 0
                    };
            }

            // 2. Para entidades nuevas, generamos un ID secuencial temporal
            if (entrada.State == EntityState.Added)
            {
                // Null check for HttpContext
                if (_httpContextAccessor.HttpContext == null) return -1;

                // Usamos un contador estático para IDs temporales (por solicitud)
                if (!_httpContextAccessor.HttpContext.Items.ContainsKey("TempIdCounter"))
                    _httpContextAccessor.HttpContext.Items["TempIdCounter"] = -1;

                var counter = (int)_httpContextAccessor.HttpContext.Items["TempIdCounter"]!;
                counter--;
                _httpContextAccessor.HttpContext.Items["TempIdCounter"] = counter;

                return counter;
            }

            return 0;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener ID de registro para auditoría");
            return 0;
        }
    }
    
    private string GenerarDetallesCambios(EntityEntry entrada)
    {
        try
        {
            var detalles = new System.Text.StringBuilder();
            var nombreEntidad = entrada.Entity.GetType().Name;
            
            switch (entrada.State)
            {
                case EntityState.Added:
                    // Para TbUsuarioCentral, mostrar información del usuario
                    if (entrada.Entity is TbUsuarioCentral usuario)
                    {
                        detalles.Append($"Usuario creado: {usuario.FnombreUsuario} ({usuario.Fnombre})");
                        if (!string.IsNullOrEmpty(usuario.Femail))
                        {
                            detalles.Append($" - Email: {usuario.Femail}");
                        }
                    }
                    // Para IdentityUser, mostrar email
                    else if (entrada.Entity is IdentityUser identityUser)
                    {
                        detalles.Append($"Cuenta de autenticación creada: {identityUser.UserName}");
                    }
                    // Para IdentityUserRole, mostrar asignación de rol
                    else if (nombreEntidad.Contains("IdentityUserRole"))
                    {
                        detalles.Append("Rol asignado al usuario");
                    }
                    else
                    {
                        detalles.Append($"Nuevo registro en {nombreEntidad}");
                    }
                    break;
                    
                case EntityState.Modified:
                    // Para TbUsuarioCentral, mostrar qué campos cambiaron
                    if (entrada.Entity is TbUsuarioCentral usuarioMod)
                    {
                        var camposModificados = entrada.Properties
                            .Where(p => p.IsModified && !p.Metadata.IsPrimaryKey())
                            .ToList();
                        
                        detalles.Append($"Usuario modificado: {usuarioMod.FnombreUsuario}");
                        
                        if (camposModificados.Any())
                        {
                            detalles.Append(" - Campos: ");
                            var cambios = new List<string>();
                            foreach (var prop in camposModificados)
                            {
                                var nombreCampo = prop.Metadata.Name switch
                                {
                                    "Fnombre" => "Nombre",
                                    "FnombreUsuario" => "Usuario",
                                    "Femail" => "Email",
                                    "Factivo" => "Estado",
                                    "Fpassword" => "Contraseña",
                                    _ => prop.Metadata.Name
                                };
                                cambios.Add(nombreCampo);
                            }
                            detalles.Append(string.Join(", ", cambios));
                        }
                    }
                    else
                    {
                        detalles.Append($"Modificado en {nombreEntidad}: ");
                        var camposModificados = entrada.Properties
                            .Where(p => p.IsModified && !p.Metadata.IsPrimaryKey())
                            .Select(p => p.Metadata.Name)
                            .ToList();
                        detalles.Append(string.Join(", ", camposModificados));
                    }
                    break;
                    
                case EntityState.Deleted:
                    if (entrada.Entity is TbUsuarioCentral usuarioDel)
                    {
                        detalles.Append($"Usuario eliminado: {usuarioDel.FnombreUsuario}");
                    }
                    else
                    {
                        detalles.Append($"Registro eliminado de {nombreEntidad}");
                    }
                    break;
            }
            
            return detalles.ToString();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generando detalles de cambios");
            return "Sin detalles";
        }
    }
    
    private string NormalizarDireccionIp(string ipAddress)
    {
        if (string.IsNullOrWhiteSpace(ipAddress) || ipAddress == "Unknown")
        {
            return "Unknown";
        }
        
        // Convertir ::1 (IPv6 localhost) a formato legible
        if (ipAddress == "::1" || ipAddress == "::ffff:127.0.0.1")
        {
            return "127.0.0.1 (Localhost)";
        }
        
        // Si es una IP IPv6, mostrarla de forma más limpia
        if (ipAddress.Contains("::ffff:"))
        {
            // Extraer la parte IPv4 de una dirección IPv6 mapeada
            return ipAddress.Replace("::ffff:", "");
        }
        
        return ipAddress;
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}