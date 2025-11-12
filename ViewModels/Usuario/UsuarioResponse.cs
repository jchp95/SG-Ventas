namespace ventas.ViewModels.Usuario;

public class UsuarioResponse
{
    public int FidUsuario { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string NombreUsuario { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Nivel { get; set; }
    public bool Activo { get; set; }
    public string IdentityId { get; set; } = string.Empty;
    public int FkidEmpresa { get; set; }
    public string NombreEmpresa { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
    public List<string> Permisos { get; set; } = new();
}