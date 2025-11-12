using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ventas.Models.ModelsBdTenant;

namespace ventas.Context;

public partial class TenantDbContext : DbContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<TenantDbContext> _logger;

    public TenantDbContext(DbContextOptions<TenantDbContext> options)
        : base(options)
    {
    }

    public TenantDbContext(
        DbContextOptions<TenantDbContext> options,
        IHttpContextAccessor httpContextAccessor,
        ILogger<TenantDbContext> logger)
        : base(options)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    // Add this property to track seeding state
    public bool IsSeeding { get; set; }

    public virtual DbSet<TbActividadComercial> ActividadComerciales { get; set; }

    public virtual DbSet<TbAuditoriaAccion> AuditoriaAccions { get; set; }

    public virtual DbSet<TbAuditoriaTabla> AuditoriaTablas { get; set; }

    public virtual DbSet<TbAuditoria> Auditoria { get; set; }

    public virtual DbSet<TbCiudad> Ciudades { get; set; }

    public virtual DbSet<TbCliente> Clientes { get; set; }

    public virtual DbSet<TbConfiguracion> Configuraciones { get; set; }

    public virtual DbSet<TbEmpresa> Empresas { get; set; }

    public virtual DbSet<TbEstadoCivil> EstadoCiviles { get; set; }

    public virtual DbSet<TbMoneda> Monedas { get; set; }

    public virtual DbSet<TbMunicipio> Municipios { get; set; }

    public virtual DbSet<TbNacionalidad> Nacionalidades { get; set; }

    public virtual DbSet<TbPais> Paises { get; set; }

    public virtual DbSet<TbParametro> Parametros { get; set; }

    public virtual DbSet<TbProvincia> Provincias { get; set; }

    public virtual DbSet<TbRuta> Rutas { get; set; }

    public virtual DbSet<TbSector> Sectores { get; set; }

    public virtual DbSet<TbSucursal> Sucursales { get; set; }

    public virtual DbSet<TbTipoCliente> TiposCliente { get; set; }

    public virtual DbSet<TbUsuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TbActividadComercial>(entity =>
        {
            entity.Property(e => e.FidActividadComercial).ValueGeneratedNever();
        });

        modelBuilder.Entity<TbAuditoriaAccion>(entity =>
        {
            entity.Property(e => e.FidAccion).ValueGeneratedNever();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbAuditoriaTabla>(entity =>
        {
            entity.HasKey(e => e.FidTabla).HasName("PK_tb_tablas");
            entity.Property(e => e.FidTabla).ValueGeneratedNever();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbAuditoria>(entity =>
        {
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbCiudad>(entity => { entity.Property(e => e.FidCiudad).ValueGeneratedNever(); });

        modelBuilder.Entity<TbCliente>(entity =>
        {
            entity.Property(e => e.FidCliente).ValueGeneratedNever();
            entity.Property(e => e.FtipoEntidad).IsFixedLength();
        });

        modelBuilder.Entity<TbConfiguracion>(entity =>
        {
            entity.Property(e => e.FidConfiguracion).ValueGeneratedNever();
            entity.Property(e => e.FimpresionDirecta).HasDefaultValue(true);
            entity.Property(e => e.FpantallaDetalleCobros).HasDefaultValue(true);
            entity.Property(e => e.FtipoItbis)
                .HasDefaultValue("I")
                .HasComment("Establece el tipo de ITBIS (S)sumado al precio (I)Incluido en el precio");
        });

        modelBuilder.Entity<TbEmpresa>(entity => { entity.Property(e => e.FidEmpresa).ValueGeneratedNever(); });

        modelBuilder.Entity<TbEstadoCivil>(entity =>
        {
            entity.Property(e => e.FidEstadoCivil).ValueGeneratedNever();
            entity.Property(e => e.Fsimbolo).IsFixedLength();
        });

        modelBuilder.Entity<TbMoneda>(entity =>
        {
            entity.Property(e => e.FidMoneda).ValueGeneratedNever();
            entity.Property(e => e.Fsimbolo).IsFixedLength();
        });

        modelBuilder.Entity<TbMunicipio>(entity => { entity.Property(e => e.FidMunicipio).ValueGeneratedNever(); });

        modelBuilder.Entity<TbNacionalidad>(entity =>
        {
            entity.Property(e => e.FidNacionalidad).ValueGeneratedNever();
        });

        modelBuilder.Entity<TbPais>(entity => { entity.Property(e => e.FidPais).ValueGeneratedNever(); });

        modelBuilder.Entity<TbParametro>(entity =>
        {
            entity.HasKey(e => e.FidParametro).HasName("PK_tb_parametros");
            entity.Property(e => e.FidParametro).ValueGeneratedNever();
            entity.Property(e => e.FformaPagoFecuente).HasDefaultValue(1);
            entity.Property(e => e.FlogoFactura).HasDefaultValue(true);
        });

        modelBuilder.Entity<TbProvincia>(entity => { entity.Property(e => e.FidProvincia).ValueGeneratedNever(); });

        modelBuilder.Entity<TbRuta>(entity =>
        {
            entity.Property(e => e.FidRuta).ValueGeneratedNever();
            entity.HasOne(d => d.FkidUsuarioNavigation).WithMany(p => p.TbRuta)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_ruta_tb_usuario");
        });

        modelBuilder.Entity<TbSector>(entity => { entity.Property(e => e.FidSector).ValueGeneratedNever(); });

        modelBuilder.Entity<TbSucursal>(entity => { entity.Property(e => e.FidSucursal).ValueGeneratedNever(); });

        modelBuilder.Entity<TbTipoCliente>(entity => { entity.Property(e => e.FidTipoCliente).ValueGeneratedNever(); });

        modelBuilder.Entity<TbUsuario>(entity =>
        {
            entity.Property(e => e.FidUsuario).ValueGeneratedNever();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("A")
                .IsFixedLength();
            entity.HasOne(d => d.FkidUsuarioNavigation).WithMany(p => p.InverseFkidUsuarioNavigation)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_usuario_tb_usuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = default)
    {
        // Saltar auditoría durante la inicialización de datos
        if (IsSeeding) return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);

        var auditorias = new List<TbAuditoria>();
        var (usuarioId, nombrePc) = await ObtenerDatosUsuarioActual();

        var entriesToAudit = ChangeTracker.Entries()
            .Where(e => e.State != EntityState.Unchanged &&
                        e.State != EntityState.Detached &&
                        !(e.Entity is TbAuditoria) &&
                        !(e.Entity is TbAuditoriaAccion) &&
                        !(e.Entity is TbAuditoriaTabla));

        foreach (var entrada in entriesToAudit)
        {
            var tablaId = ObtenerTablaId(entrada);
            var accionId = ObtenerAccionId(entrada.State);

            var auditoria = new TbAuditoria
            {
                FkidTabla = tablaId,
                FkidAccion = accionId,
                Ffecha = DateOnly.FromDateTime(DateTime.Now),
                Fhora = DateTime.Now.ToString("HH:mm:ss"),
                FkidUsuario = usuarioId,
                FkidRegistro = ObtenerIdRegistro(entrada),
                Fnombrepc = nombrePc,
                Fjustificacion = $"{TraducirEstadoEntidad(entrada.State)} en {entrada.Entity.GetType().Name}",
                FestadoSync = "S"
            };
            auditorias.Add(auditoria);
        }

        if (auditorias.Any())
        {
            // Verificar si ya existe una transacción activa
            var transaccionExistente = Database.CurrentTransaction != null;
            
            if (transaccionExistente)
            {
                // Si ya hay una transacción, usar la existente
                try
                {
                    var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    await Auditoria.AddRangeAsync(auditorias, cancellationToken);
                    await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    _logger?.LogInformation("✅ {Count} registros de auditoría guardados en Tenant (transacción existente)", auditorias.Count);
                    return result;
                }
                catch (Exception ex)
                {
                    _logger?.LogError(ex, "❌ Error guardando auditoría en tenant (transacción existente)");
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
                    await Auditoria.AddRangeAsync(auditorias, cancellationToken);
                    await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
                    await transaccion.CommitAsync(cancellationToken);
                    _logger?.LogInformation("✅ {Count} registros de auditoría guardados en Tenant (nueva transacción)", auditorias.Count);
                    return result;
                }
                catch (Exception ex)
                {
                    _logger?.LogError(ex, "❌ Error guardando auditoría en tenant (nueva transacción)");
                    await transaccion.RollbackAsync(cancellationToken);
                    throw;
                }
            }
        }

        return await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private string TraducirEstadoEntidad(EntityState estado)
    {
        return estado switch
        {
            EntityState.Added => "Creación",
            EntityState.Modified => "Modificación",
            EntityState.Deleted => "Eliminación",
            EntityState.Detached => "Desconectado",
            EntityState.Unchanged => "Sin cambios",
            _ => estado.ToString()
        };
    }

    private async Task<(int usuarioId, string nombrePc)> ObtenerDatosUsuarioActual()
    {
        var httpContext = _httpContextAccessor?.HttpContext;
        if (httpContext == null) return (0, Environment.MachineName);

        // Verificar si ya tenemos los datos almacenados en el contexto para esta solicitud
        if (httpContext.Items.TryGetValue("CurrentTenantUserData", out var cachedData))
            return ((int usuarioId, string nombrePc))cachedData;

        try
        {
            // Obtener el UserId del claim
            var userIdClaim = httpContext.User?.FindFirstValue("UserId");

            var userId = 0;
            if (!string.IsNullOrEmpty(userIdClaim) && int.TryParse(userIdClaim, out var parsedUserId))
                userId = parsedUserId;

            var nombrePc = httpContext.Connection?.RemoteIpAddress?.ToString() ?? Environment.MachineName;

            // Cachear el resultado para esta solicitud
            var result = (userId, nombrePc);
            httpContext.Items["CurrentTenantUserData"] = result;

            return result;
        }
        catch (Exception ex)
        {
            // Loggear error sin interrumpir el flujo
            _logger?.LogError(ex, "Error obteniendo datos de usuario en tenant");
            return (0, Environment.MachineName);
        }
    }

    private int ObtenerTablaId(EntityEntry entrada)
    {
        // Mapeo de nombres de entidades a IDs de tabla
        // Deberías ajustar estos IDs según tu tabla tb_auditoria_tabla
        var tablaNombre = entrada.Entity.GetType().Name;

        return tablaNombre switch
        {
            nameof(TbCliente) => 1,
            nameof(TbUsuario) => 2,
            nameof(TbEmpresa) => 3,
            nameof(TbSucursal) => 4,
            nameof(TbRuta) => 5,
            nameof(TbConfiguracion) => 6,
            nameof(TbParametro) => 7,
            _ => 0
        };
    }

    private int ObtenerAccionId(EntityState estado)
    {
        return estado switch
        {
            EntityState.Added => 1, // Creación
            EntityState.Modified => 2, // Modificación
            EntityState.Deleted => 3, // Eliminación
            _ => 0
        };
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
                    return propClave.CurrentValue switch
                    {
                        int intValue => intValue,
                        long longValue => (int)longValue,
                        string strValue when int.TryParse(strValue, out var parsedInt) => parsedInt,
                        Guid guidValue => Math.Abs(guidValue.GetHashCode()),
                        _ => 0
                    };
            }

            // 2. Para entidades nuevas, generamos un ID temporal
            if (entrada.State == EntityState.Added)
            {
                if (_httpContextAccessor?.HttpContext == null) return -1;

                if (!_httpContextAccessor.HttpContext.Items.ContainsKey("TenantTempIdCounter"))
                    _httpContextAccessor.HttpContext.Items["TenantTempIdCounter"] = -1;

                var counter = (int)_httpContextAccessor.HttpContext.Items["TenantTempIdCounter"]!;
                counter--;
                _httpContextAccessor.HttpContext.Items["TenantTempIdCounter"] = counter;

                return counter;
            }

            return 0;
        }
        catch (Exception ex)
        {
            _logger?.LogError(ex, "Error al obtener ID de registro para auditoría en tenant");
            return 0;
        }
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}