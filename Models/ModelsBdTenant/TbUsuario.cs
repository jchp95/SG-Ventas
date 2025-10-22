using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_usuario")]
public class TbUsuario
{
    [Key] [Column("fid_usuario")] public int FidUsuario { get; set; }

    [Column("fnombre")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fnombre { get; set; } = null!;

    [Column("fusuario")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fusuario { get; set; } = null!;

    [Column("fnivel")] public int Fnivel { get; set; }

    [Column("fpassword")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fpassword { get; set; } = null!;

    [Column("factivado")] public bool Factivado { get; set; }

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("fkid_sucursal")] public int FkidSucursal { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }

    [Column("festado_sync")]
    [StringLength(1)]
    [Unicode(false)]
    public string FestadoSync { get; set; } = null!;

    [InverseProperty("FkidUsuarioNavigation")]
    public virtual ICollection<TbUsuario> InverseFkidUsuarioNavigation { get; set; } = new List<TbUsuario>();

    [ForeignKey("FkidUsuario")]
    [InverseProperty("InverseFkidUsuarioNavigation")]
    public virtual TbUsuario FkidUsuarioNavigation { get; set; } = null!;

    [InverseProperty("FkidUsuarioNavigation")]
    public virtual ICollection<TbRuta> TbRuta { get; set; } = new List<TbRuta>();
}