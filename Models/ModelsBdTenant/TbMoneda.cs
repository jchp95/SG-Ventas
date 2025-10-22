using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_moneda")]
public class TbMoneda
{
    [Key] [Column("fid_moneda")] public int FidMoneda { get; set; }

    [Column("fmoneda")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Fmoneda { get; set; }

    [Column("factivo")] public bool? Factivo { get; set; }

    [Column("fsimbolo")]
    [StringLength(10)]
    [Unicode(false)]
    public string? Fsimbolo { get; set; }
}