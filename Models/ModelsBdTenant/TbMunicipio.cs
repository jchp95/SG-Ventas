using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_municipio")]
public class TbMunicipio
{
    [Key] [Column("fid_municipio")] public int FidMunicipio { get; set; }

    [Column("fmunicipio")]
    [StringLength(100)]
    [Unicode(false)]
    public string Fmunicipio { get; set; } = null!;

    [Column("factivo")] public bool Factivo { get; set; }
}