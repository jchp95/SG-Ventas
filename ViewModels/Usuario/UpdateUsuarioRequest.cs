// UpdateUsuarioRequest.cs

using System.ComponentModel.DataAnnotations;

namespace ventas.ViewModels.Usuario;

public class UpdateUsuarioRequest
{
    [Required(ErrorMessage = "El ID del usuario es requerido")]
    public int FidUsuario { get; set; }

    [StringLength(100, ErrorMessage = "El nombre no puede exceder 100 caracteres")]
    public string? Nombre { get; set; }

    [StringLength(20, MinimumLength = 3, ErrorMessage = "El nombre de usuario debe tener entre 3 y 20 caracteres")]
    public string? NombreUsuario { get; set; }

    [EmailAddress(ErrorMessage = "Email inválido")]
    [StringLength(100, ErrorMessage = "El email no puede exceder 100 caracteres")]
    public string? Email { get; set; }

    [Range(1, 10, ErrorMessage = "El nivel debe estar entre 1 y 10")]
    public int? Nivel { get; set; }

    public bool? Activo { get; set; }

    public string? Rol { get; set; }

    public List<string>? Permisos { get; set; }
}