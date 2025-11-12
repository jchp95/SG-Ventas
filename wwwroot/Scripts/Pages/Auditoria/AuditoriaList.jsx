// AuditoriaList.jsx

function Auditoria() {
    const PAGE_SIZE = 15;

    // Redux hooks para auditoría y tema
    const {tema} = window.ReduxProvider.useApp();
    const {
        auditoriasFiltradas,
        cargando,
        error,
        filtros,
        paginacion,
        setFiltros,
        setPaginacion,
        limpiarFiltros,
        fetchAuditorias,
        fetchAuditoriasByFilter,
        // Hooks para auditoría de usuarios
        auditoriasUsuarios,
        cargandoUsuarios,
        errorUsuarios,
        fetchUsuariosAuditoria
    } = window.ReduxProvider.useAuditoria();

    // Estado local para el tipo de auditoría
    const [tipoAuditoria, setTipoAuditoria] = React.useState('tenant'); // 'tenant' o 'usuarios'

    // Cargar auditorías al montar el componente o cuando cambia el tipo
    React.useEffect(() => {
        if (tipoAuditoria === 'tenant') {
            fetchAuditorias();
        } else {
            fetchUsuariosAuditoria(filtros);
        }
    }, [tipoAuditoria]);

    const handleTipoChange = (tipo) => {
        setTipoAuditoria(tipo);
        limpiarFiltros();
    };

    const handleSearchChange = (e) => {
        setFiltros({busqueda: e.target.value});
        // Si estamos viendo usuarios, recargar automáticamente con debounce
        if (tipoAuditoria === 'usuarios') {
            const nuevosFiltros = {...filtros, busqueda: e.target.value};
            setTimeout(() => fetchUsuariosAuditoria(nuevosFiltros), 500);
        }
    };

    const handlePageChange = (newPage) => {
        setPaginacion({paginaActual: newPage});
    };

    const handleFilterChange = (filterName, value) => {
        const nuevosFiltros = {...filtros, [filterName]: value};
        setFiltros({[filterName]: value});
        // Si estamos viendo usuarios, recargar automáticamente con debounce
        if (tipoAuditoria === 'usuarios') {
            setTimeout(() => fetchUsuariosAuditoria(nuevosFiltros), 500);
        }
    };

    const clearFilters = () => {
        limpiarFiltros();
        if (tipoAuditoria === 'usuarios') {
            setTimeout(() => fetchUsuariosAuditoria({}), 100);
        }
    };

    // Determinar datos y estado de carga según el tipo
    const datosActuales = tipoAuditoria === 'tenant' ? auditoriasFiltradas : auditoriasUsuarios;
    const cargandoActual = tipoAuditoria === 'tenant' ? cargando : cargandoUsuarios;
    const errorActual = tipoAuditoria === 'tenant' ? error : errorUsuarios;

    return (
        <div className={`auditoria-page ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="parent auditoria-content">
                <div className="div1 main-container">
                    {/* Header */}
                    <div className="div2 auditoria-header-section">
                        <div className="auditoria-header-content d-flex justify-content-between align-items-center">
                            <div className="auditoria-title-section justify-content-start">
                                <h2 className="auditoria-title fw-bold mb-0">Registro de Auditoría</h2>
                                <p className="auditoria-subtitle">Seguimiento de cambios en el sistema</p>
                            </div>
                            <div className="auditoria-actions d-flex justify-content-end gap-2">
                                <input
                                    type="text"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    placeholder="Buscar en auditoría..."
                                    style={{maxWidth: 260}}
                                    value={filtros.busqueda || ''}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        {/* Selector de tipo de auditoría */}
                        <div className="d-flex gap-2 mt-3">
                            <button
                                className={`btn ${tipoAuditoria === 'tenant' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleTipoChange('tenant')}
                                style={{minWidth: '150px'}}
                            >
                                <i className="bi bi-database me-2"></i>
                                Datos del Sistema
                            </button>
                            <button
                                className={`btn ${tipoAuditoria === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleTipoChange('usuarios')}
                                style={{minWidth: '150px'}}
                            >
                                <i className="bi bi-people me-2"></i>
                                Gestión de Usuarios
                            </button>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="auditoria-filters-section">
                        <div className="filters-container">
                            <div className="filter-group">
                                <label className="filter-label">Tipo de acción</label>
                                <select
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    value={filtros.tipo || ''}
                                    onChange={(e) => handleFilterChange('tipo', e.target.value)}
                                >
                                    <option value="">Todos los tipos</option>
                                    <option value="Creación">Creación</option>
                                    <option value="Modificación">Modificación</option>
                                    <option value="Eliminación">Eliminación</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label className="filter-label">Usuario</label>
                                <input
                                    type="text"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    placeholder="Filtrar por usuario"
                                    value={filtros.usuario || ''}
                                    onChange={(e) => handleFilterChange('usuario', e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                <label className="filter-label">Desde</label>
                                <input
                                    type="date"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    value={filtros.fechaDesde || ''}
                                    onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                <label className="filter-label">Hasta</label>
                                <input
                                    type="date"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    value={filtros.fechaHasta || ''}
                                    onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
                                />
                            </div>
                            <div className="filter-group">
                                <label className="filter-label invisible">Limpiar</label>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={clearFilters}
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de auditoría */}
                    <div className="div3">
                        {cargandoActual ? (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">
                                    {tipoAuditoria === 'tenant' ? 'Cargando datos del sistema...' : 'Cargando auditoría de usuarios...'}
                                </p>
                            </div>
                        ) : errorActual ? (
                            <div className="alert alert-danger m-3">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                Error al cargar auditorías: {errorActual}
                            </div>
                        ) : datosActuales && datosActuales.length === 0 ? (
                            <div className="alert alert-info m-3">
                                <i className="bi bi-info-circle me-2"></i>
                                No se encontraron registros de auditoría
                                {tipoAuditoria === 'usuarios' ? ' de usuarios' : ''}.
                            </div>
                        ) : (
                            window.TableAuditoria ? <window.TableAuditoria
                                data={datosActuales}
                                page={paginacion.paginaActual}
                                pageSize={PAGE_SIZE}
                                onPageChange={handlePageChange}
                                tipoAuditoria={tipoAuditoria}
                            /> : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Auditoria = Auditoria;
console.log('✅ Auditoria component loaded');