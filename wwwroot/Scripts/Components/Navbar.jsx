const Navbar = () => {
    // Estado local
    const [adminDropdownOpen, setAdminDropdownOpen] = React.useState(false);
    const hideTimeoutRef = React.useRef(null);

    // Redux hooks
    const { tema, setTema, usuario, agregarNotificacion } = window.ReduxProvider.useApp();

    const Link = window.ReactRouterDOM.Link;

    // Funciones para dropdown
    const showDropdown = () => {
        clearTimeout(hideTimeoutRef.current);
        setAdminDropdownOpen(true);
    };

    const hideDropdown = (delay = 200) => {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setAdminDropdownOpen(false);
        }, delay);
    };

    const clearHideTimeout = () => {
        clearTimeout(hideTimeoutRef.current);
    };

    // Función para cambiar tema
    const toggleTheme = () => {
        const nuevoTema = tema === 'light' ? 'dark' : 'light';
        setTema(nuevoTema);
        
        // Agregar clase de animación temporalmente
        const btn = document.querySelector('.theme-toggle-btn');
        if (btn) {
            btn.classList.add('changing');
            setTimeout(() => btn.classList.remove('changing'), 600);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de logout real
        agregarNotificacion({
            tipo: 'success',
            mensaje: 'Sesión cerrada correctamente',
            autoClose: true
        });
    };

    return (
            <nav className={`navbar navbar-expand-lg ${tema === 'dark' ? 'theme-dark' : 'navbar-light'}`}>
                <div className="container-fluid justify-content-space-between align-items-center">
                    <div className="d-flex justify-content-start">
                        <Link className="navbar-brand" to="/">Ventas</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            
                            {/* Botón de cambio de tema */}
                            <li className="nav-item me-3">
                                <button 
                                    className="theme-toggle-btn"
                                    onClick={toggleTheme}
                                    title={`Cambiar a tema ${tema === 'light' ? 'oscuro' : 'claro'}`}
                                >
                                    {tema === 'light' ? (
                                        <i className="bi bi-moon-stars"></i>
                                    ) : (
                                        <i className="bi bi-sun"></i>
                                    )}
                                </button>
                            </li>

                            {/* Dropdown solo visible en escritorio */}
                            <li className="navbar-link dropdown d-none d-lg-block me-4">
                                <button
                                    className={`theme-toggle-btn dropdown-toggle admin-dropdown-toggle${adminDropdownOpen ? ' show' : ''}`}
                                    id="adminDropdown"
                                    role="button"
                                    onMouseEnter={showDropdown}
                                    onMouseLeave={() => hideDropdown(200)}
                                >
                                    <i className="bi bi-gear me-1"></i>
                                </button>
                                <ul
                                    className={`dropdown-menu admin-dropdown-menu dropdown-menu-end${adminDropdownOpen ? ' show' : ''}`}
                                    aria-labelledby="adminDropdown"
                                    onMouseEnter={clearHideTimeout}
                                    onMouseLeave={() => hideDropdown(200)}
                                >
                                    <li>
                                        <a className="dropdown-item mb-2" href="#"><i className="bi bi-clipboard-data me-2"></i> Auditoría</a>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item mb-2" to="/settings"><i className="bi bi-building me-2"></i> Datos Empresa</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/usuarios"><i className="bi bi-person-plus me-2"></i> Administrar usuarios</Link>
                                    </li>
                                </ul>
                            </li>
        
                            <li>
                                <button 
                                    className="theme-toggle-btn" 
                                    onClick={handleLogout}
                                    title="Cerrar Sesión"
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                </button>
                            </li>
                            {/* Versión móvil del menú */}
                            <div className="d-flex flex-column px-3 d-lg-none">
                                {/* Botón de tema - versión móvil */}
                                <button 
                                    className={`nav-link d-flex align-items-center mb-3 btn ${tema === 'dark' ? 'text-white' : 'text-dark'}`}
                                    onClick={toggleTheme}
                                    style={{border: 'none', background: 'transparent', textAlign: 'left'}}
                                >
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        {tema === 'light' ? (
                                            <i className="bi bi-moon-stars"></i>
                                        ) : (
                                            <i className="bi bi-sun"></i>
                                        )}
                                    </div>
                                    <span>{tema === 'light' ? 'Tema Oscuro' : 'Tema Claro'}</span>
                                </button>
                                <a className={`nav-link d-flex align-items-center mb-3 ${tema === 'dark' ? 'text-white' : 'text-dark'}`} href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="bi bi-clipboard-data"></i>
                                    </div>
                                    <span>Auditoría</span>
                                </a>
                                <a className={`nav-link d-flex align-items-center mb-3 ${tema === 'dark' ? 'text-white' : 'text-dark'}`} href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="bi bi-shield-check"></i>
                                    </div>
                                    <span>Permisos</span>
                                </a>
                                <a className={`nav-link d-flex align-items-center mb-3 ${tema === 'dark' ? 'text-white' : 'text-dark'}`} href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="bi bi-building"></i>
                                    </div>
                                    <span>Datos Empresa</span>
                                </a>
                                <Link className={`nav-link d-flex align-items-center mb-3 ${tema === 'dark' ? 'text-white' : 'text-dark'}`} to="/usuarios">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="bi bi-person-plus"></i>
                                    </div>
                                    <span>Administrar usuarios</span>
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        );
};

window.Navbar = Navbar;



