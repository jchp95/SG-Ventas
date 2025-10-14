using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ventas.Context;
using ventas.Models.ModelsBdCentral;

namespace ventas;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CentralDbContext>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        try
        {
            dbContext.IsSeeding = true;

            // Inicializar tenants y empresas desde appsettings.json
            var tenantsSection = configuration.GetSection("Tenants");
            if (tenantsSection.Exists())
            {
                foreach (var tenant in tenantsSection.GetChildren())
                {
                    var dbName = tenant["DatabaseName"];
                    var empresaSection = tenant.GetSection("Empresa");
                    if (!string.IsNullOrEmpty(dbName) && empresaSection.Exists())
                    {
                        // Insertar en TbConexion si no existe
                        var conexion = await dbContext.Set<TbConexion>().FirstOrDefaultAsync(c => c.FnombreBd == dbName);
                        if (conexion == null)
                        {
                            conexion = new TbConexion { FnombreBd = dbName };
                            dbContext.Set<TbConexion>().Add(conexion);
                            await dbContext.SaveChangesAsync();
                        }
                        // Insertar en TbEmpresa si no existe
                        var nombreEmpresa = empresaSection["Nombre"];
                        var empresa = await dbContext.Set<TbEmpresa>().FirstOrDefaultAsync(e => e.FnombreEmpresa == nombreEmpresa);
                        if (empresa == null)
                        {
                            empresa = new TbEmpresa
                            {
                                FnombreEmpresa = nombreEmpresa,
                                Frnc = empresaSection["RNC"],
                                Femail = empresaSection["Email"],
                                Flogo = empresaSection["Logo"],
                                Feslogan = empresaSection["Eslogan"],
                                Factivo = empresaSection.GetValue<bool>("Activo"),
                                FkidConexion = conexion.FidConexion
                            };
                            dbContext.Set<TbEmpresa>().Add(empresa);
                            await dbContext.SaveChangesAsync();
                        }
                    }
                }
            }

            // First create roles without auditing
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            await EnsureRolesAsync(roleManager);

            // Then create admin user without auditing
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
            await EnsureTestAdminAsync(userManager, dbContext);

            // Then add permissions (this happens after user is created)
            await EnsurePermissionsAsync(userManager, services);

            // Add currencies if they don't exist
            if (!await dbContext.Monedas.AnyAsync())
            {
                var monedas = new List<TbMoneda>
                {
                    new() { Fmoneda = "Peso", Fsimbolo = "RD", Factivo = true },
                    new() { Fmoneda = "Dolar", Fsimbolo = "US", Factivo = true }
                };
                dbContext.Monedas.AddRange(monedas);
                await dbContext.SaveChangesAsync(true); // Se pasa el parámetro requerido
            }
        }
        finally
        {
            dbContext.IsSeeding = false;
        }
    }

    private static async Task EnsureRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        // Crear todos los roles necesarios
        var roles = new[]
        {
            AppConstants.AdministratorRole,
            AppConstants.UserRole
        };

        foreach (var role in roles)
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
                Console.WriteLine($"Rol creado: {role}");
            }
    }

    private static async Task EnsureTestAdminAsync(UserManager<IdentityUser> userManager,
        CentralDbContext dbContext)
    {
        var testAdmin = await userManager.Users
            .Where(x => x.UserName == "admin")
            .SingleOrDefaultAsync();

        if (testAdmin == null)
        {
            testAdmin = new IdentityUser
            {
                UserName = "admin",
                Email = "admin@todo.local",
                EmailConfirmed = false
            };

            var result = await userManager.CreateAsync(testAdmin, "Admin2025*");
            if (!result.Succeeded)
                throw new Exception(
                    $"Error creating admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            // Add role after user is created
            result = await userManager.AddToRoleAsync(testAdmin, AppConstants.AdministratorRole);
            if (!result.Succeeded)
                throw new Exception(
                    $"Error adding role to admin: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            // Now create the TbUsuario record
            var empresaPrimera = await dbContext.Set<TbEmpresa>().FirstOrDefaultAsync();
            var empresaId = empresaPrimera?.FidEmpresa ?? 0;
            var nuevoUsuario = new TbUsuarioCentral
            {
                Fnombre = "Administrador",
                FnombreUsuario = "admin",
                Femail = "admin@todo.local",
                Fnivel = 1,
                Fpassword = testAdmin.PasswordHash,
                Factivo = true,
                IdentityId = testAdmin.Id,
                FkidEmpresa = empresaId
            };

            dbContext.Usuarios.Add(nuevoUsuario);
            await dbContext.SaveChangesAsync(true); // Se pasa el parámetro requerido
        }
        else
        {
            // Si el usuario ya existe en Identity, asegurarse de que exista en TbUsuarioCentral
            var usuarioCentral = await dbContext.Usuarios.FirstOrDefaultAsync(u => u.IdentityId == testAdmin.Id);
            if (usuarioCentral == null)
            {
                var empresaPrimera = await dbContext.Set<TbEmpresa>().FirstOrDefaultAsync();
                var empresaId = empresaPrimera?.FidEmpresa ?? 0;
                var nuevoUsuario = new TbUsuarioCentral
                {
                    Fnombre = "Administrador",
                    FnombreUsuario = "admin",
                    Femail = "admin@todo.local",
                    Fnivel = 1,
                    Fpassword = testAdmin.PasswordHash,
                    Factivo = true,
                    IdentityId = testAdmin.Id,
                    FkidEmpresa = empresaId
                };
                dbContext.Usuarios.Add(nuevoUsuario);
                await dbContext.SaveChangesAsync(true);
            }
            // ¡IMPORTANTE!: Si el usuario ya existe, verificar y signal el rol si no lo tiene
            var userRoles = await userManager.GetRolesAsync(testAdmin);
            if (!userRoles.Contains(AppConstants.AdministratorRole))
            {
                var result = await userManager.AddToRoleAsync(testAdmin, AppConstants.AdministratorRole);
                if (!result.Succeeded)
                    throw new Exception(
                        $"Error adding role to existing admin: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                Console.WriteLine("✅ Rol Administrator asignado al usuario admin existente");
            }
            else
            {
                Console.WriteLine("ℹ️ Usuario admin ya tiene el rol Administrator");
            }
        }
    }

    private static async Task EnsurePermissionsAsync(UserManager<IdentityUser> userManager, IServiceProvider services)
    {
        var adminUser = await userManager.FindByNameAsync("admin");
        if (adminUser == null) return;

        var dbContext = services.GetRequiredService<CentralDbContext>();
        var allPermissions = Permissions.GetAllPermissions();

        // Acceso directo al DbSet UserClaims expuesto en CentralDbContext
        var userClaimsDbSet = dbContext.UserClaims;
        foreach (var permission in allPermissions)
        {
            var existingClaim = await userClaimsDbSet
                .FirstOrDefaultAsync(uc =>
                    uc.UserId == adminUser.Id &&
                    uc.ClaimType == "Permission" &&
                    uc.ClaimValue == permission);

            if (existingClaim == null)
                await userManager.AddClaimAsync(adminUser, new Claim("Permission", permission));
        }
    }
}