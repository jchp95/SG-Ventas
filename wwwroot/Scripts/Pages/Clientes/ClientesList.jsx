function ClientesList() {
    const PAGE_SIZE = 15;
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalCliente, setModalCliente] = React.useState(null); // null = crear, objeto = editar
    const [filterEstado, setFilterEstado] = React.useState('todos');

    /// Redux hooks
    const {tema} = window.ReduxProvider.useApp();
    const {clientes, cargando} = window.ReduxProvider.useClientes();
    const dispatch = window.ReduxProvider.useDispatch();

    // Cargar clientes al montar el componente
    React.useEffect(() => {
        dispatch(window.ClientesActions.fetchClientes());
    }, []);

    // Filtrar clientes
    const clientesFiltrados = React.useMemo(() => {
        let filtered = clientes || [];

        // Filtrar por búsqueda
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(c =>
                c.fnombre?.toLowerCase().includes(searchLower) ||
                c.fcedulaRnc?.toLowerCase().includes(searchLower) ||
                c.ftelefono?.toLowerCase().includes(searchLower) ||
                c.fcelular?.toLowerCase().includes(searchLower) ||
                c.fdireccion?.toLowerCase().includes(searchLower)
            );
        }

        // Filtrar por estado
        if (filterEstado === 'activos') {
            filtered = filtered.filter(c => c.factivo);
        } else if (filterEstado === 'inactivos') {
            filtered = filtered.filter(c => !c.factivo);
        }

        return filtered;
    }, [clientes, search, filterEstado]);

    // Mapeo para adaptar los datos al formato que espera la tabla
    const clientesAdaptados = React.useMemo(() => {
        return clientesFiltrados.map(c => ({
            fidCliente: c.fidCliente,
            nombre: c.fnombre || '',
            email: c.femail || '',
            telefono: c.ftelefono || '',
            direccion: c.fdireccion || '',
            activo: !!c.factivo,
            // Puedes agregar más campos si la tabla los necesita
            ...c // mantiene el resto de propiedades originales
        }));
    }, [clientesFiltrados]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleOpenCreate = () => {
        setModalOpen(true);
        setModalCliente(null);
    };

    const handleOpenEdit = (cliente) => {
        setModalOpen(true);
        setModalCliente(cliente);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalCliente(null);
    };

    const handleSaveCliente = async (formData) => {
        let result;
        if (modalCliente) {
            // Editar cliente existente
            result = await dispatch(window.ClientesActions.updateCliente({
                ...formData,
                fidCliente: modalCliente.fidCliente
            }));
            
            if (result && result.success) {
                window.ToastUtils?.success('Cliente actualizado correctamente', 'Éxito');
                handleCloseModal();
            } else {
                window.ToastUtils?.error(result?.error || 'Error al actualizar el cliente', 'Error');
            }
        } else {
            // Crear nuevo cliente
            result = await dispatch(window.ClientesActions.createCliente(formData));
            
            if (result && result.success) {
                window.ToastUtils?.success('Cliente creado correctamente', 'Éxito');
                handleCloseModal();
            } else {
                window.ToastUtils?.error(result?.error || 'Error al crear el cliente', 'Error');
            }
        }
        
        return result;
    };

    const handleDeleteCliente = async (clienteId) => {
        if (confirm('¿Está seguro de que desea desactivar este cliente?')) {
            const result = await dispatch(window.ClientesActions.deleteCliente(clienteId));
            
            if (result && result.success) {
                window.ToastUtils?.success('Cliente desactivado correctamente', 'Éxito');
            } else {
                window.ToastUtils?.error(result?.error || 'Error al desactivar el cliente', 'Error');
            }
        }
    };

    const handleActivateCliente = async (clienteId) => {
        if (confirm('¿Está seguro de que desea activar este cliente?')) {
            const result = await dispatch(window.ClientesActions.activateCliente(clienteId));
            
            if (result && result.success) {
                window.ToastUtils?.success('Cliente activado correctamente', 'Éxito');
            } else {
                window.ToastUtils?.error(result?.error || 'Error al activar el cliente', 'Error');
            }
        }
    };

    return (
        <div className={`users-page ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="parent users-content">
                <div className="div1 main-container">
                    {/* Header */}
                    <div className="div2 users-header-section">
                        <div className="users-header-content d-flex justify-content-between align-items-center">
                            <div className="users-title-section justify-content-start">
                                <h2 className="users-title fw-bold mb-0">Gestión de Clientes</h2>
                                <p className="users-subtitle">Administre los clientes de su empresa</p>
                            </div>
                            <div className="users-actions d-flex justify-content-end gap-2">
                                <input
                                    type="text"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    placeholder="Buscar clientes..."
                                    style={{maxWidth: 260}}
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleOpenCreate}
                                    style={{whiteSpace: 'nowrap'}}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Nuevo Cliente
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="users-filters-section">
                        <div className="filters-container">
                            <div className="filter-group">
                                <label className="filter-label">Estado</label>
                                <select
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    value={filterEstado}
                                    onChange={(e) => {
                                        setFilterEstado(e.target.value);
                                        setPage(0);
                                    }}
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="activos">Activos</option>
                                    <option value="inactivos">Inactivos</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label className="filter-label">Resultados</label>
                                <div className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`} style={{backgroundColor: 'transparent', border: 'none', paddingTop: '0.5rem'}}>
                                    <i className="bi bi-funnel me-2"></i>
                                    {clientesFiltrados.length} cliente(s) encontrado(s)
                                </div>
                            </div>
                            <div className="filter-group">
                                <label className="filter-label invisible">Limpiar</label>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setSearch("");
                                        setFilterEstado('todos');
                                        setPage(0);
                                    }}
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de clientes */}
                    <div className="div3">
                        {cargando ? (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : (
                            window.TableClientes ? React.createElement(window.TableClientes, {
                                data: clientesAdaptados,
                                page: page,
                                pageSize: PAGE_SIZE,
                                onPageChange: handlePageChange,
                                onEditCliente: handleOpenEdit,
                                onDeleteCliente: handleDeleteCliente,
                                onActivateCliente: handleActivateCliente
                            }) : null
                        )}
                    </div>
                </div>
            </div>

            {/* Modal para crear/editar cliente */}
            {modalOpen && (
                <window.CreateClienteModal
                    show={modalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveCliente}
                    cliente={modalCliente}
                />
            )}
        </div>
    );
}

window.ClientesList = ClientesList;
console.log('✅ ClientesList component loaded');
