using System.Reflection;
using System.Text;
using System.Text.Json;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using React.AspNet;
using ventas.Context;
using ventas.Middleware;
using ventas.Models.ModelsBdCentral;
using ventas.Services;

namespace ventas;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // =======================
        // 0) Configuración de logging
        // =======================
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();
        builder.Logging.AddDebug();

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

        // Crea el TenantDbContext por request usando el tenant del HttpContext
        builder.Services.AddScoped<TenantDbContext>(sp =>
        {
            var factory = sp.GetRequiredService<TenantDbContextService>();
            return factory.CreateContext(); // usa HttpContext.Items["TenantConnection"]
        });

        // =======================
        // 3) Configuración Identity
        // ======================
        builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 2;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // Configuración del token de recuperación de contraseña
                options.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultProvider;
            })
            .AddEntityFrameworkStores<CentralDbContext>()
            .AddDefaultUI()
            .AddDefaultTokenProviders();

        // ======================================
        // 4) Configuración del tiempo de vida del token
        // ======================================
        builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
        {
            options.TokenLifespan = TimeSpan.FromHours(1); // 1 hora de duración
        });

        // ======================================
        // 5) Configuración de autenticación dual (Cookies + JWT)
        // ======================================

        builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
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
                        context.Token = context.Request.Query["access_token"];
                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                        return Task.CompletedTask;
                    }
                };
            });

        // =======================
        // ReactJS.NET con V8
        // =======================
        builder.Services.AddReact();
        builder.Services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
            .AddV8();

        // ======================================
        // 6) Configuración de autorización
        // ======================================

        builder.Services.AddAuthorization(options =>
        {
            // Políticas basadas en permisos 
            var permissions = typeof(Permissions).GetNestedTypes()
                .SelectMany(t => t.GetFields(BindingFlags.Public |
                                             BindingFlags.Static))
                .Where(f => f.FieldType == typeof(string))
                .Select(f => (string)f.GetValue(null));

            foreach (var permission in permissions)
                options.AddPolicy(permission, policy => policy.RequireClaim("Permission", permission));

            // POLÍTICAS BASADAS EN ROLES - AGREGAR ESTO
            options.AddPolicy("RequiereRolAdministrador", policy =>
            {
                policy.RequireRole(AppConstants.AdministratorRole);
                policy.RequireAuthenticatedUser();
            });

            options.AddPolicy("RequiereRolUsuario", policy =>
            {
                policy.RequireRole(AppConstants.UserRole, AppConstants.AdministratorRole); // Usuario, Gerente o Admin
                policy.RequireAuthenticatedUser();
            });

            // Política para cualquier usuario autenticado
            options.AddPolicy("RequiereAutenticacion", policy => { policy.RequireAuthenticatedUser(); });

            // Política para API (JWT)
            options.AddPolicy("ApiPolicy", policy =>
            {
                policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                policy.RequireAuthenticatedUser();
            });

            // Política para MVC (Cookies)
            options.AddPolicy("MvcPolicy", policy =>
            {
                policy.AddAuthenticationSchemes(IdentityConstants.ApplicationScheme);
                policy.RequireAuthenticatedUser();
            });
        });

        // ======================================
        // 7) Configuracion Antiforgery
        // ======================================
        builder.Services.AddAntiforgery(options => { options.HeaderName = "RequestVerificationToken"; });

        // ======================================
        //  Servicios personalizados
        // ======================================
        builder.Services.AddControllersWithViews();

        builder.Services.AddControllersWithViews(options =>
        {
            options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
        });

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });

        var app = builder.Build();

        // =======================
        // ReactJS.NET Middleware
        // =======================
        app.UseReact(config =>
        {
            config
                .SetLoadBabel(false)
                //////////////////
                // COMPONENTES 
                //////////////////
                .AddScriptWithoutTransform("~/Scripts/Components/Navbar.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Footer.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Sidebar.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Toasts.js")
                .AddScriptWithoutTransform("~/Scripts/Components/ChartHome.js")
                .AddScriptWithoutTransform("~/Scripts/Components/ActividadesRecientes.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvas.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvasActRecientes.js")
                .AddScriptWithoutTransform("~/Scripts/Components/OffCanvas/OffCanvasPermissions.js")
                .AddScriptWithoutTransform("~/Scripts/Components/TableUsers.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Modal/Modal.js")
                .AddScriptWithoutTransform("~/Scripts/Components/Modal/CreateUserModal.js")

                //////////////////
                // REDUX - Nueva estructura modular
                //////////////////
                // Actions
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/appActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/usuariosActions.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Actions/ventasActions.js")
                
                // Reducers
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/appReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/usuariosReducer.js")
                .AddScriptWithoutTransform("~/Scripts/Redux/Reducers/ventasReducer.js")
                
                // Selectors
                .AddScriptWithoutTransform("~/Scripts/Redux/Selectors/index.js")
                
                // Store
                .AddScriptWithoutTransform("~/Scripts/Redux/Store/index.js")
                
                // Hooks/Provider
                .AddScriptWithoutTransform("~/Scripts/Redux/Hooks/index.js")

                //////////////////
                // UTILS
                //////////////////
                .AddScriptWithoutTransform("~/Scripts/Utils/Fecha/formatDate.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Moneda/formatCurrency.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Validacion/HookFormUtils.js")
                .AddScriptWithoutTransform("~/Scripts/Utils/Numero/IntegerUtils.js")

                //////////////////
                // SERVICES
                //////////////////
                // Aquí se pueden agregar servicios futuros
                
                //////////////////
                // PAGES
                //////////////////
                .AddScriptWithoutTransform("~/Scripts/Pages/Auth/Register.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Home/Home.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Users/UsersList.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Settings/Settings.js")
                .AddScriptWithoutTransform("~/Scripts/Pages/Redux/ExampleReduxPage.js")

                //////////////////
                // MAIN APP
                //////////////////
                .AddScriptWithoutTransform("~/Scripts/App.js")
                .AddScriptWithoutTransform("~/Scripts/AppRouter.js")
                ;
        });

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseStaticFiles();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors("AllowAll");

        app.UseAuthentication();
        app.UseMiddleware<TenantMiddleware>();
        app.UseAuthorization();

        // Middleware para redireccionar a login en errores 401 (solo para MVC)
        app.Use(async (context, next) =>
        {
            await next();
            if (context.Response.StatusCode == 401 &&
                !context.Request.Path.StartsWithSegments("/api"))
            {
                if (context.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(
                        JsonSerializer.Serialize(new
                        {
                            redirectUrl =
                                $"/Identity/Account/Login?ReturnUrl={Uri.EscapeDataString(context.Request.Path)}"
                        })
                    );
                }
                else
                {
                    context.Response.Redirect(
                        $"/Identity/Account/Login?ReturnUrl={Uri.EscapeDataString(context.Request.Path)}");
                }
            }
        });

        app.MapStaticAssets();
        app.MapControllerRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

        // Fallback para SPA: cualquier ruta no encontrada carga la vista principal
        app.MapFallbackToController("Index", "Home");

        // Inicialización de la base de datos
        await InitializeDatabase(app);
        await app.RunAsync();

        async Task InitializeDatabase(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
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