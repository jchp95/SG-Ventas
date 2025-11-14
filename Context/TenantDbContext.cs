using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models.ModelsBdTenant;
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
    public virtual DbSet<TbAlmacen> Almacenes { get; set; }
    public virtual DbSet<TbAlmacenMovimiento> AlmacenMovimientos { get; set; }
    public virtual DbSet<TbInventarioAjuste> InventarioAjustes { get; set; }
    public virtual DbSet<TbProducto> Productos { get; set; }
    public virtual DbSet<TbProductoCategoria> ProductoCategorias { get; set; }
    public virtual DbSet<TbProductoDescuento> ProductoDescuentos { get; set; }
    public virtual DbSet<TbProductoMarca> ProductoMarcas { get; set; }
    public virtual DbSet<TbProductoMovimiento> ProductoMovimientos { get; set; }
    public virtual DbSet<TbProductoUbicacion> ProductoUbicaciones { get; set; }
    public virtual DbSet<TbSuplidor> Suplidores { get; set; }
    public virtual DbSet<TbTiposItbis> TiposItbis { get; set; }
    public virtual DbSet<TbUbicacion> Ubicaciones { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TbActividadComercial>(entity =>
        {
            entity.HasKey(e => e.FidActividadComercial).HasName("PK_tb_actividad_comercial");
            entity.Property(e => e.FidActividadComercial).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbAuditoriaAccion>(entity =>
        {
            entity.HasKey(e => e.FidAccion).HasName("PK_tb_auditoria_accion");
            entity.Property(e => e.FidAccion).ValueGeneratedOnAdd();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbAuditoriaTabla>(entity =>
        {
            entity.HasKey(e => e.FidTabla).HasName("PK_tb_tablas");
            entity.Property(e => e.FidTabla).ValueGeneratedOnAdd();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbAuditoria>(entity =>
        {
            entity.HasKey(e => e.Fid).HasName("PK_tb_auditoria");
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("S")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbCiudad>(entity => {
            entity.HasKey(e => e.FidCiudad).HasName("PK_tb_ciudad");
            entity.Property(e => e.FidCiudad).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbCliente>(entity =>
        {
            entity.HasKey(e => e.FidCliente).HasName("PK_tb_cliente");
            entity.Property(e => e.FidCliente).ValueGeneratedOnAdd();
            entity.Property(e => e.FtipoEntidad).IsFixedLength();
        });

        modelBuilder.Entity<TbConfiguracion>(entity =>
        {
            entity.HasKey(e => e.FidConfiguracion).HasName("PK_tb_configuracion");
            entity.Property(e => e.FidConfiguracion).ValueGeneratedOnAdd();
            entity.Property(e => e.FimpresionDirecta).HasDefaultValue(true);
            entity.Property(e => e.FpantallaDetalleCobros).HasDefaultValue(true);
            entity.Property(e => e.FtipoItbis)
                .HasDefaultValue("I")
                .HasComment("Establece el tipo de ITBIS (S)sumado al precio (I)Incluido en el precio");
        });

        modelBuilder.Entity<TbEmpresa>(entity => {
            entity.HasKey(e => e.FidEmpresa).HasName("PK_tb_empresa");
            entity.Property(e => e.FidEmpresa).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbEstadoCivil>(entity =>
        {
            entity.HasKey(e => e.FidEstadoCivil).HasName("PK_tb_estado_civil");
            entity.Property(e => e.FidEstadoCivil).ValueGeneratedOnAdd();
            entity.Property(e => e.Fsimbolo).IsFixedLength();
        });

        modelBuilder.Entity<TbMoneda>(entity =>
        {
            entity.HasKey(e => e.FidMoneda).HasName("PK_tb_moneda");
            entity.Property(e => e.FidMoneda).ValueGeneratedOnAdd();
            entity.Property(e => e.Fsimbolo).IsFixedLength();
        });

        modelBuilder.Entity<TbMunicipio>(entity => {
            entity.HasKey(e => e.FidMunicipio).HasName("PK_tb_municipio");
            entity.Property(e => e.FidMunicipio).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbNacionalidad>(entity =>
        {
            entity.HasKey(e => e.FidNacionalidad).HasName("PK_tb_nacionalidad");
            entity.Property(e => e.FidNacionalidad).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbPais>(entity => {
            entity.HasKey(e => e.FidPais).HasName("PK_tb_pais");
            entity.Property(e => e.FidPais).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbParametro>(entity =>
        {
            entity.HasKey(e => e.FidParametro).HasName("PK_tb_parametros");
            entity.Property(e => e.FidParametro).ValueGeneratedOnAdd();
            entity.Property(e => e.FformaPagoFecuente).HasDefaultValue(1);
            entity.Property(e => e.FlogoFactura).HasDefaultValue(true);
        });

        modelBuilder.Entity<TbProvincia>(entity => {
            entity.HasKey(e => e.FidProvincia).HasName("PK_tb_provincia");
            entity.Property(e => e.FidProvincia).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbRuta>(entity =>
        {
            entity.HasKey(e => e.FidRuta).HasName("PK_tb_ruta");
            entity.Property(e => e.FidRuta).ValueGeneratedOnAdd();
            entity.HasOne<TbUsuario>()
                .WithMany()
                .HasForeignKey(e => e.FkidUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_ruta_tb_usuario");
        });

        modelBuilder.Entity<TbSector>(entity => {
            entity.HasKey(e => e.FidSector).HasName("PK_tb_sector");
            entity.Property(e => e.FidSector).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbSucursal>(entity => {
            entity.HasKey(e => e.FidSucursal).HasName("PK_tb_sucursal");
            entity.Property(e => e.FidSucursal).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbTipoCliente>(entity => {
            entity.HasKey(e => e.FidTipoCliente).HasName("PK_tb_tipo_cliente");
            entity.Property(e => e.FidTipoCliente).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<TbUsuario>(entity =>
        {
            entity.HasKey(e => e.FidUsuario).HasName("PK_tb_usuario");
            entity.Property(e => e.FidUsuario).ValueGeneratedOnAdd();
            entity.Property(e => e.FestadoSync)
                .HasDefaultValue("A")
                .IsFixedLength();
        });

        modelBuilder.Entity<TbAlmacen>(entity =>
        {
            entity.HasKey(e => e.FidAlmacen).HasName("PK_tb_almacen");
            entity.Property(e => e.FidAlmacen).ValueGeneratedOnAdd();
            entity.Property(e => e.Fnombre)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Fubicacion)
                .IsRequired()
                .HasMaxLength(200);
        });

        modelBuilder.Entity<TbAlmacenMovimiento>(entity =>
        {
            entity.HasKey(e => e.Fid).HasName("PK_tb_almacen_movimiento");
            entity.Property(e => e.Fid).ValueGeneratedOnAdd();
            entity.Property(e => e.Fmotivo).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Fcantidad).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Ffecha).HasColumnType("datetime");
            entity.Property(e => e.Fhora).HasMaxLength(10);
            entity.Property(e => e.Factivo).HasDefaultValue(1);
            entity.Property(e => e.FkidOrigen).IsRequired();
            entity.Property(e => e.FkidDestino).IsRequired();
            entity.Property(e => e.FkidUsuario).IsRequired();
            entity.HasOne<TbAlmacen>()
                .WithMany()
                .HasForeignKey(e => e.FkidOrigen)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_almacen_movimiento_tb_almacen_origen");
            entity.HasOne<TbAlmacen>()
                .WithMany()
                .HasForeignKey(e => e.FkidDestino)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_almacen_movimiento_tb_almacen_destino");
            entity.HasOne<TbUsuario>()
                .WithMany()
                .HasForeignKey(e => e.FkidUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_almacen_movimiento_tb_usuario");
        });

        modelBuilder.Entity<TbInventarioAjuste>(entity =>
        {
            entity.HasKey(e => e.FidAjuste).HasName("PK_tb_inventario_ajuste");
            entity.Property(e => e.FidAjuste).ValueGeneratedOnAdd();
            entity.Property(e => e.Ffecha).HasColumnType("datetime");
            entity.Property(e => e.Fhora).HasMaxLength(10);
            entity.Property(e => e.FtipoMovimiento).HasMaxLength(50);
            entity.Property(e => e.Fcantidad).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Fmotivo).HasMaxLength(200);
            entity.Property(e => e.FkidUsuario).IsRequired(false);
            entity.Property(e => e.FkidProducto).IsRequired(false);
            entity.Property(e => e.FkidUnidad).IsRequired(false);
            entity.HasOne<TbUsuario>()
                 .WithMany()
                 .HasForeignKey(e => e.FkidUsuario)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_tb_inventario_ajuste_tb_usuario");
            entity.HasOne<TbProducto>()
                 .WithMany()
                 .HasForeignKey(e => e.FkidProducto)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_tb_inventario_ajuste_tb_producto");
            // entity.HasOne<TbUnidad>()
            //     .WithMany()
            //     .HasForeignKey(e => e.FkidUnidad)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("FK_tb_inventario_ajuste_tb_unidad");
        });

        modelBuilder.Entity<TbProducto>(entity =>
        {
            entity.HasKey(e => e.FidProducto).HasName("PK_tb_producto");
            entity.Property(e => e.FidProducto).ValueGeneratedOnAdd();
            entity.Property(e => e.Fdescripcion).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Fcosto).HasColumnType("decimal(18,2)");
            entity.Property(e => e.FprecioCompra).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Fprecio).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Freorden).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Fexistencia).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Ftipo).IsRequired();
            entity.Property(e => e.FcodigoBarra).HasMaxLength(50);
            entity.Property(e => e.FcodigoReferencia).HasMaxLength(50);
            entity.Property(e => e.FcodigoLetras).HasMaxLength(20);
            entity.Property(e => e.FcodbarSuplidor).HasMaxLength(50);
            entity.Property(e => e.FcostoLetra).HasMaxLength(20);
            entity.Property(e => e.Fprecio2).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Fprecio3).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Fprecio4).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Festatus).HasMaxLength(2).HasDefaultValue("A");
            entity.Property(e => e.FrutaImagen).HasMaxLength(200);
            entity.Property(e => e.FventaFrecuente).HasDefaultValue(false);
            entity.Property(e => e.Fnota).HasMaxLength(500);
            entity.Property(e => e.Factivo).HasDefaultValue(true);
            entity.Property(e => e.FkidMarca).IsRequired();
            entity.Property(e => e.FkidCategoria).IsRequired();
            entity.Property(e => e.FkidItbis).IsRequired();
            entity.Property(e => e.FkidUsuario).IsRequired();
            entity.HasOne<TbTiposItbis>()
                 .WithMany()
                 .HasForeignKey(e => e.FkidItbis)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_tb_producto_tb_tipos_itbis");
            entity.HasOne<TbUsuario>()
                 .WithMany()
                 .HasForeignKey(e => e.FkidUsuario)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_tb_producto_tb_usuario");
        });

        modelBuilder.Entity<TbProductoCategoria>(entity =>
        {
            entity.HasKey(e => e.FidCategoria).HasName("PK_tb_producto_categoria");
            entity.Property(e => e.FidCategoria).ValueGeneratedOnAdd();
            entity.Property(e => e.Fcategoria).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Factivo).HasDefaultValue(true);
        });

        modelBuilder.Entity<TbProductoDescuento>(entity =>
        {
            entity.HasKey(e => e.FidDescuento).HasName("PK_tb_producto_descuento");
            entity.Property(e => e.FidDescuento).ValueGeneratedOnAdd();
            entity.Property(e => e.Fdescuento).HasColumnType("decimal(18,2)");
            entity.Property(e => e.FfechaInicio).HasColumnType("datetime");
            entity.Property(e => e.FfechaVence).HasColumnType("datetime");
            entity.Property(e => e.Ffecha).HasColumnType("datetime");
            entity.Property(e => e.Fhora).HasMaxLength(10);
            entity.Property(e => e.FestadoSync).HasMaxLength(2).HasDefaultValue("S");
            entity.Property(e => e.FkidUsuario).IsRequired();
            entity.Property(e => e.FkidProducto).IsRequired();
            entity.HasOne<TbProducto>()
                .WithMany()
                .HasForeignKey(e => e.FkidProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_producto_descuento_tb_producto");
            entity.HasOne<TbUsuario>()
                .WithMany()
                .HasForeignKey(e => e.FkidUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_producto_descuento_tb_usuario");
        });

        modelBuilder.Entity<TbProductoMarca>(entity =>
        {
            entity.HasKey(e => e.FidMarca).HasName("PK_tb_producto_marca");
            entity.Property(e => e.FidMarca).ValueGeneratedOnAdd();
            entity.Property(e => e.Fmarca).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Factivo).HasDefaultValue(true);
        });

        modelBuilder.Entity<TbProductoMovimiento>(entity =>
        {
            entity.HasKey(e => e.FidMovimiento).HasName("PK_tb_producto_movimiento");
            entity.Property(e => e.FidMovimiento).ValueGeneratedOnAdd();
            entity.Property(e => e.FcantEntrada).HasColumnType("decimal(18,2)");
            entity.Property(e => e.FcantSalida).HasColumnType("decimal(18,2)");
            entity.Property(e => e.FfechaEntrada).HasColumnType("datetime");
            entity.Property(e => e.FfechaVencimiento).HasColumnType("datetime");
            entity.Property(e => e.Factivo).HasDefaultValue(true);
            entity.Property(e => e.FkidCompra).IsRequired();
            entity.Property(e => e.FkidProducto).IsRequired();
            entity.HasOne<TbProducto>()
                .WithMany()
                .HasForeignKey(e => e.FkidProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_producto_movimiento_tb_producto");
            // Si tienes la entidad TbCompra, puedes agregar la relación:
            // entity.HasOne<TbCompra>()
            //     .WithMany()
            //     .HasForeignKey(e => e.FkidCompra)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("FK_tb_producto_movimiento_tb_compra");
        });

        modelBuilder.Entity<TbProductoUbicacion>(entity =>
        {
            entity.HasKey(e => e.FidProdUbicacion).HasName("PK_tb_producto_ubicacion");
            entity.Property(e => e.FidProdUbicacion).ValueGeneratedOnAdd();
            entity.Property(e => e.FkidProducto).IsRequired().HasMaxLength(50);
            entity.Property(e => e.FkidUbicacion).IsRequired();
            entity.HasOne<TbProducto>()
                .WithMany()
                .HasForeignKey(e => e.FkidProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_producto_ubicacion_tb_producto");
            entity.HasOne<TbUbicacion>()
                .WithMany()
                .HasForeignKey(e => e.FkidUbicacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_producto_ubicacion_tb_ubicacion");
        });

        modelBuilder.Entity<TbSuplidor>(entity =>
        {
            entity.HasKey(e => e.FidSuplidor).HasName("PK_tb_suplidor");
            entity.Property(e => e.FidSuplidor).ValueGeneratedOnAdd();
            entity.Property(e => e.Fnombre).IsRequired();
            entity.Property(e => e.FcedulaRnc).HasMaxLength(20);
            entity.Property(e => e.Fdireccion).HasMaxLength(200);
            entity.Property(e => e.Ftelefono).HasMaxLength(20);
            entity.Property(e => e.Fcelular).HasMaxLength(20);
            entity.Property(e => e.Femail).HasMaxLength(100);
            entity.Property(e => e.Fcontacto).HasMaxLength(100);
            entity.Property(e => e.FtelContacto).HasMaxLength(20);
            entity.Property(e => e.FtipoServicio).HasMaxLength(100);
            entity.Property(e => e.Ffecha).HasColumnType("datetime");
            entity.Property(e => e.Factivo).HasDefaultValue(true);
            entity.Property(e => e.FkidUsuario).IsRequired();
            entity.HasOne<TbUsuario>()
                .WithMany()
                .HasForeignKey(e => e.FkidUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tb_suplidor_tb_usuario");
        });

        modelBuilder.Entity<TbTiposItbis>(entity =>
        {
            entity.HasKey(e => e.FidItbis).HasName("PK_tb_tipos_itbis");
            entity.Property(e => e.FidItbis).ValueGeneratedOnAdd();
            entity.Property(e => e.Fdescripcion).IsRequired();
            entity.Property(e => e.FtasaItbis).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<TbUbicacion>(entity =>
        {
            entity.HasKey(e => e.FidUbicacion).HasName("PK_tb_ubicacion");
            entity.Property(e => e.FidUbicacion).ValueGeneratedOnAdd();
            entity.Property(e => e.Fubicacion).IsRequired();
            entity.Property(e => e.Factivo).HasDefaultValue(true);
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