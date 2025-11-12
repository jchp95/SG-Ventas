window.Sidebar = function Sidebar() {
    const [expanded, setExpanded] = React.useState(false);
    const Link = window.ReactRouterDOM.Link;
    const { useSelector } = window.ReactRedux;
    
    // Redux hooks para tema
    const { tema, sidebarAbierto, toggleSidebar: toggleSidebarRedux } = window.ReduxProvider.useApp();
    
    // Obtener el token del estado de autenticación
    const token = useSelector(state => state.auth?.token);
    
    // Determinar la ruta de inicio basada en el rol
    const getHomeRoute = () => {
        console.log('🔍 [Sidebar] getHomeRoute llamado');
        console.log('🔍 [Sidebar] Token disponible:', !!token);
        console.log('🔍 [Sidebar] JwtUtils disponible:', !!window.JwtUtils);
        console.log('🔍 [Sidebar] RoleConstants disponible:', !!window.RoleConstants);
        
        if (!token || !window.JwtUtils || !window.RoleConstants) {
            console.log('⚠️ [Sidebar] Falta token o utilidades, usando /home por defecto');
            return '/home'; // Por defecto
        }
        
        const role = window.JwtUtils.getRoleFromToken(token);
        console.log('🎭 [Sidebar] Rol extraído:', role);
        
        if (!role) {
            console.log('⚠️ [Sidebar] No se pudo extraer el rol, usando /home');
            return '/home';
        }
        
        const roleCode = window.RoleConstants.getRoleCode(role);
        console.log('🔐 [Sidebar] Código del rol:', roleCode);
        
        const isAdmin = window.RoleConstants.isAdmin(roleCode);
        console.log('👤 [Sidebar] ¿Es admin?:', isAdmin);
        
        const route = isAdmin ? '/home' : '/comun-home';
        console.log('🎯 [Sidebar] Ruta calculada:', route);
        
        return route;
    };
    
    const homeRoute = getHomeRoute();
    console.log('🚀 [Sidebar] Ruta final asignada a homeRoute:', homeRoute);

    const toggleSidebar = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className={`sidebar ${expanded ? 'sidebar-expanded' : 'sidebar-collapsed'} ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="sidebar-header">
                <span
                    className={`sidebar-toggle-icon bi ${expanded ? 'bi-chevron-left' : 'bi-list'}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Expandir/collapse sidebar"
                    onClick={toggleSidebar}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') toggleSidebar();
                    }}
                ></span>
                <span className="sidebar-menu-title">Menú</span>
            </div>
            <div className="sidebar-content">
                <ul className="nav flex-column">
                    <li className="sidebar-nav-item nav-item">
                        <Link className="nav-link" to={homeRoute}>
                            <i className="bi bi-house"></i>
                            <span className="sidebar-text">Inicio</span>
                        </Link>
                    </li>
                    <li className="sidebar-nav-item nav-item">
                        <Link className="nav-link" to="/clientes">
                            <i className="bi bi-people"></i>
                            <span className="sidebar-text">Clientes</span>
                        </Link>
                    </li>
                    <li className="sidebar-nav-item nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-cart"></i>
                            <span className="sidebar-text">Ventas</span>
                        </a>
                    </li>
                    <li className="sidebar-nav-item nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bar-chart"></i>
                            <span className="sidebar-text">Reportes</span>
                        </a>
                    </li>
                    <li className="sidebar-nav-item nav-item">
                        <Link className="nav-link" to="/usuarios">
                            <i className="bi bi-person-badge"></i>
                            <span className="sidebar-text">Usuarios</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
