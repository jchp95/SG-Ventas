using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ventas.Interfaces;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(IdentityUser user, IList<string> roles, IList<string> permissions)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);

        if (user == null)
            throw new ArgumentNullException(nameof(user));
        if (string.IsNullOrWhiteSpace(user.UserName))
            throw new ArgumentNullException(nameof(user.UserName), "UserName no puede ser null");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email ?? string.Empty)
        };

        if (roles != null && roles.Count > 0)
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

        if (permissions != null && permissions.Count > 0)
            foreach (var permission in permissions.Distinct())
                claims.Add(new Claim("Permission", permission));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string GenerateTokenWithTenant(IdentityUser user, IList<string> roles, IList<string> permissions,
        string tenantDbName, int? centralUserId = null, int? empresaId = null)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);

        if (user == null)
            throw new ArgumentNullException(nameof(user));
        if (string.IsNullOrWhiteSpace(user.UserName))
            throw new ArgumentNullException(nameof(user.UserName), "UserName no puede ser null");
        if (string.IsNullOrWhiteSpace(tenantDbName))
            throw new ArgumentNullException(nameof(tenantDbName), "TenantDbName no puede ser null");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new("TenantDbName", tenantDbName) // Claim crucial para el middleware
        };

        // Agregar el UserId CENTRAL (de tb_usuario_central) para la auditoría
        if (centralUserId.HasValue && centralUserId.Value > 0)
            claims.Add(new Claim("UserId", centralUserId.Value.ToString()));

        // Agregar el EmpresaId para filtros de auditoría central
        if (empresaId.HasValue && empresaId.Value > 0)
            claims.Add(new Claim("EmpresaId", empresaId.Value.ToString()));

        if (roles != null && roles.Count > 0)
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

        if (permissions != null && permissions.Count > 0)
            foreach (var permission in permissions.Distinct())
                claims.Add(new Claim("Permission", permission));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}