using ventas.ViewModels.Cliente;

namespace ventas.Interfaces.Cliente;

public interface IClienteService
{
    /// <summary>
    ///     Crea un nuevo cliente en la base de datos del tenant
    /// </summary>
    Task<ClienteResponse> CreateClienteAsync(CreateClienteRequest request);

    /// <summary>
    ///     Obtiene todos los clientes del tenant actual
    /// </summary>
    Task<List<ClienteResponse>> GetClientesByTenantAsync();

    /// <summary>
    ///     Obtiene un cliente por su ID
    /// </summary>
    Task<ClienteResponse?> GetClienteByIdAsync(int clienteId);

    /// <summary>
    ///     Actualiza un cliente existente
    /// </summary>
    Task<ClienteResponse> UpdateClienteAsync(UpdateClienteRequest request);

    /// <summary>
    ///     Desactiva un cliente (soft delete)
    /// </summary>
    Task<bool> DeleteClienteAsync(int clienteId);

    /// <summary>
    ///     Reactiva un cliente desactivado
    /// </summary>
    Task<bool> ActivateClienteAsync(int clienteId);

    /// <summary>
    ///     Alterna el estado activo de un cliente
    /// </summary>
    Task<bool> ToggleActivoClienteAsync(int clienteId);
}
