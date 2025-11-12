namespace ventas.Interfaces.Tenant
{
    /// <summary>
    /// Servicio para manejo de bases de datos tenant (multi-tenancy)
    /// </summary>
    public interface ITenantDatabaseService
    {
        /// <summary>
        /// Verifica si una base de datos tenant existe
        /// </summary>
        /// <param name="tenantDbName">Nombre de la base de datos tenant</param>
        /// <returns>True si existe, False si no existe</returns>
        Task<bool> TenantDatabaseExistsAsync(string tenantDbName);

        /// <summary>
        /// Crea una nueva base de datos tenant con todas las tablas necesarias
        /// </summary>
        /// <param name="tenantDbName">Nombre de la base de datos a crear</param>
        /// <param name="companyName">Nombre de la empresa (para logs y referencia)</param>
        /// <returns>True si se creó exitosamente</returns>
        Task<bool> CreateTenantDatabaseAsync(string tenantDbName, string companyName);

        /// <summary>
        /// Obtiene la cadena de conexión para una base de datos tenant específica
        /// </summary>
        /// <param name="tenantDbName">Nombre de la base de datos tenant</param>
        /// <returns>Cadena de conexión</returns>
        string GetTenantConnectionString(string tenantDbName);
    }
}
