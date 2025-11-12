using Microsoft.AspNetCore.Identity;

namespace ventas.Interfaces;

public interface ITokenService
{
    string GenerateToken(IdentityUser user, IList<string> roles, IList<string> permissions);

    string GenerateTokenWithTenant(IdentityUser user, IList<string> roles, IList<string> permissions,
        string tenantDbName, int? centralUserId = null, int? empresaId = null);
}