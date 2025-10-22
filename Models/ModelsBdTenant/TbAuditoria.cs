using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

public class TbAuditoria
{
    [Key] [Column("fid")] public int Fid { get; set; }

    [Column("fnombrepc")]
    [StringLength(50)]
    [Unicode(false)]
    public string Fnombrepc { get; set; } = null!;

    [Column("fkid_tabla")] public int FkidTabla { get; set; }

    [Column("fkid_registro")] public int FkidRegistro { get; set; }

    [Column("ffecha")] public DateOnly Ffecha { get; set; }

    [Column("fhora")]
    [StringLength(16)]
    [Unicode(false)]
    public string Fhora { get; set; } = null!;

    [Column("fkid_accion")] public int FkidAccion { get; set; }

    [Column("fjustificacion")]
    [StringLength(150)]
    [Unicode(false)]
    public string Fjustificacion { get; set; } = null!;

    [Column("fkid_usuario")] public int FkidUsuario { get; set; }

    [Column("festado_sync")]
    [StringLength(1)]
    [Unicode(false)]
    public string FestadoSync { get; set; } = null!;
}