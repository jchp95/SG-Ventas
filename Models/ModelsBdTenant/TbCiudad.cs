using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_ciudad")]
public class TbCiudad
{
    [Key] [Column("fid_ciudad")] public int FidCiudad { get; set; }

    [Column("fciudad")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fciudad { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }
}