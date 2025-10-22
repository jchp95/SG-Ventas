using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_empresa")]
public class TbEmpresa
{
    [Key] [Column("fid_empresa")] public int FidEmpresa { get; set; }

    [Column("frnc", TypeName = "varchar(18)")]
    public string Frnc { get; set; } = null!;

    [Column("fnombre_comercial", TypeName = "varchar(250)")]
    public string FnombreComercial { get; set; } = null!;

    [Column("frazon_social", TypeName = "varchar(250)")]
    public string? FrazonSocial { get; set; }

    [Column("fdireccion", TypeName = "varchar(250)")]
    public string Fdireccion { get; set; } = null!;

    [Column("fmunicipio", TypeName = "varchar(250)")]
    public string? Fmunicipio { get; set; }

    [Column("fprovincia", TypeName = "varchar(250)")]
    public string? Fprovincia { get; set; }

    [Column("fcodmunicipio", TypeName = "varchar(6)")]
    public string? FcodMunicipio { get; set; }

    [Column("fcodProvincia", TypeName = "varchar(6)")]
    public string? FcodProvincia { get; set; }

    [Column("ftelefonos", TypeName = "varchar(14)")]
    public string Ftelefonos { get; set; } = null!;

    [Column("festlogan", TypeName = "varchar(250)")]
    public string Festlogan { get; set; } = null!;

    [Column("flogo")] public byte[]? Flogo { get; set; }

    [Column("ffondo")] public byte[]? Ffondo { get; set; }

    [Column("fcodigoqr_web")] public byte[]? FcodigoqrWeb { get; set; }

    [Column("fcodigoqr_redes")] public byte[]? FcodigoqrRedes { get; set; }

    [Column("femail", TypeName = "varchar(50)")]
    public string Femail { get; set; } = null!;

    [Column("fcontraseña", TypeName = "varchar(100)")]
    public string Fcontrasena { get; set; } = null!;

    [Column("fnombre_certificado", TypeName = "varchar(250)")]
    public string? FnombreCertificado { get; set; }

    [Column("fruta_certificado", TypeName = "varchar(250)")]
    public string? FrutaCertificado { get; set; }

    [Column("fpassword_certificado", TypeName = "varchar(250)")]
    public string? FpasswordCertificado { get; set; }

    [Column("fruta_xml", TypeName = "varchar(250)")]
    public string? FrutaXml { get; set; }

    [Column("fruta_xml_firmado", TypeName = "varchar(250)")]
    public string? FrutaXmlFirmado { get; set; }

    [Column("fruta_semilla", TypeName = "varchar(250)")]
    public string? FrutaSemilla { get; set; }

    [Column("fruta_semilla_firmado", TypeName = "varchar(250)")]
    public string? FrutaSemillaFirmado { get; set; }
}