using Microsoft.AspNetCore.Identity;
using ventas.ViewModels;

public interface IPermissionService
{
    Task<List<string>> GetUserPermissionsAsync(string userId);
    Task<IdentityResult> UpdateUserPermissionsAsync(string userId, List<string> permissions);
    Task<List<IdentityUser>> GetAllUsersAsync();
    Task<Dictionary<string, List<PermissionViewModel>>> GetCategorizedPermissionsAsync(string userId);
    Task<List<string>> GetAllAvailablePermissionsAsync();
}