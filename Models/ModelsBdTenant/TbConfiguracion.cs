using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ventas.Models.ModelsBdTenant;

[Table("tb_configuracion")]
public class TbConfiguracion
{
    [Key] [Column("fid_configuracion")] public int FidConfiguracion { get; set; }

    /// <summary>
    ///     Establece el tipo de ITBIS (S)sumado al precio (I)Incluido en el precio
    /// </summary>
    [Column("ftipo_itbis")]
    [StringLength(1)]
    [Unicode(false)]
    public string FtipoItbis { get; set; } = null!;

    [Column("fpantalla_detalle_cobros")] public bool FpantallaDetalleCobros { get; set; }

    [Column("fimpresion_directa")] public bool FimpresionDirecta { get; set; }

    [Column("fduplicado_factura")] public bool FduplicadoFactura { get; set; }

    [Column("facturacion_electronica")] public bool FacturacionElectronica { get; set; }

    [Column("furl_obtener_semilla")]
    [StringLength(250)]
    [Unicode(false)]
    public string FurlObtenerSemilla { get; set; } = null!;

    [Column("furl_validar_semilla")]
    [StringLength(250)]
    [Unicode(false)]
    public string FurlValidarSemilla { get; set; } = null!;

    [Column("furl_envio_ncf")]
    [StringLength(250)]
    [Unicode(false)]
    public string FurlEnvioNcf { get; set; } = null!;

    [Column("furl_envio_resumen")]
    [StringLength(250)]
    [Unicode(false)]
    public string FurlEnvioResumen { get; set; } = null!;
}