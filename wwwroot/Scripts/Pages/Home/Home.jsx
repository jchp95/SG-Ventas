class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Invitado',
            metrics: {
                ventasHoy: 12,
                cobros: 8,
                cxc: 4,
                clientesNuevos: 5,
                productoTop: 'Laptop Pro 15"',
                productosVendidos: 1200,
                nuevaPequena: 'Tablet X',
            }
        };
    }

    render() {
        const { user, metrics } = this.state;
        return (
            <div className="home-page">
                <div className="parent home-content">
                    {/* div1: Contenedor principal que cubre TODO el espacio */}
                    <div className="div1 main-container">
                        {/* div2: Bienvenida */}
                        <div className="div2 welcome-section">
                            <div className="welcome-content">
                                <div className="welcome-text">
                                    <h2 className="home-title">¡Bienvenido, {user}!</h2>
                                    <p className="home-subtitle">Gestiona tus ventas y clientes de forma rápida y moderna.</p>
                                </div>
                                <div className="home-actions">
                                    <button className="home-button me-2">
                                        <i className="bi bi-plus-circle me-1"></i> Registrar venta
                                    </button>
                                    <button className="home-button me-2">
                                        <i className="bi bi-people me-1"></i> Clientes
                                    </button>
                                    <button className="home-button me-2">
                                        <i className="bi bi-box-seam me-1"></i> Productos
                                    </button>
                                    <button className="home-button">
                                        <i className="bi bi-graph-up me-1"></i> Reportes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* div3: Cards Grandes y Pequeñas */}
                        <div className="div3 metrics-section">
                            <div className="metrics-container">
                                {/* Cards Grandes - Izquierda */}
                                <div className="large-cards-container">
                                    <div className="large-cards-grid">
                                        <div className="metric-card large">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-bar-chart-line"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.ventasHoy}</div>
                                                <div className="home-metric-label">Ventas hoy</div>
                                            </div>
                                        </div>
                                        <div className="metric-card large">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-cash-coin"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.cobros}</div>
                                                <div className="home-metric-label">Cobros</div>
                                            </div>
                                        </div>
                                        <div className="metric-card large">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-credit-card"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.cxc}</div>
                                                <div className="home-metric-label">Cxc</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cards Pequeñas - Derecha */}
                                <div className="small-cards-container">
                                    <div className="small-cards-grid">
                                        <div className="metric-card small">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-box-seam"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.productosVendidos}</div>
                                                <div className="home-metric-label">Productos vendidos</div>
                                            </div>
                                        </div>
                                        <div className="metric-card small">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-person-plus"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.clientesNuevos}</div>
                                                <div className="home-metric-label">Clientes nuevos</div>
                                            </div>
                                        </div>
                                        <div className="metric-card small">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-star"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.productoTop}</div>
                                                <div className="home-metric-label">Producto top</div>
                                            </div>
                                        </div>
                                        <div className="metric-card small">
                                            <div className="home-metric-icon">
                                                <i className="bi bi-tablet"></i>
                                            </div>
                                            <div className="home-metric-content">
                                                <div className="home-metric-value">{metrics.nuevaPequena}</div>
                                                <div className="home-metric-label">Nueva card</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* div4: Gráficos */}
                        <div className="div4 graphs-section">
                            <div className="graphs-container">
                                <div className="graph-card">
                                    <div className="home-graph-title">Gráfica de ventas</div>
                                    <ChartHome />
                                </div>
                                <div className="graph-card">
                                    <div className="home-graph-title">Productos vendidos</div>
                                    <ChartHome type="line" />
                                </div>
                                <div className="graph-card">
                                    <div className="home-graph-title">Clientes nuevos</div>
                                    <ChartHome type="doughnut" />
                                </div>
                            </div>
                        </div>

                        {/* div5: Actividades */}
                        <div className="div5 activities-section">
                            <div className="activities-container">
                                <ActividadesRecientes />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

window.Home = Home;