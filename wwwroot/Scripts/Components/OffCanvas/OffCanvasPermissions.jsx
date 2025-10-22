/* jshint ignore:start */

/* global React */

class OffCanvasPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'general',
            categories: [
                { key: 'general', name: 'General' },
                { key: 'ventas', name: 'Ventas' },
                { key: 'clientes', name: 'Clientes' }
            ],
            permissions: {
                general: [
                    { value: 'VerDashboard', displayName: 'Ver Dashboard', isSelected: true },
                    { value: 'VerReportes', displayName: 'Ver Reportes', isSelected: false }
                ],
                ventas: [
                    { value: 'CrearVenta', displayName: 'Crear Venta', isSelected: true },
                    { value: 'AnularVenta', displayName: 'Anular Venta', isSelected: false }
                ],
                clientes: [
                    { value: 'VerCliente', displayName: 'Ver Cliente', isSelected: true },
                    { value: 'EditarCliente', displayName: 'Editar Cliente', isSelected: false }
                ]
            }
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleTabChange(tabKey) {
        this.setState({ activeTab: tabKey });
    }
    handleClose() {
        if (this.props.onClose) this.props.onClose();
    }
    render() {
        const { show, user } = this.props;
        const { activeTab, categories, permissions } = this.state;
        if (!show || !user) return null;
        return (
            <window.OffCanvas show={show} onClose={this.handleClose} width="400px">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '18px' }}>
                    <h5 style={{color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 0}}>{'Permisos de ' + (user.fnombre || user.nombre)}</h5>
                </div>
                <ul className="nav nav-tabs mb-3">
                    {categories.map(cat => (
                        <li className="nav-item" key={cat.key}>
                            <button className={'nav-link' + (activeTab === cat.key ? ' active' : '')} onClick={() => this.handleTabChange(cat.key)}>{cat.name}</button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    {categories.map(cat => (
                        <div className={'tab-pane fade' + (activeTab === cat.key ? ' show active' : '')} key={cat.key} style={{ paddingTop: '8px' }}>
                            {permissions[cat.key].map(perm => (
                                <div className="form-check form-switch mb-2" key={perm.value}>
                                    <input type="checkbox" className="form-check-input" id={'perm-' + perm.value} checked={perm.isSelected} onChange={() => {}} />
                                    <label className="form-check-label" htmlFor={'perm-' + perm.value}>{perm.displayName}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button className="atras-button" onClick={this.handleClose}>Cancelar</button>
                    <button className="register-button">Guardar Cambios</button>
                </div>
            </window.OffCanvas>
        );
    }
}

window.OffCanvasPermissions = OffCanvasPermissions;

/* jshint ignore:end */
