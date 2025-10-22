using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_sucursal")]
public class TbSucursal
{
    [Key] [Column("fid_sucursal")] public int FidSucursal { get; set; }

    [Column("fsucursal")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fsucursal { get; set; } = null!;

    [Column("fnumero_sucursal")] public int FnumeroSucursal { get; set; }

    [Column("ftelefono")]
    [StringLength(14)]
    [Unicode(false)]
    public string Ftelefono { get; set; } = null!;

    [Column("fdireccion")]
    [StringLength(250)]
    [Unicode(false)]
    public string Fdireccion { get; set; } = null!;

    [Column("fencargado")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fencargado { get; set; } = null!;

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("fkid_empresa")] public int FkidEmpresa { get; set; }

    [Column("factivo")] public bool Factivo { get; set; }
}