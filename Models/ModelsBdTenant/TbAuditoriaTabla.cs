using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_auditoria_tabla")]
public class TbAuditoriaTabla
{
    [Key] [Column("fid_tabla")] public int FidTabla { get; set; }

    [Column("ftabla")]
    [StringLength(50)]
    [Unicode(false)]
    public string Ftabla { get; set; } = null!;

    [Column("festado_sync")]
    [StringLength(1)]
    [Unicode(false)]
    public string FestadoSync { get; set; } = null!;
}