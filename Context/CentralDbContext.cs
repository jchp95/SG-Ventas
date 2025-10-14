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
            entity.Property(a => a.Ftabla).HasColumnName("ftabla").HasColumnType("varchar(50)").IsRequired();
            entity.Property(a => a.Ffecha).HasColumnName("ffecha").HasColumnType("Date").IsRequired();
            entity.Property(a => a.Fhora).HasColumnName("fhora").IsRequired();
            entity.Property(a => a.Faccion).HasColumnName("faccion").HasColumnType("varchar(50)").IsRequired();
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

        // Saltar auditoría para tablas de Identity framework y TbUsuarioCentral
        var entriesToSkip = ChangeTracker.Entries()
            .Where(e => e.Entity is IdentityUser ||
                        e.Entity is IdentityRole ||
                        e.Entity is IdentityUserClaim<string> ||
                        e.Entity is IdentityUserLogin<string> ||
                        e.Entity is IdentityUserToken<string> ||
                        e.Entity is IdentityRoleClaim<string> ||
                        e.Entity is TbUsuarioCentral);

        if (entriesToSkip.Any()) return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

        var auditorias = new List<TbAuditoria>();
        var usuarioIdActual = await ObtenerUsuarioActual();

        var entriesToAudit = ChangeTracker.Entries()
            .Where(e => e.State != EntityState.Unchanged &&
                        !entriesToSkip.Any(s => s.Entity == e.Entity));

        foreach (var entrada in entriesToAudit)
        {
            var auditoria = new TbAuditoria
            {
                Ftabla = entrada.Entity.GetType().Name,
                Faccion = TraducirEstadoEntidad(entrada.State),
                Ffecha = DateTime.UtcNow.Date,
                Fhora = DateTime.UtcNow.ToString("HH:mm:ss"),
                FkidUsuario = usuarioIdActual.usuarioId ?? 0,
                FkidRegistro = ObtenerIdRegistro(entrada)
            };
            auditorias.Add(auditoria);
        }

        if (auditorias.Any())
        {
            await using var transaccion = await Database.BeginTransactionAsync(cancellationToken);
            var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            await Auditorias.AddRangeAsync(auditorias, cancellationToken);
            await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            await transaccion.CommitAsync(cancellationToken);
            return result;
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

    private async Task<(int? usuarioId, string usuarioNombre)> ObtenerUsuarioActual()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return (null, null);

        // Verificar si ya tenemos los datos almacenados en el contexto para esta solicitud
        if (httpContext.Items.TryGetValue("CurrentUserData", out var cachedData))
            return ((int? usuarioId, string usuarioNombre))cachedData;

        // Obtener Identity ID del usuario autenticado
        var identityId = httpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(identityId)) return (null, null);

        try
        {
            // Buscar el usuario en TbUsuarios usando el IdentityId
            var usuario = await _context.Set<TbUsuarioCentral>()
                .Where(u => u.IdentityId == identityId)
                .Select(u => new { u.FidUsuario, u.FnombreUsuario })
                .FirstOrDefaultAsync();

            if (usuario == null) return (null, null);

            // Cachear el resultado para esta solicitud
            var result = ((int?)usuario.FidUsuario, usuario.FnombreUsuario); // Explicitly cast to int?
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

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}