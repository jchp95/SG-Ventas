/* jshint ignore:start */

/* global React */

class ActividadesRecientes extends React.Component {
    constructor(props) {
        super(props);
        // Simulación de muchas actividades para paginación
        const actividades = [];
        for (let i = 1; i <= 50; i++) {
            actividades.push({
                id: i,
                tipo: i % 3 === 0 ? 'Producto' : (i % 2 === 0 ? 'Cliente' : 'Venta'),
                descripcion: `Actividad ${i} realizada`,
                fecha: `21 Oct 2025 ${(10 - Math.floor(i/6))}:0${i%6}h`,
                detalleAdicional: i % 4 === 0 ? `Detalle extra ${i}` : '',
                esUrgente: i % 7 === 0
            });
        }
        this.state = {
            actividades,
            mostrarOffCanvas: false,
            offCanvasPage: 0,
            actividadSeleccionada: null
        };
    }

    getIconClass(tipo) {
        switch (tipo) {
            case 'Venta': return 'bi bi-bar-chart-line';
            case 'Cliente': return 'bi bi-person-plus';
            case 'Producto': return 'bi bi-box-seam';
            default: return 'bi bi-info-circle';
        }
    }

    abrirOffCanvasActividad = (actividad) => {
        this.setState({ mostrarOffCanvas: true, actividadSeleccionada: actividad });
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
            window.OffCanvasActRecientes.open();
        }
    }
    abrirOffCanvasLista = () => {
        this.setState({ mostrarOffCanvas: true, offCanvasPage: 0, actividadSeleccionada: null });
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
            window.OffCanvasActRecientes.open();
        }
    }
    cerrarOffCanvas = () => {
        this.setState({ mostrarOffCanvas: false, actividadSeleccionada: null });
        if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.close) {
            window.OffCanvasActRecientes.close();
        }
    }
    verMasOffCanvas = () => {
        this.setState(prev => ({ offCanvasPage: prev.offCanvasPage + 1 }));
    }

    render() {
        const { actividades, mostrarOffCanvas, offCanvasPage, actividadSeleccionada } = this.state;
        const ultimas5 = actividades.slice(-5).reverse();
        // Para el offcanvas: 20 por página, paginación simple
        const offCanvasActividades = actividades.slice().reverse().slice(0, 20 * (offCanvasPage + 1));
        const hayMas = actividades.length > offCanvasActividades.length;
        return (
            <div className="actividades-recientes-section">
                <div className="section-title mb-2">Actividades recientes</div>
                <div className="actividades-list">
                    {ultimas5.map(act => (
                        <div key={act.id} className={`activity-item mb-3 ${act.esUrgente ? 'urgent' : ''}`}
                             style={{cursor: 'pointer'}}
                             onClick={() => this.abrirOffCanvasActividad(act)}>
                            <div className="d-flex">
                                <div className={`activity-icon me-3 ${act.tipo.toLowerCase()}`}> 
                                    <i className={this.getIconClass(act.tipo)}></i>
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
                    <a href="#" className="show-more-link" onClick={e => {e.preventDefault(); this.abrirOffCanvasLista();}}>Mostrar más</a>
                </div>
                <OffCanvasActRecientes 
                    show={mostrarOffCanvas} 
                    onClose={this.cerrarOffCanvas} 
                    actividades={offCanvasActividades} 
                    verMas={hayMas ? this.verMasOffCanvas : null}
                    actividad={actividadSeleccionada}
                />
            </div>
        );
    }
}

window.ActividadesRecientes = ActividadesRecientes;

/* jshint ignore:end */
