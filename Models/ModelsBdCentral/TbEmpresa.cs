using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace ventas.Models.ModelsBdCentral;

[Table("tb_empresa")]
[UsedImplicitly]
public class TbEmpresa
{
    [Key] [Column("fid_empresa")] public int FidEmpresa { get; set; }

    [Column("fnombre_empresa", TypeName = "varchar(50)")]
    public string FnombreEmpresa { get; set; } = null!;

    [Column("frnc", TypeName = "varchar(20)")]
    public string Frnc { get; set; } = null!;

    [Column("femail", TypeName = "varchar(100)")]
    public string Femail { get; set; } = null!;

    [Column("flogo", TypeName = "varchar(500)")]
    public string Flogo { get; set; } = null!;

    [Column("feslogan", TypeName = "varchar(100)")]
    public string Feslogan { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }

    [Column("fkid_conexion")] public int FkidConexion { get; set; }
}