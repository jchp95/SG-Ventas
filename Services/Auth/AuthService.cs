using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ventas.Context;
using ventas.Interfaces;
using ventas.Interfaces.Tenant;
using ventas.Models.ModelsBdCentral;
using ventas.ViewModels.Auth;

namespace ventas.Services.Auth;

public class AuthService : IAuthService
{
    private readonly CentralDbContext _dbContext;
    private readonly ILogger<AuthService> _logger;
    private readonly IPermissionService _permissionService;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly ITenantDatabaseService _tenantDatabaseService;
    private readonly ITokenService _tokenService;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthService(
        CentralDbContext dbContext,
        SignInManager<IdentityUser> signInManager,
        ILogger<AuthService> logger,
        UserManager<IdentityUser> userManager,
        ITokenService tokenService,
        IPermissionService permissionService,
        ITenantDatabaseService tenantDatabaseService)
    {
        _dbContext = dbContext;
        _signInManager = signInManager;
        _logger = logger;
        _userManager = userManager;
        _tokenService = tokenService;
        _permissionService = permissionService;
        _tenantDatabaseService = tenantDatabaseService;
    }

    public async Task<string> LoginAsync(string userName, string password)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Usuario y contraseña son requeridos");

            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                _logger.LogWarning("Intento de login con usuario inexistente: {UserName}", userName);
                throw new UnauthorizedAccessException("Credenciales inválidas");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, true);

            if (!result.Succeeded)
            {
                _logger.LogWarning("Intento de login fallido para usuario: {UserName}", userName);

                if (result.IsLockedOut)
                    throw new UnauthorizedAccessException("Cuenta bloqueada por múltiples intentos fallidos");

                throw new UnauthorizedAccessException("Credenciales inválidas");
            }

            // Obtener el tenant del usuario usando las FK relacionales
            var usuarioCentral = await _dbContext.Usuarios
                .FirstOrDefaultAsync(u => u.IdentityId == user.Id);

            if (usuarioCentral == null)
                throw new UnauthorizedAccessException("Usuario no encontrado en la base central");

            // Obtener la empresa del usuario
            var empresa = await _dbContext.Empresas
                .FirstOrDefaultAsync(e => e.FidEmpresa == usuarioCentral.FkidEmpresa);

            if (empresa == null) throw new UnauthorizedAccessException("Usuario no tiene empresa asignada");

            // Obtener la conexión tenant de la empresa
            var conexion = await _dbContext.Conexiones
                .FirstOrDefaultAsync(c => c.FidConexion == empresa.FkidConexion);

            if (conexion == null) throw new UnauthorizedAccessException("Empresa no tiene conexión tenant asignada");

            var tenantDbName = conexion.FnombreBd;

            // Obtener roles y permisos
            var roles = await _userManager.GetRolesAsync(user);
            var permissions = await _permissionService.GetUserPermissionsAsync(user.Id);

            // CASO ESPECIAL: Usuario de soporte sin tenant
            // Si FnombreBd está vacío, es un usuario de soporte que NO tiene base de datos tenant
            if (string.IsNullOrWhiteSpace(tenantDbName))
            {
                _logger.LogInformation("🔑 Usuario de soporte detectado (sin tenant): {UserName}", userName);
                var tokenWithoutTenant = _tokenService.GenerateToken(user, roles, permissions);
                _logger.LogInformation("✅ Login exitoso para usuario de soporte: {UserName}", userName);
                return tokenWithoutTenant;
            }

            // CASO NORMAL: Usuario con tenant asignado (usuarios de empresas)
            // Usar el FidUsuario de tb_usuario_central para la auditoría del tenant
            var centralUserId = usuarioCentral.FidUsuario;
            var empresaId = empresa.FidEmpresa;

            var token = _tokenService.GenerateTokenWithTenant(user, roles, permissions, tenantDbName, centralUserId, empresaId);

            _logger.LogInformation(
                "✅ Login exitoso para usuario: {UserName} (Tenant: {TenantDb}, CentralUserId: {CentralUserId}, EmpresaId: {EmpresaId})",
                userName, tenantDbName, centralUserId, empresaId);
            return token;
        }
        catch (Exception ex) when (!(ex is UnauthorizedAccessException || ex is ArgumentException))
        {
            _logger.LogError(ex, "Error inesperado durante el login para usuario: {UserName}", userName);
            throw new InvalidOperationException("Error interno del servidor durante la autenticación");
        }
    }

    public async Task<string> RegisterAsync(RegisterRequest request)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            if (request == null) throw new ArgumentNullException(nameof(request));

            // ====== VALIDACIONES BÁSICAS ======
            if (string.IsNullOrWhiteSpace(request.Name))
                throw new ArgumentException("El nombre completo no puede estar vacío");

            if (string.IsNullOrWhiteSpace(request.UserName))
                throw new ArgumentException("El nombre de usuario no puede estar vacío");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ArgumentException("La contraseña no puede estar vacía");

            if (string.IsNullOrWhiteSpace(request.CompanyName))
                throw new ArgumentException("El nombre de la empresa es requerido");

            if (string.IsNullOrWhiteSpace(request.CompanyRnc))
                throw new ArgumentException("El RNC de la empresa es requerido");

            _logger.LogInformation(
                "🔍 Iniciando validaciones para registro: UserName={UserName}, Email={Email}, CompanyRnc={RNC}",
                request.UserName, request.Email, request.CompanyRnc);

            // ====== VALIDACIÓN 1: Verificar si el usuario ya existe ======
            var existingUser = await _userManager.FindByNameAsync(request.UserName);
            if (existingUser != null)
            {
                _logger.LogWarning("❌ Usuario ya existe: {UserName}", request.UserName);
                throw new InvalidOperationException($"El nombre de usuario '{request.UserName}' ya está en uso");
            }

            // Verificar también por email si se proporciona
            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                var existingEmail = await _userManager.FindByEmailAsync(request.Email);
                if (existingEmail != null)
                {
                    _logger.LogWarning("❌ Email ya existe: {Email}", request.Email);
                    throw new InvalidOperationException($"El email '{request.Email}' ya está registrado");
                }
            }

            // ====== VALIDACIÓN 2: Verificar si la empresa ya existe por RNC ======
            var existingCompanyByRnc = await _dbContext.Empresas
                .FirstOrDefaultAsync(e => e.Frnc == request.CompanyRnc);

            if (existingCompanyByRnc != null)
            {
                _logger.LogWarning("❌ Empresa ya existe con RNC: {RNC}", request.CompanyRnc);
                throw new InvalidOperationException(
                    $"Ya existe una empresa registrada con el RNC '{request.CompanyRnc}'");
            }

            // ====== VALIDACIÓN 3: Verificar si ya existe empresa con el mismo nombre ======
            var existingCompanyByName = await _dbContext.Empresas
                .FirstOrDefaultAsync(e => e.FnombreEmpresa.ToLower() == request.CompanyName.ToLower());

            if (existingCompanyByName != null)
            {
                _logger.LogWarning("❌ Empresa ya existe con nombre: {CompanyName}", request.CompanyName);
                throw new InvalidOperationException(
                    $"Ya existe una empresa registrada con el nombre '{request.CompanyName}'");
            }

            _logger.LogInformation("✅ Validaciones completadas exitosamente");

            // ====== PASO 1: Crear el usuario en Identity ======
            var user = new IdentityUser
            {
                UserName = request.UserName,
                Email = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                _logger.LogError("❌ Error al crear usuario Identity: {Errors}", errors);
                throw new InvalidOperationException($"Error al crear el usuario: {errors}");
            }

            _logger.LogInformation("✅ Usuario Identity creado: {UserName} (ID: {UserId})", request.UserName, user.Id);

            // ====== PASO 2: Generar nombre de base de datos tenant usando iniciales del nombre de empresa + ID secuencial ======
            var tenantDbName = await GenerateTenantDbNameAsync(request.CompanyName);
            _logger.LogInformation("📊 Nombre de base de datos generado: {TenantDbName}", tenantDbName);

            // ====== PASO 3: Crear registro en TbConexion ======
            var nuevaConexion = new TbConexion
            {
                FnombreBd = tenantDbName
            };
            _dbContext.Conexiones.Add(nuevaConexion);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("✅ Conexión creada con ID: {ConexionId}", nuevaConexion.FidConexion);

            // ====== PASO 4: Crear registro en TbEmpresa ======
            var nuevaEmpresa = new TbEmpresa
            {
                FnombreEmpresa = request.CompanyName,
                Frnc = request.CompanyRnc,
                Femail = request.CompanyEmail ?? "",
                Flogo = "",
                Feslogan = "",
                Factivo = true,
                FkidConexion = nuevaConexion.FidConexion
            };
            _dbContext.Empresas.Add(nuevaEmpresa);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("✅ Empresa creada con ID: {EmpresaId}, RNC: {RNC}",
                nuevaEmpresa.FidEmpresa, nuevaEmpresa.Frnc);

            // ====== PASO 5: Asignar rol de ADMINISTRADOR al primer usuario de la empresa ======
            var roleResult = await _userManager.AddToRoleAsync(user, AppConstants.AdministratorRole);
            if (!roleResult.Succeeded)
            {
                var errors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                _logger.LogError("❌ Error al asignar rol Administrador: {Errors}", errors);
                throw new InvalidOperationException($"Error al asignar rol de administrador: {errors}");
            }

            _logger.LogInformation("✅ Rol Administrador asignado al usuario: {UserName}", request.UserName);

            // ====== PASO 6: Crear registro en TbUsuarioCentral ======
            var nuevoUsuario = new TbUsuarioCentral
            {
                Fnombre = request.Name,
                FnombreUsuario = request.UserName,
                Femail = request.Email ?? "",
                Fpassword = user.PasswordHash ?? "",
                Fnivel = 1, // Nivel 1 = Administrador de la empresa
                Factivo = true,
                IdentityId = user.Id,
                FkidEmpresa = nuevaEmpresa.FidEmpresa
            };
            _dbContext.Usuarios.Add(nuevoUsuario);
            await _dbContext.SaveChangesAsync();
            _logger.LogInformation("✅ Usuario administrador de empresa creado con ID: {UsuarioId}",
                nuevoUsuario.FidUsuario);

            // ====== PASO 7: Crear base de datos tenant físicamente ======
            var tenantDbCreated =
                await _tenantDatabaseService.CreateTenantDatabaseAsync(tenantDbName, request.CompanyName);
            if (!tenantDbCreated)
                throw new InvalidOperationException($"No se pudo crear la base de datos tenant: {tenantDbName}");
            _logger.LogInformation("✅ Base de datos tenant creada: {TenantDbName}", tenantDbName);

            // ====== PASO 8: Generar token JWT con claim de tenant, CentralUserId y EmpresaId ======
            var roles = await _userManager.GetRolesAsync(user);
            var permissions = await _permissionService.GetUserPermissionsAsync(user.Id);
            var centralUserId = nuevoUsuario.FidUsuario;
            var empresaId = nuevaEmpresa.FidEmpresa;
            var token = _tokenService.GenerateTokenWithTenant(user, roles, permissions, tenantDbName, centralUserId, empresaId);

            await transaction.CommitAsync();
            _logger.LogInformation(
                "🎉 Registro multi-tenant completado exitosamente: Usuario={UserName} (ADMIN), Empresa={CompanyName}, TenantDB={TenantDb}, CentralUserId={CentralUserId}, EmpresaId={EmpresaId}",
                request.UserName, request.CompanyName, tenantDbName, centralUserId, empresaId);

            return token;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "💥 Error durante el registro para usuario: {UserName}", request?.UserName);

            // Re-lanzar excepciones conocidas tal cual
            if (ex is ArgumentException || ex is ArgumentNullException || ex is InvalidOperationException) throw;

            throw new InvalidOperationException("Error interno del servidor durante el registro", ex);
        }
    }

    public async Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new ArgumentException("Usuario no encontrado");

            var hasPassword = await _userManager.HasPasswordAsync(user);
            if (!hasPassword) throw new InvalidOperationException("El usuario no tiene contraseña establecida");

            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Error al cambiar la contraseña: {errors}");
            }

            _logger.LogInformation("Contraseña cambiada exitosamente para usuario: {UserName}", user.UserName);
            return true;
        }
        catch (Exception ex) when (!(ex is ArgumentException || ex is InvalidOperationException))
        {
            _logger.LogError(ex, "Error inesperado al cambiar contraseña para usuario: {UserId}", userId);
            throw new InvalidOperationException("Error interno del servidor al cambiar la contraseña");
        }
    }

    /// <summary>
    ///     Genera un nombre de base de datos tenant usando convención multi-tenant
    ///     Formato: db_{abreviatura}_of
    ///     - Prefijo: "db_" (identificador de base de datos)
    ///     - Abreviatura: Versión corta y limpia del nombre de empresa (máx 15 caracteres)
    ///     - Sufijo: "_of" (On File/Oficial)
    ///     Ejemplo: "Tecnología del Futuro" -> db_tecfut_of
    ///     Si existe duplicado, agrega número: db_tecfut_of2, db_tecfut_of3, etc.
    /// </summary>
    private async Task<string> GenerateTenantDbNameAsync(string companyName)
    {
        const string PREFIX = "db_";
        const string SUFFIX = "_of";

        // Generar abreviatura del nombre de la empresa
        var abbreviation = GenerateInitials(companyName);

        // Nombre base: db_{abreviatura}_of
        var dbName = $"{PREFIX}{abbreviation}{SUFFIX}";

        // Verificar si ya existe
        var exists = await _dbContext.Conexiones
            .AnyAsync(c => c.FnombreBd == dbName);

        if (exists)
        {
            // Si existe, agregar número incremental
            var counter = 2;
            while (await _dbContext.Conexiones.AnyAsync(c => c.FnombreBd == $"{PREFIX}{abbreviation}{SUFFIX}{counter}"))
                counter++;
            dbName = $"{PREFIX}{abbreviation}{SUFFIX}{counter}";
        }

        _logger.LogInformation("📝 Nombre de DB generado: '{DbName}' para empresa '{CompanyName}'",
            dbName, companyName);
        return dbName;
    }

    /// <summary>
    ///     Genera una abreviatura estandarizada a partir del nombre de la empresa
    ///     REGLAS:
    ///     - Solo letras minúsculas (a-z) y números (0-9)
    ///     - Sin espacios, acentos, ni caracteres especiales
    ///     - Longitud: Mínimo 1 carácter, Máximo 15 caracteres
    ///     ESTRATEGIA:
    ///     1. Nombres cortos (≤3 caracteres): Usa el nombre completo limpio
    ///     Ejemplo: "A" -> "a", "AB" -> "ab", "ABC" -> "abc"
    ///     2. Nombres medianos/largos (>3 caracteres): Toma iniciales de palabras significativas
    ///     - Toma 3 caracteres de cada palabra (máximo 3 palabras)
    ///     - Ignora artículos, preposiciones y sufijos corporativos (S.A., S.R.L., etc.)
    ///     Ejemplo: "Tecnología del Futuro" -> "tecfut"
    ///     "Comercializadora Rápida" -> "comrap"
    ///     "Tiendas La Gran Manzana" -> "tiegraman" (optimizado a "tiegraman")
    /// </summary>
    private string GenerateInitials(string companyName)
    {
        const int MIN_LENGTH = 1;
        const int MAX_LENGTH = 15;
        const int MAX_LENGTH_BEFORE_OPTIMIZATION = 20;
        const int CHARS_PER_WORD_NORMAL = 3;
        const int CHARS_PER_WORD_OPTIMIZED = 2;
        const int MAX_WORDS_NORMAL = 3;
        const int MAX_WORDS_OPTIMIZED = 5;

        if (string.IsNullOrWhiteSpace(companyName)) return "emp"; // Default

        // PASO 1: Limpiar y normalizar el nombre (remover acentos, convertir a minúsculas)
        var cleanName = companyName.ToLowerInvariant()
            .Replace("á", "a").Replace("é", "e").Replace("í", "i")
            .Replace("ó", "o").Replace("ú", "u").Replace("ñ", "n")
            .Replace("ü", "u").Replace("à", "a").Replace("è", "e")
            .Replace("ì", "i").Replace("ò", "o").Replace("ù", "u");

        // PASO 2: Eliminar caracteres especiales (puntos, comas, &, etc.)
        // Solo mantener letras, números y espacios/separadores
        cleanName = Regex.Replace(cleanName, @"[^\w\s]", " ");

        // PASO 3: Remover espacios múltiples y trim
        cleanName = Regex.Replace(cleanName, @"\s+", " ").Trim();

        // PASO 4: Contar caracteres sin espacios para casos especiales
        var cleanNameNoSpaces = cleanName.Replace(" ", "").Replace("-", "").Replace("_", "");

        // CASO ESPECIAL: Nombres muy cortos (≤3 caracteres)
        // "A" -> "a", "AB" -> "ab", "XYZ" -> "xyz"
        if (cleanNameNoSpaces.Length <= 3)
        {
            var result = string.IsNullOrEmpty(cleanNameNoSpaces) ? "emp" : cleanNameNoSpaces;
            _logger.LogDebug("🔤 Nombre corto detectado: '{CompanyName}' -> '{Abbreviation}'",
                companyName, result);
            return result;
        }

        // CASO NORMAL: Nombres con más de 3 caracteres - aplicar lógica de abreviaturas

        // PASO 5: Definir palabras que se ignoran (stop words)
        var stopWords = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            // Artículos
            "el", "la", "los", "las",
            // Preposiciones
            "de", "del", "al", "a", "en", "con", "por", "para", "desde", "hasta",
            // Conjunciones
            "y", "e", "o", "u", "ni",
            // Determinantes
            "un", "una", "unos", "unas",
            // Sufijos corporativos
            "sa", "s.a.", "srl", "s.r.l.", "ca", "c.a.", "ltda", "inc", "corp", "corporation",
            "limited", "ltd", "llc", "sas", "s.a.s."
        };

        // PASO 6: Dividir en palabras y filtrar stop words
        var words = cleanName.Split(new[] { ' ', '-', '_' }, StringSplitOptions.RemoveEmptyEntries)
            .Where(w => !stopWords.Contains(w) && w.Length > 0)
            .ToList();

        if (words.Count == 0)
        {
            // Si después de filtrar no quedan palabras, usar el nombre limpio completo
            var fallback = cleanNameNoSpaces.Length <= MAX_LENGTH
                ? cleanNameNoSpaces
                : cleanNameNoSpaces.Substring(0, MAX_LENGTH);
            _logger.LogDebug("⚠️ No hay palabras válidas después de filtrar. Usando fallback: '{Fallback}'", fallback);
            return string.IsNullOrEmpty(fallback) ? "emp" : fallback;
        }

        // PASO 7: ESTRATEGIA PRINCIPAL - Tomar N caracteres de cada palabra
        var abbreviation = "";

        foreach (var word in words.Take(MAX_WORDS_NORMAL))
        {
            var charsToTake = Math.Min(CHARS_PER_WORD_NORMAL, word.Length);
            abbreviation += word.Substring(0, charsToTake);
        }

        _logger.LogDebug("🔠 Abreviatura inicial (3 chars/palabra): '{Abbreviation}' (longitud: {Length})",
            abbreviation, abbreviation.Length);

        // PASO 8: OPTIMIZACIÓN - Si la abreviatura es muy larga, reducir caracteres por palabra
        if (abbreviation.Length > MAX_LENGTH_BEFORE_OPTIMIZATION)
        {
            abbreviation = "";
            foreach (var word in words.Take(MAX_WORDS_OPTIMIZED))
            {
                var charsToTake = Math.Min(CHARS_PER_WORD_OPTIMIZED, word.Length);
                abbreviation += word.Substring(0, charsToTake);
            }

            _logger.LogDebug("✂️ Abreviatura optimizada (2 chars/palabra): '{Abbreviation}' (longitud: {Length})",
                abbreviation, abbreviation.Length);
        }

        // PASO 9: TRUNCAR - Si aún excede el máximo, cortar
        if (abbreviation.Length > MAX_LENGTH)
        {
            abbreviation = abbreviation.Substring(0, MAX_LENGTH);
            _logger.LogDebug("✂️ Abreviatura truncada a máximo ({MaxLength}): '{Abbreviation}'",
                MAX_LENGTH, abbreviation);
        }

        // PASO 10: VALIDACIÓN FINAL - Garantizar mínimo de caracteres
        if (abbreviation.Length < MIN_LENGTH)
        {
            abbreviation = words[0].Substring(0, Math.Min(3, words[0].Length));
            _logger.LogWarning("⚠️ Abreviatura muy corta, usando primera palabra: '{Abbreviation}'", abbreviation);
        }

        _logger.LogInformation("✅ Abreviatura generada: '{CompanyName}' -> '{Abbreviation}' (longitud: {Length})",
            companyName, abbreviation, abbreviation.Length);

        return abbreviation;
    }
}