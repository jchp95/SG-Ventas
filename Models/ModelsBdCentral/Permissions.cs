using System.Reflection;

namespace ventas.Models.ModelsBdCentral;

public class Permissions
{
    public static List<string> GetAllPermissions()
    {
        return typeof(Permissions)
            .GetNestedTypes()
            .SelectMany(t => t.GetFields(BindingFlags.Public | BindingFlags.Static))
            .Where(f => f.FieldType == typeof(string))
            .Select(f => (string)f.GetValue(null))
            .ToList();
    }

    public static Dictionary<string, List<string>> GetPermissionsByCategory()
    {
        return new Dictionary<string, List<string>>
        {
            ["Home"] = new() { Home.Ver }
        };
    }

    // Permisos para vista Home
    public static class Home
    {
        public const string Ver = "Permissions.Home.Ver";
    }
}