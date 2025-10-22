using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_tipo_cliente")]
public class TbTipoCliente
{
    [Key] [Column("fid_tipo_cliente")] public int FidTipoCliente { get; set; }

    [Column("ftipo_cliente")]
    [StringLength(20)]
    [Unicode(false)]
    public string FtipoCliente { get; set; } = null!;
}