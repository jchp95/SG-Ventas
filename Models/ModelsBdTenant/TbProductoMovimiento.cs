using System;

namespace Models.ModelsBdTenant
{
    public class TbProductoMovimiento
    {
        public int FidMovimiento { get; set; }
        public decimal FcantEntrada { get; set; }
        public decimal FcantSalida { get; set; }
        public decimal Fexistencia => FcantEntrada - FcantSalida;
        public DateTime FfechaEntrada { get; set; }
        public DateTime FfechaVencimiento { get; set; }
        public bool Factivo { get; set; }
        // Relaciones
        public int FkidCompra { get; set; }
        public int FkidProducto { get; set; }
    }
}
