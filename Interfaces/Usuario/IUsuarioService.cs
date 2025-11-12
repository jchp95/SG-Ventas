using ventas.ViewModels.Usuario;

namespace ventas.Interfaces.Usuario;

public interface IUsuarioService
{
    /// <summary>
    ///     Crea un nuevo usuario en la base de datos central para un tenant específico
    /// </summary>
    Task<UsuarioResponse> CreateUsuarioAsync(CreateUsuarioRequest request);

    /// <summary>
    ///     Obtiene todos los usuarios de un tenant específico
    /// </summary>
    Task<List<UsuarioResponse>> GetUsuariosByTenantAsync();

    /// <summary>
    ///     Obtiene un usuario por su ID
    /// </summary>
    Task<UsuarioResponse?> GetUsuarioByIdAsync(int usuarioId);

    /// <summary>
    ///     Actualiza un usuario existente
    /// </summary>
    Task<UsuarioResponse> UpdateUsuarioAsync(UpdateUsuarioRequest request);

    /// <summary>
    ///     Desactiva un usuario (soft delete)
    /// </summary>
    Task<bool> DeleteUsuarioAsync(int usuarioId);

    /// <summary>
    ///     Reactiva un usuario desactivado
    /// </summary>
    Task<bool> ActivateUsuarioAsync(int usuarioId);
}