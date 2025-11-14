

namespace Models.ModelsBdTenant
{
    public class TbAlmacenMovimiento
    {
        public int Fid { get; set; }
        public string Fmotivo { get; set; } = string.Empty;
        public decimal Fcantidad { get; set; }
        public DateTime Ffecha { get; set; }
        public string Fhora { get; set; } = string.Empty;
        public int Factivo { get; set; }
      
        // Relaciones
        public int FkidOrigen { get; set; }
        public int FkidDestino { get; set; }
        public int FkidUsuario { get; set; }
    }
}
