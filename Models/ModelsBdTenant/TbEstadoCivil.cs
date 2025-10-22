using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_estado_civil")]
public class TbEstadoCivil
{
    [Key] [Column("fid_estado_civil")] public int FidEstadoCivil { get; set; }

    [Column("festado_civil")]
    [StringLength(12)]
    [Unicode(false)]
    public string FestadoCivil { get; set; } = null!;

    [Column("fsimbolo")] [StringLength(1)] public string? Fsimbolo { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }
}