using Microsoft.EntityFrameworkCore;
using ventas.Models.ModelsBdTenant;

namespace ventas.Context;

public partial class TenantDbContext : DbContext
{
    public TenantDbContext()
    {
    }

    public TenantDbContext(DbContextOptions<TenantDbContext> options)
        : base(options)
    {
    }

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

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}