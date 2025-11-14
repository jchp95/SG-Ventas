using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ventas.ViewModels.Cliente;

public class CreateClienteRequest
{
    [Required(ErrorMessage = "El nombre es requerido")]
    [StringLength(50, ErrorMessage = "El nombre no puede exceder 50 caracteres")]
    public string Nombre { get; set; } = null!;

    [StringLength(20, ErrorMessage = "La cédula/RNC no puede exceder 20 caracteres")]
    public string? CedulaRnc { get; set; }

    [StringLength(14, ErrorMessage = "El teléfono no puede exceder 14 caracteres")]
    public string? Telefono { get; set; }

    [StringLength(14, ErrorMessage = "El celular no puede exceder 14 caracteres")]
    public string? Celular { get; set; }

    [StringLength(400, ErrorMessage = "La dirección no puede exceder 400 caracteres")]
    public string? Direccion { get; set; }

    public DateOnly? FechaNacimiento { get; set; }

    [Required(ErrorMessage = "El tipo de entidad es requerido")]
    [StringLength(1)]
    public string? TipoEntidad { get; set; }

    [StringLength(50, ErrorMessage = "La calle no puede exceder 50 caracteres")]
    public string? Calle { get; set; }

    public decimal LimiteCredito { get; set; } = 0;

    [StringLength(60, ErrorMessage = "La ubicación GPS no puede exceder 60 caracteres")]
    public string? UbicacionGps { get; set; }

    // Foreign Keys (opcionales, si ya existen)
    public int? IdRuta { get; set; }
    public int? IdEstadoCivil { get; set; }
    public int? IdSector { get; set; }
    public int? IdMunicipio { get; set; }
    public int? IdCiudad { get; set; }
    public int? IdProvincia { get; set; }
    public int? IdPais { get; set; }
    public int? IdNacionalidad { get; set; }
    public int? IdTipoCliente { get; set; }
    public int? IdActividadComercial { get; set; }
    public int? IdMoneda { get; set; }

    // Nombres de datos relacionados (para crear si no existe)
    public string? Ruta { get; set; }
    public string? EstadoCivil { get; set; }
    public string? Sector { get; set; }
    public string? Municipio { get; set; }
    public string? Ciudad { get; set; }
    public string? Provincia { get; set; }
    public string? Pais { get; set; }
    public string? Nacionalidad { get; set; }
    public string? TipoCliente { get; set; }
    public string? ActividadComercial { get; set; }
    public string? Moneda { get; set; }

    // Imagen opcional recibida vía multipart/form-data
    public IFormFile? Imagen { get; set; }
}
