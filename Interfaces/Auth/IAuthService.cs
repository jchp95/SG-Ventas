
using ventas.ViewModels.Auth;

namespace ventas.Services.Auth
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string userName, string password);
        Task<string> RegisterAsync(RegisterRequest request);
        Task<bool> ChangePasswordAsync(string userId, string oldPassword, string newPassword);
    }
}
