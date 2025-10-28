/**
 * Página de ejemplo usando Redux Toolkit
 * Demuestra el uso del store de Redux en la aplicación
 */

const ExampleReduxPage = () => {
    // Hooks de Redux
    const { usuarios, usuariosFiltrados, cargando, setUsuarios, agregarUsuario, setFiltros } = window.ReduxProvider.useUsuarios();
    const { agregarNotificacion, toggleSidebar, sidebarAbierto } = window.ReduxProvider.useApp();
    const { ventas, resumen, setVentas, agregarVenta } = window.ReduxProvider.useVentas();

    // Estado local
    const [nuevoUsuario, setNuevoUsuario] = React.useState({
        nombre: '',
        email: '',
        estado: 'activo'
    });

    const [nuevaVenta, setNuevaVenta] = React.useState({
        cliente: '',
        monto: 0,
        producto: ''
    });

    // Efectos
    React.useEffect(() => {
        // Simular carga inicial de datos
        setTimeout(() => {
            setUsuarios([
                { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', estado: 'activo' },
                { id: 2, nombre: 'María García', email: 'maria@email.com', estado: 'activo' },
                { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', estado: 'inactivo' }
            ]);

            setVentas([
                { id: 1, cliente: 'Juan Pérez', monto: 1500.00, producto: 'Producto A', fecha: new Date().toISOString() },
                { id: 2, cliente: 'María García', monto: 2300.50, producto: 'Producto B', fecha: new Date().toISOString() }
            ]);
        }, 1000);
    }, []);

    // Handlers
    const handleAgregarUsuario = () => {
        if (nuevoUsuario.nombre && nuevoUsuario.email) {
            const usuario = {
                id: Date.now(),
                ...nuevoUsuario
            };
            
            agregarUsuario(usuario);
            setNuevoUsuario({ nombre: '', email: '', estado: 'activo' });
            
            agregarNotificacion({
                tipo: 'success',
                mensaje: `Usuario ${usuario.nombre} agregado correctamente`,
                autoClose: true
            });
        }
    };

    const handleAgregarVenta = () => {
        if (nuevaVenta.cliente && nuevaVenta.monto > 0) {
            const venta = {
                id: Date.now(),
                ...nuevaVenta,
                monto: parseFloat(nuevaVenta.monto),
                fecha: new Date().toISOString()
            };
            
            agregarVenta(venta);
            setNuevaVenta({ cliente: '', monto: 0, producto: '' });
            
            agregarNotificacion({
                tipo: 'success',
                mensaje: `Venta de ${window.formatCurrency(venta.monto)} registrada`,
                autoClose: true
            });
        }
    };

    const handleFiltrarUsuarios = (busqueda) => {
        setFiltros({ busqueda });
    };

    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>🚀 Redux Toolkit - Demo</h2>
                        <button
                            className={`btn btn-outline-primary`}
                            onClick={toggleSidebar}
                        >
                            {sidebarAbierto ? 'Ocultar Sidebar' : 'Mostrar Sidebar'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Estado de Redux */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">👥 Usuarios</h5>
                        </div>
                        <div className="card-body">
                            <p>Total: {window.IntegerUtils.formatear(usuarios.length)}</p>
                            <p>Activos: {window.IntegerUtils.formatear(usuarios.filter(u => u.estado === 'activo').length)}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">💰 Ventas</h5>
                        </div>
                        <div className="card-body">
                            <p>Total ventas: {window.IntegerUtils.formatear(ventas.length)}</p>
                            <p>Monto total: {window.formatCurrency(ventas.reduce((sum, v) => sum + v.monto, 0))}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">⚙️ Estado App</h5>
                        </div>
                        <div className="card-body">
                            <p>Sidebar: {sidebarAbierto ? 'Abierto' : 'Cerrado'}</p>
                            <p>Cargando: {cargando ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formularios */}
            <div className="row mb-4">
                {/* Agregar Usuario */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Agregar Usuario</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevoUsuario.nombre}
                                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={nuevoUsuario.email}
                                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleAgregarUsuario}
                            >
                                Agregar Usuario
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Agregar Venta */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Agregar Venta</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Cliente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevaVenta.cliente}
                                    onChange={(e) => setNuevaVenta({...nuevaVenta, cliente: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Monto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={nuevaVenta.monto}
                                    onChange={(e) => setNuevaVenta({...nuevaVenta, monto: e.target.value})}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevaVenta.producto}
                                    onChange={(e) => setNuevaVenta({...nuevaVenta, producto: e.target.value})}
                                />
                            </div>
                            <button
                                className="btn btn-success"
                                onClick={handleAgregarVenta}
                            >
                                Registrar Venta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de usuarios */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Lista de Usuarios</h5>
                            <input
                                type="text"
                                className="form-control w-auto"
                                placeholder="Buscar usuarios..."
                                onChange={(e) => handleFiltrarUsuarios(e.target.value)}
                            />
                        </div>
                        <div className="card-body">
                            {cargando ? (
                                <div className="text-center">Cargando usuarios...</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuariosFiltrados.map(usuario => (
                                                <tr key={usuario.id}>
                                                    <td>{usuario.id}</td>
                                                    <td>{usuario.nombre}</td>
                                                    <td>{usuario.email}</td>
                                                    <td>
                                                        <span className={`badge ${usuario.estado === 'activo' ? 'bg-success' : 'bg-secondary'}`}>
                                                            {usuario.estado}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de ventas */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Últimas Ventas</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Cliente</th>
                                            <th>Producto</th>
                                            <th>Monto</th>
                                            <th>Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ventas.map(venta => (
                                            <tr key={venta.id}>
                                                <td>{venta.id}</td>
                                                <td>{venta.cliente}</td>
                                                <td>{venta.producto}</td>
                                                <td>{window.formatCurrency(venta.monto)}</td>
                                                <td>{window.formatDate(venta.fecha)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Hacer disponible globalmente
window.ExampleReduxPage = ExampleReduxPage;
