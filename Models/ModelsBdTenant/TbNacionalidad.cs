using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_nacionalidad")]
public class TbNacionalidad
{
    [Key] [Column("fid_nacionalidad")] public int FidNacionalidad { get; set; }

    [Column("fnacionalidad")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fnacionalidad { get; set; } = null!;
}