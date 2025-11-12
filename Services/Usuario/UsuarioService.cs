using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Interfaces.Usuario;
using ventas.Models.ModelsBdCentral;
using ventas.ViewModels.Usuario;

namespace ventas.Services.Usuario;

public class UsuarioService : IUsuarioService
{
    private readonly CentralDbContext _centralDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<UsuarioService> _logger;
    private readonly UserManager<IdentityUser> _userManager;

    public UsuarioService(
        CentralDbContext centralDbContext,
        UserManager<IdentityUser> userManager,
        ILogger<UsuarioService> logger,
        IHttpContextAccessor httpContextAccessor)
    {
        _centralDbContext = centralDbContext;
        _userManager = userManager;
        _logger = logger;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<UsuarioResponse> CreateUsuarioAsync(CreateUsuarioRequest request)
    {
        using var transaction = await _centralDbContext.Database.BeginTransactionAsync();
        try
        {
            // Validar que el usuario autenticado tenga una empresa asignada
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            // Validar que el nombre de usuario no exista
            var existingIdentityUser = await _userManager.FindByNameAsync(request.NombreUsuario);
            if (existingIdentityUser != null)
                throw new InvalidOperationException($"El nombre de usuario '{request.NombreUsuario}' ya está en uso");

            // Validar que el email no exista
            if (!string.IsNullOrEmpty(request.Email))
            {
                var existingEmail = await _userManager.FindByEmailAsync(request.Email);
                if (existingEmail != null)
                    throw new InvalidOperationException($"El email '{request.Email}' ya está registrado");
            }

            // Validar que el nombre de usuario no exista en tb_usuario_central
            var existingUsuarioCentral = await _centralDbContext.Usuarios
                .FirstOrDefaultAsync(u => u.FnombreUsuario == request.NombreUsuario);
            if (existingUsuarioCentral != null)
                throw new InvalidOperationException(
                    $"El nombre de usuario '{request.NombreUsuario}' ya existe en el sistema");

            _logger.LogInformation("Creando nuevo usuario: {UserName} para empresa {EmpresaId}",
                request.NombreUsuario, empresaId);

            // 1. Crear usuario en Identity
            var identityUser = new IdentityUser
            {
                UserName = request.NombreUsuario,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error al crear el usuario en Identity: {errors}");
            }

            _logger.LogInformation("Usuario Identity creado: {UserName} (ID: {UserId})",
                request.NombreUsuario, identityUser.Id);

            // 2. Asignar rol al usuario
            var roleResult = await _userManager.AddToRoleAsync(identityUser, request.Rol);
            if (!roleResult.Succeeded)
            {
                var errors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error al asignar rol: {errors}");
            }

            _logger.LogInformation("Rol {Rol} asignado al usuario: {UserName}", request.Rol, request.NombreUsuario);

            // 3. Asignar nivel según el rol
            int nivel = request.Rol.Equals("Administrador", StringComparison.OrdinalIgnoreCase) ? 1 : 2;

            // 4. Asignar permisos si se proporcionaron
            if (request.Permisos != null && request.Permisos.Any())
            {
                foreach (var permiso in request.Permisos)
                    await _userManager.AddClaimAsync(identityUser, new Claim("Permission", permiso));
                _logger.LogInformation("Asignados {Count} permisos al usuario: {UserName}",
                    request.Permisos.Count, request.NombreUsuario);
            }

            // 5. Crear registro en tb_usuario_central
            var nuevoUsuarioCentral = new TbUsuarioCentral
            {
                Fnombre = request.Nombre,
                FnombreUsuario = request.NombreUsuario,
                Femail = request.Email,
                Fpassword = identityUser.PasswordHash ?? "",
                Fnivel = nivel, // Nivel asignado automáticamente según el rol
                Factivo = request.Activo,
                IdentityId = identityUser.Id,
                FkidEmpresa = empresaId.Value
            };

            _centralDbContext.Usuarios.Add(nuevoUsuarioCentral);
            await _centralDbContext.SaveChangesAsync();

            _logger.LogInformation("Usuario creado en tb_usuario_central con ID: {UsuarioId}",
                nuevoUsuarioCentral.FidUsuario);

            await transaction.CommitAsync();

            // 5. Retornar respuesta
            var empresa = await _centralDbContext.Empresas
                .FirstOrDefaultAsync(e => e.FidEmpresa == empresaId.Value);

            var roles = await _userManager.GetRolesAsync(identityUser);
            var claims = await _userManager.GetClaimsAsync(identityUser);
            var permisos = claims.Where(c => c.Type == "Permission").Select(c => c.Value).ToList();

            return new UsuarioResponse
            {
                FidUsuario = nuevoUsuarioCentral.FidUsuario,
                Nombre = nuevoUsuarioCentral.Fnombre,
                NombreUsuario = nuevoUsuarioCentral.FnombreUsuario,
                Email = nuevoUsuarioCentral.Femail,
                Nivel = nuevoUsuarioCentral.Fnivel,
                Activo = nuevoUsuarioCentral.Factivo,
                IdentityId = nuevoUsuarioCentral.IdentityId,
                FkidEmpresa = nuevoUsuarioCentral.FkidEmpresa,
                NombreEmpresa = empresa?.FnombreEmpresa ?? "",
                Roles = roles.ToList(),
                Permisos = permisos
            };
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error al crear usuario: {UserName}", request.NombreUsuario);
            throw;
        }
    }

    public async Task<List<UsuarioResponse>> GetUsuariosByTenantAsync()
    {
        try
        {
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            _logger.LogInformation("Obteniendo usuarios de la empresa {EmpresaId}", empresaId);

            var usuarios = await _centralDbContext.Usuarios
                .Where(u => u.FkidEmpresa == empresaId.Value)
                .ToListAsync();

            var usuariosResponse = new List<UsuarioResponse>();

            foreach (var usuario in usuarios)
            {
                var identityUser = await _userManager.FindByIdAsync(usuario.IdentityId);
                if (identityUser == null) continue;

                var roles = await _userManager.GetRolesAsync(identityUser);
                var claims = await _userManager.GetClaimsAsync(identityUser);
                var permisos = claims.Where(c => c.Type == "Permission").Select(c => c.Value).ToList();

                // Obtener el nombre de la empresa
                var empresa = await _centralDbContext.Empresas
                    .FirstOrDefaultAsync(e => e.FidEmpresa == usuario.FkidEmpresa);

                usuariosResponse.Add(new UsuarioResponse
                {
                    FidUsuario = usuario.FidUsuario,
                    Nombre = usuario.Fnombre,
                    NombreUsuario = usuario.FnombreUsuario,
                    Email = usuario.Femail,
                    Nivel = usuario.Fnivel,
                    Activo = usuario.Factivo,
                    IdentityId = usuario.IdentityId,
                    FkidEmpresa = usuario.FkidEmpresa,
                    NombreEmpresa = empresa?.FnombreEmpresa ?? "",
                    Roles = roles.ToList(),
                    Permisos = permisos
                });
            }

            _logger.LogInformation("Se obtuvieron {Count} usuarios para la empresa {EmpresaId}",
                usuariosResponse.Count, empresaId);

            return usuariosResponse;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener usuarios del tenant");
            throw;
        }
    }

    public async Task<UsuarioResponse?> GetUsuarioByIdAsync(int usuarioId)
    {
        try
        {
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.FidUsuario == usuarioId && u.FkidEmpresa == empresaId.Value)
                .FirstOrDefaultAsync();

            if (usuario == null) return null;

            var identityUser = await _userManager.FindByIdAsync(usuario.IdentityId);
            if (identityUser == null) return null;

            var roles = await _userManager.GetRolesAsync(identityUser);
            var claims = await _userManager.GetClaimsAsync(identityUser);
            var permisos = claims.Where(c => c.Type == "Permission").Select(c => c.Value).ToList();

            // Obtener el nombre de la empresa
            var empresa = await _centralDbContext.Empresas
                .FirstOrDefaultAsync(e => e.FidEmpresa == usuario.FkidEmpresa);

            return new UsuarioResponse
            {
                FidUsuario = usuario.FidUsuario,
                Nombre = usuario.Fnombre,
                NombreUsuario = usuario.FnombreUsuario,
                Email = usuario.Femail,
                Nivel = usuario.Fnivel,
                Activo = usuario.Factivo,
                IdentityId = usuario.IdentityId,
                FkidEmpresa = usuario.FkidEmpresa,
                NombreEmpresa = empresa?.FnombreEmpresa ?? "",
                Roles = roles.ToList(),
                Permisos = permisos
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener usuario {UsuarioId}", usuarioId);
            throw;
        }
    }

    public async Task<UsuarioResponse> UpdateUsuarioAsync(UpdateUsuarioRequest request)
    {
        using var transaction = await _centralDbContext.Database.BeginTransactionAsync();
        try
        {
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.FidUsuario == request.FidUsuario && u.FkidEmpresa == empresaId.Value)
                .FirstOrDefaultAsync();

            if (usuario == null)
                throw new InvalidOperationException("Usuario no encontrado o no pertenece a su empresa");

            var identityUser = await _userManager.FindByIdAsync(usuario.IdentityId);
            if (identityUser == null) throw new InvalidOperationException("Usuario de Identity no encontrado");

            _logger.LogInformation("Actualizando usuario {UsuarioId}", request.FidUsuario);

            // Actualizar campos si se proporcionaron
            if (!string.IsNullOrEmpty(request.Nombre)) usuario.Fnombre = request.Nombre;

            if (!string.IsNullOrEmpty(request.NombreUsuario))
            {
                // Validar que el nuevo nombre de usuario no esté en uso
                var existingUserName = await _userManager.FindByNameAsync(request.NombreUsuario);
                if (existingUserName != null && existingUserName.Id != identityUser.Id)
                    throw new InvalidOperationException($"El nombre de usuario '{request.NombreUsuario}' ya está en uso");
                
                // Validar que no exista en tb_usuario_central
                var existingUsuarioCentral = await _centralDbContext.Usuarios
                    .FirstOrDefaultAsync(u => u.FnombreUsuario == request.NombreUsuario && u.IdentityId != identityUser.Id);
                if (existingUsuarioCentral != null)
                    throw new InvalidOperationException($"El nombre de usuario '{request.NombreUsuario}' ya existe en el sistema");

                usuario.FnombreUsuario = request.NombreUsuario;
                identityUser.UserName = request.NombreUsuario;
            }

            if (!string.IsNullOrEmpty(request.Email))
            {
                // Validar que el nuevo email no esté en uso
                var existingEmail = await _userManager.FindByEmailAsync(request.Email);
                if (existingEmail != null && existingEmail.Id != identityUser.Id)
                    throw new InvalidOperationException($"El email '{request.Email}' ya está en uso");
                usuario.Femail = request.Email;
                identityUser.Email = request.Email;
            }

            if (request.Activo.HasValue) usuario.Factivo = request.Activo.Value;

            // Actualizar rol si se proporcionó
            if (!string.IsNullOrEmpty(request.Rol))
            {
                var currentRoles = await _userManager.GetRolesAsync(identityUser);
                await _userManager.RemoveFromRolesAsync(identityUser, currentRoles);
                await _userManager.AddToRoleAsync(identityUser, request.Rol);

                // Asignar nivel según el rol actualizado
                usuario.Fnivel = request.Rol.Equals("Administrador", StringComparison.OrdinalIgnoreCase) ? 1 : 2;
            }
            else if (request.Nivel.HasValue)
            {
                // Solo actualizar nivel directamente si no se actualizó el rol
                usuario.Fnivel = request.Nivel.Value;
            }

            // Actualizar permisos si se proporcionaron
            if (request.Permisos != null)
            {
                var currentClaims = await _userManager.GetClaimsAsync(identityUser);
                var permissionClaims = currentClaims.Where(c => c.Type == "Permission").ToList();
                await _userManager.RemoveClaimsAsync(identityUser, permissionClaims);

                foreach (var permiso in request.Permisos)
                    await _userManager.AddClaimAsync(identityUser, new Claim("Permission", permiso));
            }

            await _userManager.UpdateAsync(identityUser);
            await _centralDbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            _logger.LogInformation("Usuario {UsuarioId} actualizado exitosamente", request.FidUsuario);

            return await GetUsuarioByIdAsync(request.FidUsuario) ??
                   throw new InvalidOperationException("Error al obtener usuario actualizado");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error al actualizar usuario {UsuarioId}", request.FidUsuario);
            throw;
        }
    }

    public async Task<bool> DeleteUsuarioAsync(int usuarioId)
    {
        try
        {
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.FidUsuario == usuarioId && u.FkidEmpresa == empresaId.Value)
                .FirstOrDefaultAsync();

            if (usuario == null)
                throw new InvalidOperationException("Usuario no encontrado o no pertenece a su empresa");

            _logger.LogInformation("Desactivando usuario {UsuarioId}", usuarioId);

            usuario.Factivo = false;
            await _centralDbContext.SaveChangesAsync();

            _logger.LogInformation("Usuario {UsuarioId} desactivado exitosamente", usuarioId);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al desactivar usuario {UsuarioId}", usuarioId);
            throw;
        }
    }

    public async Task<bool> ActivateUsuarioAsync(int usuarioId)
    {
        try
        {
            var empresaId = await ObtenerEmpresaUsuarioActual();
            if (empresaId == null)
                throw new InvalidOperationException("No se pudo identificar la empresa del usuario actual");

            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.FidUsuario == usuarioId && u.FkidEmpresa == empresaId.Value)
                .FirstOrDefaultAsync();

            if (usuario == null)
                throw new InvalidOperationException("Usuario no encontrado o no pertenece a su empresa");

            _logger.LogInformation("Activando usuario {UsuarioId}", usuarioId);

            usuario.Factivo = true;
            await _centralDbContext.SaveChangesAsync();

            _logger.LogInformation("Usuario {UsuarioId} activado exitosamente", usuarioId);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al activar usuario {UsuarioId}", usuarioId);
            throw;
        }
    }

    /// <summary>
    ///     Obtiene el ID de la empresa del usuario autenticado actual
    /// </summary>
    private async Task<int?> ObtenerEmpresaUsuarioActual()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null) return null;

        // Obtener Identity ID del usuario autenticado
        var identityId = httpContext.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(identityId)) return null;

        try
        {
            // Buscar el usuario en TbUsuarios usando el IdentityId
            var usuario = await _centralDbContext.Usuarios
                .Where(u => u.IdentityId == identityId)
                .Select(u => u.FkidEmpresa)
                .FirstOrDefaultAsync();

            return usuario;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error obteniendo empresa del usuario actual");
            return null;
        }
    }
}