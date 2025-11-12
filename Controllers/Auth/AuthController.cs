using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ventas.Services.Auth;
using ventas.ViewModels.Auth;
using ventas.ViewModels.Response;

namespace ventas.Controllers.Auth;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthController(
        IAuthService authService,
        ILogger<AuthController> logger,
        SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("login")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<ApiResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
    {
        try
        {
            _logger.LogInformation("🔐 Login request recibida: UserName={UserName}, RememberMe={RememberMe}",
                request?.UserName, request?.RememberMe);

            if (request == null)
            {
                _logger.LogWarning("❌ Request es null");
                return BadRequest(new ApiResponse<string>(false, "Request inválido", ""));
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("❌ ModelState inválido: {Errors}",
                    string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));
                return BadRequest(new ApiResponse<string>(false, "Datos inválidos", ""));
            }

            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
            {
                _logger.LogWarning("❌ Usuario o contraseña vacíos");
                return BadRequest(new ApiResponse<string>(false, "Usuario y contraseña son requeridos", ""));
            }

            var token = await _authService.LoginAsync(request.UserName, request.Password);

            // Crear respuesta con token
            var response = new LoginResponse
            {
                Token = token,
                UserName = request.UserName,
                Message = "Login exitoso"
            };

            return Ok(new ApiResponse<LoginResponse>(true, "Login exitoso", response));
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning(ex, "Credenciales inválidas para {UserName}", request.UserName);
            return Unauthorized(new ApiResponse<string>(false, ex.Message, ""));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Argumentos inválidos para {UserName}", request.UserName);
            return BadRequest(new ApiResponse<string>(false, ex.Message, ""));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Excepción inesperada en Login para {UserName}", request.UserName);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ""));
        }
    }

    [HttpPost("logout")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> LogoutAsync()
    {
        await _signInManager.SignOutAsync();
        _logger.LogInformation("Usuario cerró sesión.");
        return Ok(new { Message = "Sesión cerrada correctamente." });
    }

    [HttpGet("test")]
    [ProducesResponseType(200)]
    public ActionResult TestGet()
    {
        _logger.LogInformation("🧪 Test GET endpoint llamado");
        return Ok(new { message = "Test GET successful", timestamp = DateTime.Now });
    }

    [HttpPost("test-register")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    public async Task<ActionResult> TestRegister()
    {
        try
        {
            _logger.LogInformation("🧪 Test register endpoint llamado");

            string body;
            using (var reader = new StreamReader(Request.Body))
            {
                body = await reader.ReadToEndAsync();
            }

            _logger.LogInformation("🧪 Raw body: {Body}", body);
            _logger.LogInformation("🧪 Content Type: {ContentType}", Request.ContentType);

            return Ok(new
            {
                message = "Test successful",
                body,
                contentType = Request.ContentType,
                method = Request.Method
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error en test register");
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), 200)]
    [ProducesResponseType(typeof(ApiErrorResponse), 400)]
    [ProducesResponseType(typeof(ApiErrorResponse), 409)]
    [ProducesResponseType(typeof(ApiErrorResponse), 500)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        _logger.LogInformation("🔐 Register endpoint llamado");
        _logger.LogInformation("📝 Request recibido: {@Request}", request);

        if (request == null)
        {
            _logger.LogWarning("❌ Request es null");
            return BadRequest(new ApiErrorResponse
            {
                Message = "Request inválido",
                Details = null
            });
        }

        if (!TryValidateModel(request))
        {
            var errors = ModelState
                .Where(x => x.Value.Errors.Count > 0)
                .Select(x => new { Field = x.Key, Errors = x.Value.Errors.Select(e => e.ErrorMessage) })
                .ToList();
            _logger.LogWarning("❌ Validación fallida: {@Errors}", errors);
            return BadRequest(new ApiErrorResponse
            {
                Message = "Datos inválidos",
                Details = errors
            });
        }

        try
        {
            _logger.LogInformation("✅ Iniciando proceso de registro para: {UserName}", request.UserName);
            var token = await _authService.RegisterAsync(request);
            var response = new LoginResponse
            {
                Token = token,
                UserName = request.UserName ?? "",
                Message = "Registro exitoso"
            };
            _logger.LogInformation("✅ Registro exitoso para: {UserName}", request.UserName);
            return Ok(new ApiResponse<LoginResponse>(true, "Registro exitoso", response));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "❌ Error de argumento en registro");
            return BadRequest(new ApiErrorResponse
            {
                Message = ex.Message,
                Details = null
            });
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "❌ Error de operación en registro");
            return Conflict(new ApiErrorResponse
            {
                Message = ex.Message,
                Details = null
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "❌ Error inesperado en registro");
            return StatusCode(500, new ApiErrorResponse
            {
                Message = "Error interno del servidor",
                Details = ex.Message
            });
        }
    }

    [HttpPost("change-password")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<ApiResponse<string>>> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(new ApiResponse<string>(false, "Datos inválidos", ""));

            // Obtener el ID del usuario del token JWT
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new ApiResponse<string>(false, "Usuario no autenticado", ""));

            var result =
                await _authService.ChangePasswordAsync(userId, request.OldPassword ?? "", request.NewPassword ?? "");

            if (result) return Ok(new ApiResponse<string>(true, "Contraseña cambiada exitosamente", ""));

            return BadRequest(new ApiResponse<string>(false, "No se pudo cambiar la contraseña", ""));
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Argumentos inválidos para cambio de contraseña");
            return BadRequest(new ApiResponse<string>(false, ex.Message, ""));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Operación inválida para cambio de contraseña");
            return BadRequest(new ApiResponse<string>(false, ex.Message, ""));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado en cambio de contraseña");
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ""));
        }
    }
}