using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_parametro")]
public class TbParametro
{
    [Key] [Column("fid_parametro")] public int FidParametro { get; set; }

    [Column("fdias_gracia")] public int FdiasGracia { get; set; }

    [Column("flogo_factura")] public bool FlogoFactura { get; set; }

    [Column("fcod_qr_factura")] public bool FcodQrFactura { get; set; }

    [Column("fporcentaje_ganancia", TypeName = "decimal(18, 2)")]
    public decimal FporcentajeGanancia { get; set; }

    [Column("fforma_pago_fecuente")] public int FformaPagoFecuente { get; set; }
}