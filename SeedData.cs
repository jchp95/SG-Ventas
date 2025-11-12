using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Models.ModelsBdCentral;

namespace ventas;

public static class SeedData
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<CentralDbContext>();
        try
        {
            dbContext.IsSeeding = true;

            // First create roles without auditing
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            await EnsureRolesAsync(roleManager);

            // Then create admin user without auditing
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
            await EnsureSupportUserAsync(userManager, dbContext);

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
            AppConstants.SupportRole, // Rol de soporte para gestionar todos los tenants
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

    private static async Task EnsureSupportUserAsync(UserManager<IdentityUser> userManager,
        CentralDbContext dbContext)
    {
        // Buscar usuario por nombre de usuario "soporte"
        var supportUser = await userManager.Users
            .Where(x => x.UserName == "soporte")
            .SingleOrDefaultAsync();

        if (supportUser == null)
        {
            supportUser = new IdentityUser
            {
                UserName = "soporte",
                Email = "soporte@sistema.local",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(supportUser, "Soporte2025*");
            if (!result.Succeeded)
                throw new Exception(
                    $"Error creating support user: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            // Agregar rol de soporte usando la constante
            result = await userManager.AddToRoleAsync(supportUser, AppConstants.SupportRole);
            if (!result.Succeeded)
                throw new Exception(
                    $"Error adding role to support: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            // PASO 1: Verificar si existe una empresa de soporte, si no, crearla
            // NOTA: Esta empresa NO tiene base de datos tenant, solo cumple con la FK del modelo
            var empresaSoporte = await dbContext.Set<TbEmpresa>()
                .FirstOrDefaultAsync(e => e.Frnc == "000-0000000-0");

            if (empresaSoporte == null)
            {
                // Crear conexión de soporte SIN nombre de base de datos
                // El campo vacío indica que NO hay tenant asociado (usuario de soporte)
                var conexionSoporte = new TbConexion
                {
                    FnombreBd = "" // VACÍO - No se crea base de datos tenant para soporte
                };
                dbContext.Conexiones.Add(conexionSoporte);
                await dbContext.SaveChangesAsync(true);

                Console.WriteLine("✅ Conexión de soporte creada (SIN base de datos tenant)");

                // Crear empresa de soporte (solo registro en BD central)
                empresaSoporte = new TbEmpresa
                {
                    FnombreEmpresa = "Soporte Técnico",
                    Frnc = "000-0000000-0",
                    Femail = "soporte@sistema.local",
                    Flogo = "",
                    Feslogan = "Equipo de Soporte del Sistema",
                    Factivo = true,
                    FkidConexion = conexionSoporte.FidConexion
                };
                dbContext.Empresas.Add(empresaSoporte);
                await dbContext.SaveChangesAsync(true);

                Console.WriteLine(
                    $"✅ Empresa de soporte creada (solo en BD central, SIN tenant): {empresaSoporte.FnombreEmpresa}");
            }

            // PASO 2: Crear usuario de soporte vinculado a empresa de soporte
            // Este usuario NO tiene base de datos tenant, solo existe en BD central
            var nuevoUsuarioSoporte = new TbUsuarioCentral
            {
                Fnombre = "Usuario de Soporte",
                FnombreUsuario = "soporte",
                Femail = "soporte@sistema.local",
                Fnivel = 0, // Nivel 0 = Soporte (superior a admin que es nivel 1)
                Fpassword = supportUser.PasswordHash,
                Factivo = true,
                IdentityId = supportUser.Id,
                FkidEmpresa = empresaSoporte.FidEmpresa
            };

            dbContext.Usuarios.Add(nuevoUsuarioSoporte);
            await dbContext.SaveChangesAsync(true);

            Console.WriteLine("✅ Usuario de SOPORTE creado (SOLO en BD central, SIN tenant)");
            Console.WriteLine("   👤 Usuario: soporte");
            Console.WriteLine("   🔑 Password: Soporte2025*");
        }
        else
        {
            // Si el usuario ya existe en Identity, asegurarse de que exista en TbUsuarioCentral
            var usuarioCentral = await dbContext.Usuarios.FirstOrDefaultAsync(u => u.IdentityId == supportUser.Id);
            if (usuarioCentral == null)
            {
                // Verificar si existe empresa de soporte
                var empresaSoporte = await dbContext.Set<TbEmpresa>()
                    .FirstOrDefaultAsync(e => e.Frnc == "000-0000000-0");

                if (empresaSoporte == null)
                {
                    // Crear conexión de soporte SIN base de datos tenant
                    var conexionSoporte = new TbConexion
                    {
                        FnombreBd = "" // VACÍO - No tenant para soporte
                    };
                    dbContext.Conexiones.Add(conexionSoporte);
                    await dbContext.SaveChangesAsync(true);

                    // Crear empresa de soporte
                    empresaSoporte = new TbEmpresa
                    {
                        FnombreEmpresa = "Soporte Técnico",
                        Frnc = "000-0000000-0",
                        Femail = "soporte@sistema.local",
                        Flogo = "",
                        Feslogan = "Equipo de Soporte del Sistema",
                        Factivo = true,
                        FkidConexion = conexionSoporte.FidConexion
                    };
                    dbContext.Empresas.Add(empresaSoporte);
                    await dbContext.SaveChangesAsync(true);

                    Console.WriteLine("✅ Empresa de soporte creada (SIN tenant)");
                }

                var nuevoUsuarioSoporte = new TbUsuarioCentral
                {
                    Fnombre = "Usuario de Soporte",
                    FnombreUsuario = "soporte",
                    Femail = "soporte@sistema.local",
                    Fnivel = 0, // Nivel 0 = Soporte
                    Fpassword = supportUser.PasswordHash,
                    Factivo = true,
                    IdentityId = supportUser.Id,
                    FkidEmpresa = empresaSoporte.FidEmpresa
                };
                dbContext.Usuarios.Add(nuevoUsuarioSoporte);
                await dbContext.SaveChangesAsync(true);

                Console.WriteLine("✅ Usuario de soporte vinculado (SIN tenant)");
            }

            // Verificar y asignar el rol si no lo tiene
            var userRoles = await userManager.GetRolesAsync(supportUser);
            if (!userRoles.Contains(AppConstants.SupportRole))
            {
                var result = await userManager.AddToRoleAsync(supportUser, AppConstants.SupportRole);
                if (!result.Succeeded)
                    throw new Exception(
                        $"Error adding role to existing support: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                Console.WriteLine("✅ Rol Support asignado al usuario de soporte existente");
            }
            else
            {
                Console.WriteLine("ℹ️ Usuario soporte ya tiene el rol Support");
            }
        }
    }

    private static async Task EnsurePermissionsAsync(UserManager<IdentityUser> userManager, IServiceProvider services)
    {
        var supportUser = await userManager.FindByNameAsync("soporte");
        if (supportUser == null) return;

        var dbContext = services.GetRequiredService<CentralDbContext>();
        var allPermissions = Permissions.GetAllPermissions();

        // Acceso directo al DbSet UserClaims expuesto en CentralDbContext
        var userClaimsDbSet = dbContext.UserClaims;
        foreach (var permission in allPermissions)
        {
            var existingClaim = await userClaimsDbSet
                .FirstOrDefaultAsync(uc =>
                    uc.UserId == supportUser.Id &&
                    uc.ClaimType == "Permission" &&
                    uc.ClaimValue == permission);

            if (existingClaim == null)
                await userManager.AddClaimAsync(supportUser, new Claim("Permission", permission));
        }

        Console.WriteLine("✅ Permisos asignados al usuario de soporte");
    }
}