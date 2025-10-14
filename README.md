# SG-Ventas

Sistema de gestión de ventas multi-tenant con ASP.NET Core 9 y Entity Framework Core.

## Requisitos previos

- .NET 9 SDK
- SQL Server (local o remoto)
- Git

## Instalación y primer uso

1. **Clona el repositorio:**
   ```bash
   git clone git@github.com:jchp95/SG-Ventas.git
   cd SG-Ventas
   ```
2. **Restaura dependencias:**
   ```bash
   dotnet restore
   ```
3. **Configura tu base de datos y secretos:**
   - Crea un archivo `appsettings.json` local (no se incluye por seguridad).
   - O usa [dotnet user-secrets](https://learn.microsoft.com/es-es/aspnet/core/security/app-secrets) para desarrollo:
     ```bash
     dotnet user-secrets set "ConnectionStrings:CentralDB" "<cadena-conexion>"
     dotnet user-secrets set "Jwt:Key" "<clave-secreta>"
     ```
4. **Ejecuta las migraciones y el proyecto:**
   ```bash
   dotnet ef database update
   dotnet run
   ```

## Estructura recomendada de `appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "CentralDB": "<cadena-conexion>",
    "TemplateTenant": "<cadena-conexion-tenant>"
  },
  "Jwt": {
    "Key": "<clave-secreta>",
    "Issuer": "Ventas",
    "Audience": "VentasUsers"
  },
  "Tenants": [
    {
      "DatabaseName": "Tenant1DB",
      "Empresa": {
        "Nombre": "Empresa Uno",
        "RNC": "123456789",
        "Email": "empresa1@email.com",
        "Logo": "logo1.png",
        "Eslogan": "¡Somos los mejores!",
        "Activo": true
      }
    }
  ]
}
```

## Seguridad
- **No subas archivos con secretos reales a GitHub.**
- Usa `dotnet user-secrets` para desarrollo local.
- El archivo `.gitignore` ya está configurado para proteger tus secretos.

## Créditos
- Desarrollado por Julio (jchp95)

---
¿Dudas o sugerencias? Abre un issue o contacta al autor.

