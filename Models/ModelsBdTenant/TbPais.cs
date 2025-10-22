using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_pais")]
public class TbPais
{
    [Key] [Column("fid_pais")] public int FidPais { get; set; }

    [Column("fpais")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fpais { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }
}