using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ventas.Context;

public class TenantDbContextFactory : IDesignTimeDbContextFactory<TenantDbContext>
{
    public TenantDbContext CreateDbContext(string[] args)
    {
        // Lee appsettings.Development.json si quieres; si no, usa un fallback:
        // Aqui va el nombre de la base de datos para hacer la migracion
        var exampleDbName = "";
        var template =
            "Server=localhost,1434;Database={0};User Id=sa;Password=MyStrongPass123;Encrypt=False;TrustServerCertificate=True;MultipleActiveResultSets=True;";
        var connStr = string.Format(template, exampleDbName);

        var optionsBuilder = new DbContextOptionsBuilder<TenantDbContext>();
        optionsBuilder.UseSqlServer(connStr);

        return new TenantDbContext(optionsBuilder.Options);
    }

    public static TenantDbContext Create(string connectionString)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TenantDbContext>();
        optionsBuilder.UseSqlServer(connectionString);
        return new TenantDbContext(optionsBuilder.Options);
    }
}