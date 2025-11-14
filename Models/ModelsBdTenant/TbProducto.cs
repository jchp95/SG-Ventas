using System;

namespace Models.ModelsBdTenant
{
    public class TbProducto
    {
        public int FidProducto { get; set; }
        public string Fdescripcion { get; set; } = string.Empty;
        public decimal Fcosto { get; set; }
        public decimal FprecioCompra { get; set; }
        public decimal Fprecio { get; set; }
        public decimal Freorden { get; set; }
        public decimal Fexistencia { get; set; }
        public int Ftipo { get; set; }
        public string? FcodigoBarra { get; set; }
        public string? FcodigoReferencia { get; set; }
        public string? FcodigoLetras { get; set; }
        public string? FcodbarSuplidor { get; set; }
        public string? FcostoLetra { get; set; }
        public decimal Fprecio2 { get; set; }
        public decimal Fprecio3 { get; set; }
        public decimal Fprecio4 { get; set; }
        public string Festatus { get; set; } = string.Empty;
        public string? FrutaImagen { get; set; }
        public bool FventaFrecuente { get; set; }
        public string? Fnota { get; set; }
        public bool Factivo { get; set; }

        // Relaciones
        public int FkidMarca { get; set; }
        public int FkidCategoria { get; set; }
        public int FkidItbis { get; set; }
        public int FkidUsuario { get; set; }
       
    }
}