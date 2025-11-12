using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ventas.ViewModels.Auth
{
    public class RegisterRequest
{
    // Datos del usuario
    [Required(ErrorMessage = "El nombre completo es requerido")]
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    [JsonPropertyName("userName")]
    public string? UserName { get; set; }

    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "El formato del email no es válido")]
    [JsonPropertyName("email")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    [StringLength(100, ErrorMessage = "La {0} debe tener al menos {2} y como máximo {1} caracteres.", MinimumLength = 6)]
    [JsonPropertyName("password")]
    public string? Password { get; set; }

    [Required(ErrorMessage = "La confirmación de contraseña es requerida")]
    [Compare("Password", ErrorMessage = "La contraseña y su confirmación no coinciden.")]
    [JsonPropertyName("confirmPassword")]
    public string? ConfirmPassword { get; set; }

    // Datos de la empresa (requeridos para crear el tenant)
    [Required(ErrorMessage = "El RNC de la empresa es requerido")]
    [JsonPropertyName("companyRnc")]
    public string? CompanyRnc { get; set; }

    [Required(ErrorMessage = "El nombre de la empresa es requerido")]
    [JsonPropertyName("companyName")]
    public string? CompanyName { get; set; }

    [JsonPropertyName("companyRazonSocial")]
    public string? CompanyRazonSocial { get; set; }

    [JsonPropertyName("companyAddress")]
    public string? CompanyAddress { get; set; }

    [JsonPropertyName("companyPhone")]
    public string? CompanyPhone { get; set; }

    [JsonPropertyName("companyEmail")]
    [EmailAddress(ErrorMessage = "El formato del email de empresa no es válido")]
    public string? CompanyEmail { get; set; }
    }
}