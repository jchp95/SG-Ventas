using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace ventas.Models.ModelsBdCentral;

[Table("tb_usuario_central")]
[UsedImplicitly]
public class TbUsuarioCentral
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("fid_usuario")]
    public int FidUsuario { get; set; }

    [Column("identity_id", TypeName = "varchar(450)")]
    [ForeignKey("Id")]
    public string? IdentityId { get; set; }

    [Column("fnombre", TypeName = "varchar(100)")]
    public string Fnombre { get; set; } = null!;

    [Column("fnombre_usuario", TypeName = "varchar(20)")]
    public string FnombreUsuario { get; set; } = null!;

    [Column("fnivel")] public int Fnivel { get; set; }

    [Column("fpassword")] public string Fpassword { get; set; } = null!;

    [EmailAddress]
    [Column("femail", TypeName = "varchar(100)")]
    public string Femail { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }

    [Column("fkid_empresa")] public int FkidEmpresa { get; set; }
}