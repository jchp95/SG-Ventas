const ComunHome = () => {
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();
    const { useSelector } = window.ReactRedux;
    
    // Obtener el nombre de usuario del estado de autenticación
    const userName = useSelector(state => state.auth?.userName);
    
    // Estado local
    const [metrics] = React.useState({
        misVentas: 8,
        misCobros: 5,
        clientesAtendidos: 12,
        metaMensual: 75 // porcentaje
    });

    const user = userName || 'Usuario';

    return (
        <div className={`home-page ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="parent home-content">
                {/* Contenedor principal */}
                <div className="div1 main-container">
                    {/* Bienvenida */}
                    <div className="div2 welcome-section">
                        <div className="welcome-content">
                            <div className="welcome-text">
                                <h2 className="home-title">¡Bienvenido, {user}!</h2>
                                <p className="home-subtitle">Tu espacio personal de ventas</p>
                            </div>
                            <div className={`home-actions ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                <button className={`home-button me-2 ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                    <i className="bi bi-plus-circle me-1"></i> Registrar venta
                                </button>
                                <button className={`home-button me-2 ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                    <i className="bi bi-people me-1"></i> Mis clientes
                                </button>
                                <button className={`home-button ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                    <i className="bi bi-graph-up me-1"></i> Mis reportes
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cards de métricas - Vista simplificada */}
                    <div className={`div3 metrics-section ${tema === 'dark' ? 'theme-dark' : ''}`}>
                        <div className="metrics-container">
                            <div className="large-cards-container" style={{width: '100%'}}>
                                <div className="large-cards-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
                                    <div className={`metric-card large ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                        <div className="home-metric-icon">
                                            <i className="bi bi-cart-check"></i>
                                        </div>
                                        <div className="home-metric-content">
                                            <div className="home-metric-value">{metrics.misVentas}</div>
                                            <div className="home-metric-label">Mis ventas hoy</div>
                                        </div>
                                    </div>
                                    <div className={`metric-card large ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                        <div className="home-metric-icon">
                                            <i className="bi bi-cash-stack"></i>
                                        </div>
                                        <div className="home-metric-content">
                                            <div className="home-metric-value">{metrics.misCobros}</div>
                                            <div className="home-metric-label">Mis cobros</div>
                                        </div>
                                    </div>
                                    <div className={`metric-card large ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                        <div className="home-metric-icon">
                                            <i className="bi bi-people-fill"></i>
                                        </div>
                                        <div className="home-metric-content">
                                            <div className="home-metric-value">{metrics.clientesAtendidos}</div>
                                            <div className="home-metric-label">Clientes atendidos</div>
                                        </div>
                                    </div>
                                    <div className={`metric-card large ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                        <div className="home-metric-icon">
                                            <i className="bi bi-trophy"></i>
                                        </div>
                                        <div className="home-metric-content">
                                            <div className="home-metric-value">{metrics.metaMensual}%</div>
                                            <div className="home-metric-label">Meta mensual</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gráficos - Vista simplificada */}
                    <div className={`div4 graphs-section ${tema === 'dark' ? 'theme-dark' : ''}`}>
                        <div className="graphs-container">
                            <div className={`graph-card ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                <div className="home-graph-title">
                                    <i className="bi bi-graph-up-arrow me-2"></i>
                                    Mis ventas del mes
                                </div>
                                <ChartHome />
                            </div>
                            <div className={`graph-card ${tema === 'dark' ? 'theme-dark' : ''}`}>
                                <div className="home-graph-title">
                                    <i className="bi bi-pie-chart me-2"></i>
                                    Rendimiento personal
                                </div>
                                <ChartHome type="doughnut" />
                            </div>
                        </div>
                    </div>

                    {/* Actividades personales */}
                    <div className={`div5 activities-section ${tema === 'dark' ? 'theme-dark' : ''}`}>
                        <div className={`activities-container ${tema === 'dark' ? 'theme-dark' : ''}`}>
                            <div className="home-graph-title mb-3">
                                <i className="bi bi-clock-history me-2"></i>
                                Mis actividades recientes
                            </div>
                            <ActividadesRecientes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.ComunHome = ComunHome;
console.log('✅ ComunHome component loaded');
