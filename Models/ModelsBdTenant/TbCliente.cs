using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_cliente")]
public class TbCliente
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("fid_cliente")]
    public int FidCliente { get; set; }

    [Column("fnumero_cliente")] public int? FnumeroCliente { get; set; }

    [Column("fcedula_rnc")]
    [StringLength(20)]
    [Unicode(false)]
    public string? FcedulaRnc { get; set; }

    [Column("fnombre")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Fnombre { get; set; }

    [Column("ftelefono")]
    [StringLength(14)]
    [Unicode(false)]
    public string? Ftelefono { get; set; }

    [Column("fcelular")]
    [StringLength(14)]
    [Unicode(false)]
    public string? Fcelular { get; set; }

    [Column("fdireccion")]
    [StringLength(400)]
    [Unicode(false)]
    public string? Fdireccion { get; set; }

    [Column("ffecha_nacimiento")] public DateOnly FfechaNacimiento { get; set; }

    [Column("fkid_ruta")]
    public int FkidRuta { get; set; }

    [Column("ftipo_entidad")]
    [StringLength(1)]
    public string FtipoEntidad { get; set; } = null!;

    [Column("fcalle")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Fcalle { get; set; }

    [Column("flimite_credito", TypeName = "decimal(18, 2)")]
    public decimal FlimiteCredito { get; set; }

    [Column("fdir_foto")]
    [StringLength(50)]
    [Unicode(false)]
    public string FdirFoto { get; set; } = null!;

    [Column("fubicaciongps")]
    [StringLength(255)]
    [Unicode(false)]
    public string Fubicaciongps { get; set; } = null!;

    [Column("fkid_estado_civil")] public int FkidEstadoCivil { get; set; }

    [Column("fkid_sector")] public int FkidSector { get; set; }

    [Column("fkid_municipio")] public int FkidMunicipio { get; set; }

    [Column("fkid_ciudad")] public int FkidCiudad { get; set; }

    [Column("fkid_provincia")] public int FkidProvincia { get; set; }

    [Column("fkid_pais")] public int FkidPais { get; set; }

    [Column("fkid_nacionalidad")] public int FkidNacionalidad { get; set; }

    [Column("fkid_tipo_cliente")] public int FkidTipoCliente { get; set; }

    [Column("fkid_actividad_comercial")] public int FkidActividadComercial { get; set; }

    [Column("fkid_moneda")] public int FkidMoneda { get; set; }

    [Column("fkid_empresa")] public int FkidEmpresa { get; set; } // Ahora BD CENTRAL

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }
}