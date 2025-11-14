using System;
using System.Collections.Generic;

namespace Models.ModelsBdTenant
{

    public class TbSuplidor
    {
        public int FidSuplidor { get; set; }
        public string Fnombre { get; set; } = string.Empty;
        public string? FcedulaRnc { get; set; }
        public string? Fdireccion { get; set; }
        public string? Ftelefono { get; set; }
        public string? Fcelular { get; set; }
        public string? Femail { get; set; }
        public string? Fcontacto { get; set; }
        public string? FtelContacto { get; set; }
        public string? FtipoServicio { get; set; }
        public DateTime Ffecha { get; set; }
        public bool Factivo { get; set; }
        // Relaciones 
        public int FkidUsuario { get; set; }
    }
}
