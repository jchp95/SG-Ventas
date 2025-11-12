using System.Collections.Generic;

namespace ventas.ViewModels
{
    public class ManagePermissionsViewModel
    {
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public Dictionary<string, List<PermissionViewModel>> PermissionCategories { get; set; }
            = new Dictionary<string, List<PermissionViewModel>>();
        public List<string> SelectedPermissions { get; set; } = new List<string>();
    }

    public class PermissionViewModel
    {
        public string Value { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
    }
}