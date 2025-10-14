using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ventas.Models.ModelsBdCentral;

[Table("tb_auditoria")]
public class TbAuditoria
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("fid_auditoria")]
    public int FidAuditoria { get; set; }

    [ForeignKey("FidUsuario")]
    [Column("fkid_usuario")]
    public int FkidUsuario { get; set; }

    [Column("fkid_registro")] public int FkidRegistro { get; set; }

    [Column("ftabla", TypeName = "varchar(50)")]
    public string Ftabla { get; set; } = null!;

    [Column("ffecha", TypeName = "Date")] public DateTime Ffecha { get; set; }

    [Column("fhora")] public string Fhora { get; set; } = null!;

    [Column("faccion", TypeName = "varchar(50)")]
    public string Faccion { get; set; } = null!;
}