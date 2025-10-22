using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_actividad_comercial")]
public class TbActividadComercial
{
    [Key]
    [Column("fid_actividad_comercial")]
    public int FidActividadComercial { get; set; }

    [Column("factividad_comercial")]
    [StringLength(250)]
    [Unicode(false)]
    public string FactividadComercial { get; set; } = null!;

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }
}