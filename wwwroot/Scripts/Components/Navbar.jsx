class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminDropdownOpen: false,
        };
        this.hideTimeout = null;
    }

    showDropdown = () => {
        clearTimeout(this.hideTimeout);
        this.setState({ adminDropdownOpen: true });
    };

    hideDropdown = (delay = 200) => {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = setTimeout(() => {
            this.setState({ adminDropdownOpen: false });
        }, delay);
    };

    clearHideTimeout = () => {
        clearTimeout(this.hideTimeout);
    };

    handleLogout = (e) => {
        e.preventDefault();
        alert('Sesión cerrada. Aquí va la lógica de logout.');
    }

    render() {
        const { adminDropdownOpen } = this.state;
        const Link = window.ReactRouterDOM.Link;
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
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
                            {/* Dropdown solo visible en escritorio */}
                            <li className="navbar-link dropdown d-none d-lg-block me-4">
                                <a
                                    className={`navbar-link dropdown-toggle admin-dropdown-toggle${adminDropdownOpen ? ' show' : ''}`}
                                    href="#"
                                    id="adminDropdown"
                                    role="button"
                                    onMouseEnter={this.showDropdown}
                                    onMouseLeave={() => this.hideDropdown(200)}
                                >
                                    <i className="fas fa-cog me-1"></i> Administración
                                </a>
                                <ul
                                    className={`dropdown-menu admin-dropdown-menu dropdown-menu-end${adminDropdownOpen ? ' show' : ''}`}
                                    aria-labelledby="adminDropdown"
                                    onMouseEnter={this.clearHideTimeout}
                                    onMouseLeave={() => this.hideDropdown(200)}
                                >
                                    <li>
                                        <a className="dropdown-item mb-2" href="#"><i className="fas fa-clipboard-list me-2"></i> Auditoría</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item mb-2" href="#"><i className="fas fa-building me-2"></i> Datos Empresa</a>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/usuarios"><i className="fas fa-plus me-2"></i> Administrar usuarios</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="navbar-link" href="#" onClick={this.handleLogout}>
                                   Cerrar Sesión
                                </a>
                            </li>
                            {/* Versión móvil del menú */}
                            <div className="d-flex flex-column px-3 d-lg-none">
                                <a className="nav-link text-dark d-flex align-items-center mb-3" href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="fas fa-clipboard-list"></i>
                                    </div>
                                    <span>Auditoría</span>
                                </a>
                                <a className="nav-link text-dark d-flex align-items-center mb-3" href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="fas fa-user-shield"></i>
                                    </div>
                                    <span>Permisos</span>
                                </a>
                                <a className="nav-link text-dark d-flex align-items-center mb-3" href="#">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="fas fa-building"></i>
                                    </div>
                                    <span>Datos Empresa</span>
                                </a>
                                <Link className="nav-link text-dark d-flex align-items-center mb-3" to="/usuarios">
                                    <div className="me-3" style={{width: '30px', textAlign: 'center'}}>
                                        <i className="fas fa-user-plus"></i>
                                    </div>
                                    <span>Administrar usuarios</span>
                                </Link>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

window.Navbar = Navbar;



