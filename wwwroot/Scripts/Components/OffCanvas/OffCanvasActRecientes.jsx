/* jshint ignore:start */

/* global React */

const OffCanvasActRecientes = ({ show, onClose, actividades = [], verMas, actividad }) => {
    // Redux hook para tema
    const { tema } = window.ReduxProvider.useApp();

    const openOffcanvas = () => {
        const offcanvas = document.getElementById('offcanvas-actividad-reciente');
        if (offcanvas) {
            offcanvas.classList.add('show');
            offcanvas.style.display = 'block';
        }
    };

    const closeOffcanvas = () => {
        const offcanvas = document.getElementById('offcanvas-actividad-reciente');
        if (offcanvas) {
            offcanvas.classList.remove('show');
            offcanvas.style.display = 'none';
        }
    };

    const getIconClass = (tipo) => {
        switch (tipo) {
            case 'Venta': return 'bi bi-bar-chart-line';
            case 'Cliente': return 'bi bi-person-plus';
            case 'Producto': return 'bi bi-box-seam';
            default: return 'bi bi-info-circle';
        }
    };
    if (!show) return null;
    
    // Si hay actividad seleccionada, mostrar solo el detalle
    if (actividad) {
        return (
            <window.OffCanvas show={show} onClose={onClose} width="350px" className={tema === 'dark' ? 'theme-dark' : ''}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%', marginBottom: '16px'}}>
                    <div>
                        <h5 className="mb-3">Detalle de actividad</h5>
                    </div>
                </div>
                <div className="act-description mb-2"><b>Tipo:</b> {actividad.tipo}</div>
                <div className="act-description mb-2"><b>Descripción:</b> {actividad.descripcion}</div>
                <div className="act-description mb-2"><b>Fecha:</b> {actividad.fecha}</div>
                {actividad.detalleAdicional && <div className="act-detalle mb-2"><b>Detalle:</b> {actividad.detalleAdicional}</div>}
                {actividad.esUrgente && <span className="badge bg-danger">¡Urgente!</span>}
            </window.OffCanvas>
        );
    }
    
    // Si no, mostrar la lista paginada
    return (
        <window.OffCanvas show={show} onClose={onClose} width="350px" className={tema === 'dark' ? 'theme-dark' : ''}>
            <h5 className="mb-3">Actividades recientes</h5>
            <div className="actividades-list">
                {actividades.length === 0 && <div className="text-muted">No hay actividades.</div>}
                {actividades.map(act => (
                    <div key={act.id} 
                         className={`activity-item mb-3 ${act.esUrgente ? 'urgent' : ''}`}
                         style={{cursor: 'default'}}>
                        <div className="d-flex">
                            <div className={`activity-icon me-3 ${act.tipo.toLowerCase()}`}> 
                                <i className={getIconClass(act.tipo)}></i>
                            </div>
                            <div>
                                <div className="act-tipo">{act.tipo}</div>
                                <div className="act-description">{act.descripcion}</div>
                                <small className="act-fecha">{act.fecha}</small>
                                {act.detalleAdicional && <div className="act-detalle">{act.detalleAdicional}</div>}
                                {act.esUrgente && <span className="badge bg-danger ms-2">¡Urgente!</span>}
                            </div>
                        </div>
                        <hr className="my-2" />
                    </div>
                ))}
            </div>
            {verMas && <div className="text-center mt-3"><button className="btn btn-primary register-button" onClick={verMas}>Ver más</button></div>}
        </window.OffCanvas>
    );
};

// Funciones estáticas para compatibilidad
OffCanvasActRecientes.open = () => {
    const offcanvas = document.getElementById('offcanvas-actividad-reciente');
    if (offcanvas) {
        offcanvas.classList.add('show');
        offcanvas.style.display = 'block';
    }
};

OffCanvasActRecientes.close = () => {
    const offcanvas = document.getElementById('offcanvas-actividad-reciente');
    if (offcanvas) {
        offcanvas.classList.remove('show');
        offcanvas.style.display = 'none';
    }
};

window.OffCanvasActRecientes = OffCanvasActRecientes;

/* jshint ignore:end */
