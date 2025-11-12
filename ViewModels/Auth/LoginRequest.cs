using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ventas.ViewModels.Auth
{
    public class LoginRequest
{
    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    [JsonPropertyName("userName")]
    public string? UserName { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    [JsonPropertyName("password")]
    public string? Password { get; set; }

    [JsonPropertyName("rememberMe")]
    public bool RememberMe { get; set; }
    }
}
