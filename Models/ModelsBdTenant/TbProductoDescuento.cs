using System;

namespace Models.ModelsBdTenant
{
    public class TbProductoDescuento
    {
        public int FidDescuento { get; set; }
       
        public decimal Fdescuento { get; set; }
        public DateTime FfechaInicio { get; set; }
        public DateTime FfechaVence { get; set; }
        public DateTime Ffecha { get; set; }
        public string Fhora { get; set; } = string.Empty;
        public string FestadoSync { get; set; } = string.Empty;

        //Relaciones
        public int FkidUsuario { get; set; }
        public int FkidProducto { get; set; }
       
    }
}
