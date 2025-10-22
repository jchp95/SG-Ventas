using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_provincia")]
public class TbProvincia
{
    [Key] [Column("fid_provincia")] public int FidProvincia { get; set; }

    [Column("fprovincia")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fprovincia { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }
}