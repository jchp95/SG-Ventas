using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Interfaces.Tenant;
using Microsoft.Data.SqlClient;

namespace ventas.Services.Tenant
{
    public class TenantDatabaseService : ITenantDatabaseService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<TenantDatabaseService> _logger;
        private readonly string _connectionString;
        private readonly string _serverConnectionString;

        public TenantDatabaseService(IConfiguration configuration, ILogger<TenantDatabaseService> logger)
        {
            _configuration = configuration;
            _logger = logger;
            _connectionString = _configuration.GetConnectionString("CentralDB") ?? throw new InvalidOperationException("CentralDB connection string no encontrada");
            
            // Conexión al servidor (sin especificar base de datos) para crear nuevas BDs
            var builder = new SqlConnectionStringBuilder(_connectionString);
            builder.InitialCatalog = "master"; // Usar master para operaciones de creación de BD
            _serverConnectionString = builder.ConnectionString;
        }

        public async Task<bool> TenantDatabaseExistsAsync(string tenantDbName)
        {
            try
            {
                _logger.LogInformation("🔍 Verificando si existe la BD tenant: {TenantDbName}", tenantDbName);

                using var connection = new SqlConnection(_serverConnectionString);
                await connection.OpenAsync();

                var query = "SELECT COUNT(*) FROM sys.databases WHERE name = @dbName";
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@dbName", tenantDbName);

                var result = await command.ExecuteScalarAsync();
                var count = result != null ? Convert.ToInt32(result) : 0;
                var exists = count > 0;

                _logger.LogInformation("✅ BD tenant {TenantDbName} {Status}", 
                    tenantDbName, exists ? "existe" : "no existe");

                return exists;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error verificando existencia de BD tenant: {TenantDbName}", tenantDbName);
                return false;
            }
        }

        public async Task<bool> CreateTenantDatabaseAsync(string tenantDbName, string companyName)
        {
            try
            {
                _logger.LogInformation("🏗️ Creando BD tenant: {TenantDbName} para empresa: {CompanyName}", 
                    tenantDbName, companyName);

                // 1. Verificar si ya existe
                if (await TenantDatabaseExistsAsync(tenantDbName))
                {
                    _logger.LogWarning("⚠️ La BD tenant {TenantDbName} ya existe, omitiendo creación", tenantDbName);
                    return true;
                }

                // 2. Crear la base de datos
                await CreateEmptyDatabaseAsync(tenantDbName);

                // 3. Aplicar el esquema (tablas, índices, etc.)
                await ApplyTenantSchemaAsync(tenantDbName);

                // 4. Insertar datos iniciales si es necesario
                await SeedTenantDataAsync(tenantDbName, companyName);

                _logger.LogInformation("✅ BD tenant creada exitosamente: {TenantDbName}", tenantDbName);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error creando BD tenant: {TenantDbName}", tenantDbName);
                return false;
            }
        }

        public string GetTenantConnectionString(string tenantDbName)
        {
            var builder = new SqlConnectionStringBuilder(_connectionString);
            builder.InitialCatalog = tenantDbName;
            return builder.ConnectionString;
        }

        private async Task CreateEmptyDatabaseAsync(string tenantDbName)
        {
            using var connection = new SqlConnection(_serverConnectionString);
            await connection.OpenAsync();

            // Crear la base de datos sin especificar rutas (compatible con Docker)
            var createDbQuery = $"CREATE DATABASE [{tenantDbName}]";

            using var command = new SqlCommand(createDbQuery, connection);
            await command.ExecuteNonQueryAsync();

            _logger.LogInformation("📁 Base de datos creada en Docker: {TenantDbName}", tenantDbName);
        }

        private async Task ApplyTenantSchemaAsync(string tenantDbName)
        {
            var tenantConnectionString = GetTenantConnectionString(tenantDbName);
            
            // Usar TenantDbContext para aplicar migraciones/esquema
            var options = new DbContextOptionsBuilder<TenantDbContext>()
                .UseSqlServer(tenantConnectionString)
                .Options;

            using var context = new TenantDbContext(options);
            
            // Aplicar migraciones o crear esquema
            await context.Database.EnsureCreatedAsync();
            
            _logger.LogInformation("🏗️ Esquema aplicado a BD tenant: {TenantDbName}", tenantDbName);
        }

        private async Task SeedTenantDataAsync(string tenantDbName, string companyName)
        {
            // TODO: Insertar datos iniciales necesarios para el tenant
            // Por ejemplo: configuraciones por defecto, roles, permisos, etc.
            
            _logger.LogInformation("🌱 Datos iniciales insertados en BD tenant: {TenantDbName}", tenantDbName);
            await Task.CompletedTask; // Placeholder por ahora
        }

        // Métodos de utilidad para información (Docker maneja automáticamente los archivos)
        private string GetDockerDataPath()
        {
            return _configuration["TenantDatabase:DataPath"] ?? "/var/opt/mssql/data/";
        }
    }
}
