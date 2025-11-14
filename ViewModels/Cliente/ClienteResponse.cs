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
    public string? Ruta { get; set; }
    public string FtipoEntidad { get; set; } = null!;
    public string? Fcalle { get; set; }
    public decimal FlimiteCredito { get; set; }
    public string? FdirFoto { get; set; }
    public string? Fubicaciongps { get; set; }
    public int? FkidEstadoCivil { get; set; }
    public string? EstadoCivil { get; set; }
    public int? FkidSector { get; set; }
    public string? Sector { get; set; }
    public int? FkidMunicipio { get; set; }
    public string? Municipio { get; set; }
    public int? FkidCiudad { get; set; }
    public string? Ciudad { get; set; }
    public int? FkidProvincia { get; set; }
    public string? Provincia { get; set; }
    public int? FkidPais { get; set; }
    public string? Pais { get; set; }
    public int? FkidNacionalidad { get; set; }
    public string? Nacionalidad { get; set; }
    public int? FkidTipoCliente { get; set; }
    public string? TipoCliente { get; set; }
    public int? FkidActividadComercial { get; set; }
    public string? ActividadComercial { get; set; }
    public int? FkidMoneda { get; set; }
    public string? Moneda { get; set; }
    public int FkidEmpresa { get; set; }
    public string Empresa { get; set; } = string.Empty!;
    public int FkidUsuario { get; set; }
    public string Usuario { get; set; } = string.Empty!;
    public bool Factivo { get; set; }
}
