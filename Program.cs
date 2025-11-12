using System.Reflection;
using System.Text;
using System.Text.Json;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using React.AspNet;
using Serilog;
using Serilog.Exceptions;
using ventas.Context;
using ventas.Interfaces;
using ventas.Interfaces.Auditoria;
using ventas.Interfaces.Cliente;
using ventas.Interfaces.Tenant;
using ventas.Interfaces.Usuario;
using ventas.Middleware;
using ventas.Models.ModelsBdCentral;
using ventas.Services;
using ventas.Services.Auditoria;
using ventas.Services.Auth;
using ventas.Services.Cliente;
using ventas.Services.Tenant;
using ventas.Services.Usuario;
using ventas.ViewModels.Response;

namespace ventas;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configuración de Serilog
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration)
            .Enrich.FromLogContext()
            .Enrich.WithExceptionDetails()
            .WriteTo.Console()
            .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

        builder.Host.UseSerilog();
        builder.Logging.ClearProviders();

        // =======================
        // 1) CORS
        // =======================
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        // =======================
        // 2) DbContexts
        // =======================
        builder.Services.AddDbContext<CentralDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("CentralDB")));
        builder.Services.AddScoped<TenantDbContextService>();

        builder.Services.AddScoped<TenantDbContext>(sp =>
        {
            var factory = sp.GetRequiredService<TenantDbContextService>();
            return factory.CreateContext();
        });

        // =======================
        // 3) Configuración Identity (solo para autenticación, sin UI)
        // =======================
        builder.Services.AddIdentityCore<IdentityUser>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 2;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultProvider;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<CentralDbContext>()
            .AddDefaultTokenProviders()
            .AddSignInManager();

        // =======================
        // 4) JWT Authentication (esquema principal)
        // =======================
        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var jwtSecretKey = builder.Configuration["Jwt:SecretKey"];
                if (string.IsNullOrEmpty(jwtSecretKey))
                    throw new InvalidOperationException("JWT Secret Key is not configured");

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSecretKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"].FirstOrDefault();
                        if (!string.IsNullOrEmpty(accessToken))
                        {
                            context.Token = accessToken;
                        }
                        else
                        {
                            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
                                context.Token = authHeader.Substring("Bearer ".Length).Trim();
                        }

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        Log.Warning("Authentication failed: {Message}", context.Exception.Message);
                        return Task.CompletedTask;
                    }
                };
            });

        // =======================
        // 5) ReactJS.NET con V8
        // =======================
        builder.Services.AddMemoryCache(); // Requerido por ReactJS.NET
        builder.Services.AddReact();
        builder.Services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
            .AddV8();

        // =======================
        // 6) Authorization Policies
        // =======================
        builder.Services.AddAuthorization(options =>
        {
            var permissions = typeof(Permissions).GetNestedTypes()
                .SelectMany(t => t.GetFields(BindingFlags.Public | BindingFlags.Static))
                .Where(f => f.FieldType == typeof(string))
                .Select(f => (string)f.GetValue(null));

            foreach (var permission in permissions)
                options.AddPolicy(permission, policy => policy.RequireClaim("Permission", permission));

            options.AddPolicy("RequiereRolAdministrador", policy =>
            {
                policy.RequireRole(AppConstants.AdministratorRole);
                policy.RequireAuthenticatedUser();
            });

            options.AddPolicy("RequiereRolUsuario", policy =>
            {
                policy.RequireRole(AppConstants.UserRole, AppConstants.AdministratorRole);
                policy.RequireAuthenticatedUser();
            });

            options.AddPolicy("ApiPolicy", policy =>
            {
                policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                policy.RequireAuthenticatedUser();
            });
        });

        // =======================
        // 7) Servicios personalizados
        // =======================
        builder.Services.AddHttpContextAccessor(); // Necesario para auditoría y multi-tenancy
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IPermissionService, PermissionService>();
        builder.Services.AddScoped<ITenantDatabaseService, TenantDatabaseService>();
        builder.Services.AddScoped<IUsuarioService, UsuarioService>();
        builder.Services.AddScoped<IClienteService, ClienteService>();
        builder.Services.AddScoped<IAuditoriaService, AuditoriaService>(); // Servicio de auditoría dual

        // =======================
        // 8) Controllers (API + Views para Layout)
        // =======================
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });

        // Agregar soporte para Views/Controllers MVC (necesario para _Layout.cshtml)
        builder.Services.AddControllersWithViews();

        // =======================
        // 9) Swagger/OpenAPI
        // =======================
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Ventas API",
                Version = "v1",
                Description = "API para sistema de ventas con multi-tenancy"
            });

            // Configurar JWT en Swagger
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        var app = builder.Build();

        // Logging automático
        app.UseSerilogRequestLogging();

        // =======================
        // Swagger UI
        // =======================
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ventas API v1");
                c.RoutePrefix = "swagger";
            });
        }

        // =======================
        // ReactJS.NET Middleware
        // =======================
        app.UseReact(config =>
        {
            config.SetLoadBabel(false)
                // COMPONENTES
                .AddScriptWithoutTransform("~/Scripts/Components/Navbar.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Footer.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Sidebar.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Toasts.js")
                .AddScriptWithoutTransform("~/Scripts/Components/ChartHome.js")
                .AddScriptWithoutTransform("~/Scripts/Components/ActividadesRecientes.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvas.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvasActRecientes.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvasPermissions.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Tables/TableUsers.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Tables/TableClientes.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Tables/TableAuditoria.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Modal/Modal.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Modal/CreateUserModal.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Modal/CreateClienteModal.js")
                
                // REDUX
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/appActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/usuariosActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/clientesActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/ventasActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/authActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/auditoriaActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/appReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/usuariosReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/clientesReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/ventasReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/authReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/auditoriaReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Selectors/index.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Store/index.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Hooks/index.js")
                // UTILS
                .AddScriptWithoutTransform("~/Scripts/Utils/Fecha/formatDate.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Moneda/formatCurrency.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Validacion/HookFormUtils.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Numero/IntegerUtils.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Token/JwtUtils.js")

                // Constants (DEBE cargarse ANTES de los Actions que lo usan)
                .AddScriptWithoutTransform("~/Scripts/Constantes/RoleConstants.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Paises/Pais.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Provincias/Provincia.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Ciudades/Ciudad.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Municipios/Municipio.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Sectores/Sector.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Nacionalidades/Nacionalidad.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/EstadosCiviles/EstadoCivil.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/TiposClientes/TipoCliente.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/ActividadesComerciales/ActividadComercial.js")
                .AddScriptWithoutTransform("~/Scripts/Constantes/Moneda/Moneda.js")
                
                // PAGES
                .AddScriptWithoutTransform("~/Scripts/Pages/Auth/Register.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Home/Home.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Home/ComunHome.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Users/UsersList.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Clientes/ClientesList.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Auditoria/AuditoriaList.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Settings/Settings.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Redux/ExampleReduxPage.js")
                // MAIN APP
                .AddScriptWithoutTransform("~/Scripts/App.js")
                .AddScriptWithoutTransform("~/Scripts/AppRouter.js");
        });

        // =======================
        // Middleware de excepciones para API
        // =======================
        app.Use(async (context, next) =>
        {
            try
            {
                await next();
            }
            catch (Exception ex)
            {
                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";
                    var errorResponse = new ApiResponse<string>(false, "Error interno del servidor", ex.Message);
                    await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
                }
                else
                {
                    throw;
                }
            }
        });

        // =======================
        // HTTP Pipeline
        // =======================
        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();
        app.UseCors("AllowAll");

        app.UseAuthentication();
        app.UseMiddleware<TenantMiddleware>();
        app.UseAuthorization();

        // =======================
        // Endpoints
        // =======================
        // Mapear controladores API
        app.MapControllers();

        // Ruta MVC por defecto
        app.MapControllerRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

        // Fallback para React Router - redirecciona todas las rutas que no sean API ni archivos estáticos
        app.MapFallbackToController("Index", "Home");

        // Inicialización de la base de datos
        await InitializeDatabase(app);
        await app.RunAsync();

        async Task InitializeDatabase(WebApplication webApp)
        {
            using var scope = webApp.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogInformation("Inicializando base de datos...");

                var dbContext = services.GetRequiredService<CentralDbContext>();
                await dbContext.Database.MigrateAsync();
                await SeedData.InitializeAsync(services);

                logger.LogInformation("Base de datos inicializada correctamente.");
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error al inicializar la base de datos");
            }
        }
    }
}