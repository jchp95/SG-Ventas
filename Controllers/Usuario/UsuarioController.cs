using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ventas.Interfaces.Usuario;
using ventas.ViewModels.Response;
using ventas.ViewModels.Usuario;

namespace ventas.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsuarioController : ControllerBase
{
    private readonly ILogger<UsuarioController> _logger;
    private readonly IUsuarioService _usuarioService;

    public UsuarioController(
        IUsuarioService usuarioService,
        ILogger<UsuarioController> logger)
    {
        _usuarioService = usuarioService;
        _logger = logger;
    }

    /// <summary>
    ///     Crea un nuevo usuario para el tenant actual
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateUsuario([FromBody] CreateUsuarioRequest request)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse<object>(false, "Datos inválidos", ModelState));

            var usuario = await _usuarioService.CreateUsuarioAsync(request);

            _logger.LogInformation("Usuario creado exitosamente: {UsuarioId} - {UserName}",
                usuario.FidUsuario, usuario.NombreUsuario);

            return Ok(new ApiResponse<UsuarioResponse>(true, "Usuario creado exitosamente", usuario));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error de validación al crear usuario");
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al crear usuario");
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Obtiene todos los usuarios del tenant actual
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetUsuarios()
    {
        try
        {
            var usuarios = await _usuarioService.GetUsuariosByTenantAsync();

            _logger.LogInformation("Se obtuvieron {Count} usuarios", usuarios.Count);

            return Ok(new ApiResponse<List<UsuarioResponse>>(true, "Usuarios obtenidos exitosamente", usuarios));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener usuarios");
            return StatusCode(500, new ApiResponse<string>(false, "Error al obtener usuarios", ex.Message));
        }
    }

    /// <summary>
    ///     Obtiene la información del usuario actualmente autenticado
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            // Obtener el nombre de usuario del claim
            var userName = User.Identity?.Name;
            
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse<string>(false, "Usuario no autenticado", null));
            }

            // Obtener todos los usuarios y buscar el actual por nombre de usuario
            var usuarios = await _usuarioService.GetUsuariosByTenantAsync();
            var currentUser = usuarios.FirstOrDefault(u => u.NombreUsuario == userName);

            if (currentUser == null)
            {
                return NotFound(new ApiResponse<string>(false, "Usuario no encontrado", null));
            }

            _logger.LogInformation("Información del usuario actual obtenida: {UserName}", userName);

            return Ok(new ApiResponse<UsuarioResponse>(true, "Usuario obtenido exitosamente", currentUser));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener información del usuario actual");
            return StatusCode(500, new ApiResponse<string>(false, "Error al obtener información del usuario", ex.Message));
        }
    }

    /// <summary>
    ///     Obtiene un usuario por su ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUsuario(int id)
    {
        try
        {
            var usuario = await _usuarioService.GetUsuarioByIdAsync(id);

            if (usuario == null) return NotFound(new ApiResponse<string>(false, "Usuario no encontrado", null));

            return Ok(new ApiResponse<UsuarioResponse>(true, "Usuario obtenido exitosamente", usuario));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener usuario {UsuarioId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error al obtener usuario", ex.Message));
        }
    }

    /// <summary>
    ///     Actualiza un usuario existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUsuario(int id, [FromBody] UpdateUsuarioRequest request)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse<object>(false, "Datos inválidos", ModelState));

            if (id != request.FidUsuario)
                return BadRequest(new ApiResponse<string>(false, "El ID del usuario no coincide", null));

            var usuario = await _usuarioService.UpdateUsuarioAsync(request);

            _logger.LogInformation("Usuario actualizado exitosamente: {UsuarioId}", id);

            return Ok(new ApiResponse<UsuarioResponse>(true, "Usuario actualizado exitosamente", usuario));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error de validación al actualizar usuario {UsuarioId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al actualizar usuario {UsuarioId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Desactiva un usuario (soft delete)
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
        try
        {
            var result = await _usuarioService.DeleteUsuarioAsync(id);

            if (!result) return NotFound(new ApiResponse<string>(false, "Usuario no encontrado", null));

            _logger.LogInformation("Usuario desactivado exitosamente: {UsuarioId}", id);

            return Ok(new ApiResponse<bool>(true, "Usuario desactivado exitosamente", result));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error al desactivar usuario {UsuarioId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al desactivar usuario {UsuarioId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Reactiva un usuario desactivado
    /// </summary>
    [HttpPost("{id}/activate")]
    public async Task<IActionResult> ActivateUsuario(int id)
    {
        try
        {
            var result = await _usuarioService.ActivateUsuarioAsync(id);

            if (!result) return NotFound(new ApiResponse<string>(false, "Usuario no encontrado", null));

            _logger.LogInformation("Usuario activado exitosamente: {UsuarioId}", id);

            return Ok(new ApiResponse<bool>(true, "Usuario activado exitosamente", result));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error al activar usuario {UsuarioId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al activar usuario {UsuarioId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }
}