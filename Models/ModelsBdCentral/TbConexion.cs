using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace ventas.Models.ModelsBdCentral;

[Table("tb_empresa")]
[UsedImplicitly]
public class TbConexion
{
    [Key] [Column("conexion")] public int FidConexion { get; set; }

    [Column("fnombre_bd", TypeName = "varchar(50)")]
    public string FnombreBd { get; set; } = null!;
}