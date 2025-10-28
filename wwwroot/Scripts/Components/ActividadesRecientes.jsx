/* jshint ignore:start */

/* global React */

const ActividadesRecientes = () => {
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();
    
    // Simulación de muchas actividades para paginación
    const actividades = React.useMemo(() => {
        const acts = [];
        for (let i = 1; i <= 50; i++) {
            acts.push({
                id: i,
                tipo: i % 3 === 0 ? 'Producto' : (i % 2 === 0 ? 'Cliente' : 'Venta'),
                descripcion: `Actividad ${i} realizada`,
                fecha: `21 Oct 2025 ${(10 - Math.floor(i/6))}:0${i%6}h`,
                detalleAdicional: i % 4 === 0 ? `Detalle extra ${i}` : '',
                esUrgente: i % 7 === 0
            });
        }
        return acts;
    }, []);

    // Estados locales
    const [mostrarOffCanvas, setMostrarOffCanvas] = React.useState(false);
    const [offCanvasPage, setOffCanvasPage] = React.useState(0);
    const [actividadSeleccionada, setActividadSeleccionada] = React.useState(null);

    const getIconClass = (tipo) => {
        switch (tipo) {
            case 'Venta': return 'bi bi-bar-chart-line';
            case 'Cliente': return 'bi bi-person-plus';
            case 'Producto': return 'bi bi-box-seam';
            default: return 'bi bi-info-circle';
        }
    };

    const abrirOffCanvasActividad = (actividad) => {
        setMostrarOffCanvas(true);
        setActividadSeleccionada(actividad);
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
            window.OffCanvasActRecientes.open();
        }
    };

    const abrirOffCanvasLista = () => {
        setMostrarOffCanvas(true);
        setOffCanvasPage(0);
        setActividadSeleccionada(null);
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
            window.OffCanvasActRecientes.open();
        }
    };

    const cerrarOffCanvas = () => {
        setMostrarOffCanvas(false);
        setActividadSeleccionada(null);
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.close) {
            window.OffCanvasActRecientes.close();
        }
    };

    const verMasOffCanvas = () => {
        setOffCanvasPage(prev => prev + 1);
    };
    const ultimas5 = actividades.slice(-5).reverse();
    // Para el offcanvas: 20 por página, paginación simple
    const offCanvasActividades = actividades.slice().reverse().slice(0, 20 * (offCanvasPage + 1));
    const hayMas = actividades.length > offCanvasActividades.length;

    return (
        <div className={`actividades-recientes-section ${tema === 'dark' ? 'theme-dark' : ''}`}>
            <div className="section-title mb-2">Actividades recientes</div>
            <div className="actividades-list">
                {ultimas5.map(act => (
                    <div key={act.id} 
                         className={`activity-item mb-3 ${act.esUrgente ? 'urgent' : ''}`}
                         style={{cursor: 'pointer'}}
                         onClick={() => abrirOffCanvasActividad(act)}>
                        <div className="d-flex">
                            <div className={`activity-icon me-3 ${act.tipo.toLowerCase()}`}> 
                                <i className={getIconClass(act.tipo)}></i>
                            </div>
                            <div>
                                <div className="act-tipo">{act.tipo}</div>
                                <div className="act-description">{act.descripcion}</div>
                                <small className="act-fecha">{act.fecha}</small>
                            </div>
                        </div>
                        <hr className="my-2" />
                    </div>
                ))}
            </div>
            <div className="text-end">
                <a href="#" 
                   className="show-more-link" 
                   onClick={e => {e.preventDefault(); abrirOffCanvasLista();}}>
                   Mostrar más
                </a>
            </div>
            <OffCanvasActRecientes 
                show={mostrarOffCanvas} 
                onClose={cerrarOffCanvas} 
                actividades={offCanvasActividades} 
                verMas={hayMas ? verMasOffCanvas : null}
                actividad={actividadSeleccionada}
            />
        </div>
    );
};

window.ActividadesRecientes = ActividadesRecientes;

/* jshint ignore:end */
