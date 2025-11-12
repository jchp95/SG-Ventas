namespace ventas.ViewModels.Cliente;

public class ClienteResponse
{
    public int FidCliente { get; set; }
    public int? FnumeroCliente { get; set; }
    public string? FcedulaRnc { get; set; }
    public string? Fnombre { get; set; }
    public string? Ftelefono { get; set; }
    public string? Fcelular { get; set; }
    public string? Fdireccion { get; set; }
    public DateOnly? FfechaNacimiento { get; set; }
    public int? FkidRuta { get; set; }
    public string FtipoEntidad { get; set; } = null!;
    public string? Fcalle { get; set; }
    public decimal FlimiteCredito { get; set; }
    public string? FdirFoto { get; set; }
    public string? Fubicaciongps { get; set; }
    public int? FkidEstadoCivil { get; set; }
    public int? FkidSector { get; set; }
    public int? FkidMunicipio { get; set; }
    public int? FkidCiudad { get; set; }
    public int? FkidProvincia { get; set; }
    public int? FkidPais { get; set; }
    public int? FkidNacionalidad { get; set; }
    public int? FkidTipoCliente { get; set; }
    public int? FkidActividadComercial { get; set; }
    public int? FkidMoneda { get; set; }
    public int FkidEmpresa { get; set; }
    public int FkidUsuario { get; set; }
    public bool Factivo { get; set; }
}
