using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_ruta")]
public class TbRuta
{
    [Key] [Column("fid_ruta")] public int FidRuta { get; set; }

    [Column("fnombre")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fnombre { get; set; } = null!;

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }

    [ForeignKey("FkidUsuario")]
    [InverseProperty("TbRuta")]
    public virtual TbUsuario FkidUsuarioNavigation { get; set; } = null!;
}