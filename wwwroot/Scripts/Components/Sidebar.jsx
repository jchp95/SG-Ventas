window.Sidebar = function Sidebar() {
    const [expanded, setExpanded] = React.useState(false);
    const Link = window.ReactRouterDOM.Link;

    const toggleSidebar = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className={`sidebar${expanded ? ' sidebar-expanded' : ' sidebar-collapsed'}`}>
            <div className="sidebar-header">
                <span
                    className={`sidebar-toggle-icon bi ${expanded ? 'bi-chevron-left' : 'bi-list'}`}
                    tabIndex={0}
                    role="button"
                    aria-label="Expandir/collapse sidebar"
                    onClick={toggleSidebar}
                    onKeyPress={e => {
                        if (e.key === 'Enter' || e.key === ' ') toggleSidebar();
                    }}
                ></span>
                <span className="sidebar-menu-title">Menú</span>
            </div>
            <div className="sidebar-content">
                <ul className="nav flex-column">
                    <li className="sidebar-nav-item nav-item">
                        <Link className="nav-link" to="/">
                            <i className="bi bi-house"></i>
                            <span className="sidebar-text">Inicio</span>
                        </Link>
                    </li>
                    <li className="sidebar-nav-item nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-people"></i>
                            <span className="sidebar-text">Clientes</span>
                        </a>
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
