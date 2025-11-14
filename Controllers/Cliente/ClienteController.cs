using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ventas.Interfaces.Cliente;
using ventas.ViewModels.Response;
using ventas.ViewModels.Cliente;

namespace ventas.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClienteController : ControllerBase
{
    private readonly ILogger<ClienteController> _logger;
    private readonly IClienteService _clienteService;

    public ClienteController(
        IClienteService clienteService,
        ILogger<ClienteController> logger)
    {
        _clienteService = clienteService;
        _logger = logger;
    }

    /// <summary>
    ///     Crea un nuevo cliente para el tenant actual
    /// </summary>
    [HttpPost("crear")]
    [Consumes("multipart/form-data")] // 👈 clave para FormData
    public async Task<IActionResult> CreateCliente([FromForm] CreateClienteRequest request)
    {
        try
        {
            // Con [ApiController] ya hace 400 automático, pero si quieres mantener esto:
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>(false, "Datos inválidos", ModelState));

            var cliente = await _clienteService.CreateClienteAsync(request);

            _logger.LogInformation("Cliente creado exitosamente: {ClienteId} - {Nombre}",
                cliente.FidCliente, cliente.Fnombre);

            return Ok(new ApiResponse<ClienteResponse>(true, "Cliente creado exitosamente", cliente));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error de validación al crear cliente");
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al crear cliente");
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Obtiene todos los clientes del tenant actual
    /// </summary>
    [HttpGet("listar")]
    public async Task<IActionResult> GetClientes()
    {
        try
        {
            var clientes = await _clienteService.GetClientesByTenantAsync();

            _logger.LogInformation("Se obtuvieron {Count} clientes", clientes.Count);

            return Ok(new ApiResponse<List<ClienteResponse>>(true, "Clientes obtenidos exitosamente", clientes));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener clientes");
            return StatusCode(500, new ApiResponse<string>(false, "Error al obtener clientes", ex.Message));
        }
    }

    /// <summary>
    ///     Obtiene un cliente por su ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetClienteById(int id)
    {
        try
        {
            var cliente = await _clienteService.GetClienteByIdAsync(id);

            if (cliente == null)
            {
                _logger.LogWarning("Cliente no encontrado: {ClienteId}", id);
                return NotFound(new ApiResponse<string>(false, "Cliente no encontrado", null));
            }

            return Ok(new ApiResponse<ClienteResponse>(true, "Cliente obtenido exitosamente", cliente));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener cliente por ID: {ClienteId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error al obtener cliente", ex.Message));
        }
    }

    /// <summary>
    ///     Actualiza un cliente existente
    /// </summary>
    [HttpPut("actualizar")]
    public async Task<IActionResult> UpdateCliente([FromBody] UpdateClienteRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>(false, "Datos inválidos", ModelState));

            var cliente = await _clienteService.UpdateClienteAsync(request);

            _logger.LogInformation("Cliente actualizado exitosamente: {ClienteId} - {Nombre}",
                cliente.FidCliente, cliente.Fnombre);

            return Ok(new ApiResponse<ClienteResponse>(true, "Cliente actualizado exitosamente", cliente));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error de validación al actualizar cliente");
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al actualizar cliente");
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Desactiva un cliente (soft delete)
    /// </summary>
    [HttpDelete("eliminar/{id}")]
    public async Task<IActionResult> DeleteCliente(int id)
    {
        try
        {
            var resultado = await _clienteService.DeleteClienteAsync(id);

            _logger.LogInformation("Cliente desactivado exitosamente: {ClienteId}", id);

            return Ok(new ApiResponse<bool>(true, "Cliente desactivado exitosamente", resultado));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error al desactivar cliente: {ClienteId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al desactivar cliente: {ClienteId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Reactiva un cliente desactivado
    /// </summary>
    [HttpPost("activar/{id}")]
    public async Task<IActionResult> ActivateCliente(int id)
    {
        try
        {
            var resultado = await _clienteService.ActivateClienteAsync(id);

            _logger.LogInformation("Cliente activado exitosamente: {ClienteId}", id);

            return Ok(new ApiResponse<bool>(true, "Cliente activado exitosamente", resultado));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error al activar cliente: {ClienteId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al activar cliente: {ClienteId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }

    /// <summary>
    ///     Alterna el estado activo de un cliente
    /// </summary>
    [HttpPatch("toggle-activo/{id}")]
    public async Task<IActionResult> ToggleActivoCliente(int id)
    {
        try
        {
            var nuevoEstado = await _clienteService.ToggleActivoClienteAsync(id);

            _logger.LogInformation("Estado del cliente {ClienteId} cambiado a: {Estado}",
                id, nuevoEstado ? "Activo" : "Inactivo");

            return Ok(new ApiResponse<bool>(
                true,
                $"Cliente {(nuevoEstado ? "activado" : "desactivado")} exitosamente",
                nuevoEstado
            ));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Error al cambiar estado del cliente: {ClienteId}", id);
            return BadRequest(new ApiResponse<string>(false, ex.Message, null));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error inesperado al cambiar estado del cliente: {ClienteId}", id);
            return StatusCode(500, new ApiResponse<string>(false, "Error interno del servidor", ex.Message));
        }
    }
}
