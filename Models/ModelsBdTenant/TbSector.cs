using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_sector")]
public class TbSector
{
    [Key] [Column("fid_sector")] public int FidSector { get; set; }

    [Column("fsector")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fsector { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }
}