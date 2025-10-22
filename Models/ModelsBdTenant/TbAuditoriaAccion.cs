using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_auditoria_accion")]
public class TbAuditoriaAccion
{
    [Key] [Column("fid_accion")] public int FidAccion { get; set; }

    [Column("faccion")]
    [StringLength(50)]
    [Unicode(false)]
    public string Faccion { get; set; } = null!;

    [Column("festado_sync")]
    [StringLength(1)]
    [Unicode(false)]
    public string FestadoSync { get; set; } = null!;
}