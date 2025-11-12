namespace ventas.Interfaces.Auditoria;

/// <summary>
/// Servicio para registrar auditoría en ambas bases de datos (Central y Tenant)
/// </summary>
public interface IAuditoriaService
{
    /// <summary>
    /// Registra una acción de auditoría tanto en la base central como en la base del tenant
    /// </summary>
    /// <param name="tabla">Nombre de la tabla o entidad</param>
    /// <param name="accion">Acción realizada (Creación, Modificación, Eliminación, etc.)</param>
    /// <param name="registroId">ID del registro afectado</param>
    /// <param name="usuarioId">ID del usuario que realizó la acción (en la base central)</param>
    /// <param name="tenantId">ID del tenant (empresa)</param>
    /// <param name="tenantDbName">Nombre de la base de datos del tenant (opcional, si no se puede obtener del contexto)</param>
    /// <returns>True si la auditoría se registró correctamente en ambas bases</returns>
    Task<bool> RegistrarAuditoriaUsuarioAsync(
        string tabla,
        string accion,
        int registroId,
        int usuarioId,
        int tenantId,
        string? tenantDbName = null);
}
