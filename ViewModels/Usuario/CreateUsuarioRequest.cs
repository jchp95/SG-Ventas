using System.ComponentModel.DataAnnotations;

namespace ventas.ViewModels.Usuario;

public class CreateUsuarioRequest
{
    [Required(ErrorMessage = "El nombre completo es requerido")]
    [StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "El nombre de usuario debe tener entre 3 y 20 caracteres")]
    public string NombreUsuario { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    [StringLength(100, ErrorMessage = "El email no puede exceder 100 caracteres")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es requerida")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Password { get; set; } = string.Empty;

    [Range(1, 10, ErrorMessage = "El nivel debe estar entre 1 y 10")]
    public int Nivel { get; set; } = 2; // Se asignará automáticamente según el rol

    [Required(ErrorMessage = "El rol es requerido")]
    public string Rol { get; set; } = "Usuario"; // Por defecto Usuario

    public bool Activo { get; set; } = true;

    public List<string>? Permisos { get; set; } // Permisos opcionales para el usuario
}