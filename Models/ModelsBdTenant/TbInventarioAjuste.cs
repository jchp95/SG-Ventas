using System;

namespace Models.ModelsBdTenant
{
    public class TbInventarioAjuste
    {
        public int FidAjuste { get; set; }
       
        public DateTime? Ffecha { get; set; }
        public string? Fhora { get; set; }
        public string? FtipoMovimiento { get; set; }
        public decimal? Fcantidad { get; set; }
        public string? Fmotivo { get; set; }

        // Relaciones
        public int? FkidUsuario { get; set; }
        public int? FkidProducto { get; set; }
        public int? FkidUnidad { get; set; }

    }
}
