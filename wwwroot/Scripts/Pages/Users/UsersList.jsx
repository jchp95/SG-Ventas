// filepath: /Users/julio/Documents/Proyectos de Programacion/Anthony trabajo RD/Ventas/wwwroot/Scripts/Pages/Users/UsersList.jsx
function UsersList() {
    const PAGE_SIZE = 15;
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalUser, setModalUser] = React.useState(null); // null = crear, objeto = editar
    const [showOffCanvas, setShowOffCanvas] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [filterEstado, setFilterEstado] = React.useState('todos');

    /// Redux hooks
    const {tema} = window.ReduxProvider.useApp();
    const {usuarios, cargando} = window.ReduxProvider.useUsuarios();
    const dispatch = window.ReduxProvider.useDispatch();

    // Cargar usuarios al montar el componente
    React.useEffect(() => {
        dispatch(window.UsuariosActions.fetchUsuarios());
    }, []);

    // Filtrar usuarios
    const usuariosFiltrados = React.useMemo(() => {
        let filtered = usuarios || [];

        // Filtrar por búsqueda
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(u =>
                u.nombre.toLowerCase().includes(searchLower) ||
                u.nombreUsuario.toLowerCase().includes(searchLower) ||
                u.email.toLowerCase().includes(searchLower)
            );
        }

        // Filtrar por estado
        if (filterEstado === 'activos') {
            filtered = filtered.filter(u => u.activo);
        } else if (filterEstado === 'inactivos') {
            filtered = filtered.filter(u => !u.activo);
        }

        return filtered;
    }, [usuarios, search, filterEstado]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(0);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleOpenCreate = () => {
        setModalOpen(true);
        setModalUser(null);
    };

    const handleOpenEdit = (user) => {
        setModalOpen(true);
        setModalUser(user);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalUser(null);
    };

    const handleSaveUser = async (userData) => {
        let result;
        if (modalUser) {
            // Editar usuario existente
            result = await dispatch(window.UsuariosActions.editarUsuario({
                ...userData,
                fidUsuario: modalUser.fidUsuario
            }));
            
            if (result && result.success) {
                window.ToastUtils?.success('Usuario actualizado correctamente', 'Éxito');
                handleCloseModal();
            } else {
                const errorMessage = result?.error || 'Error al actualizar el usuario';
                
                // Detectar errores específicos del mensaje
                const fieldErrors = {};
                if (errorMessage.includes('nombre de usuario') && errorMessage.includes('ya está en uso')) {
                    fieldErrors.nombreUsuario = errorMessage;
                } else if (errorMessage.includes('email') && errorMessage.includes('ya está en uso')) {
                    fieldErrors.email = errorMessage;
                }
                
                // Si hay errores de campo, mostrar toast genérico y devolver errores específicos
                if (Object.keys(fieldErrors).length > 0) {
                    window.ToastUtils?.error('El usuario no pudo ser actualizado. Revise los campos marcados.', 'Error de validación');
                    return { success: false, fieldErrors };
                } else {
                    window.ToastUtils?.error(errorMessage, 'Error');
                }
            }
        } else {
            // Crear nuevo usuario
            result = await dispatch(window.UsuariosActions.crearUsuario(userData));
            
            if (result && result.success) {
                window.ToastUtils?.success('Usuario creado correctamente', 'Éxito');
                handleCloseModal();
            } else {
                const errorMessage = result?.error || 'Error al crear el usuario';
                
                // Detectar errores específicos del mensaje
                const fieldErrors = {};
                if (errorMessage.includes('nombre de usuario') && errorMessage.includes('ya está en uso')) {
                    fieldErrors.nombreUsuario = errorMessage;
                } else if (errorMessage.includes('email') && errorMessage.includes('ya está en uso')) {
                    fieldErrors.email = errorMessage;
                }
                
                // Si hay errores de campo, mostrar toast genérico y devolver errores específicos
                if (Object.keys(fieldErrors).length > 0) {
                    window.ToastUtils?.error('El usuario no pudo ser creado. Revise los campos marcados.', 'Error de validación');
                    return { success: false, fieldErrors };
                } else {
                    window.ToastUtils?.error(errorMessage, 'Error');
                }
            }
        }
        
        return result;
    };

    const handleDeleteUser = async (userId) => {
        if (confirm('¿Está seguro de que desea desactivar este usuario?')) {
            const result = await dispatch(window.UsuariosActions.eliminarUsuarioById(userId));
            
            if (result && result.success) {
                window.ToastUtils?.success('Usuario desactivado correctamente', 'Éxito');
            } else {
                window.ToastUtils?.error(result?.error || 'Error al desactivar el usuario', 'Error');
            }
        }
    };

    const handleActivateUser = async (userId) => {
        if (confirm('¿Está seguro de que desea activar este usuario?')) {
            const result = await dispatch(window.UsuariosActions.activarUsuario(userId));
            
            if (result && result.success) {
                window.ToastUtils?.success('Usuario activado correctamente', 'Éxito');
            } else {
                window.ToastUtils?.error(result?.error || 'Error al activar el usuario', 'Error');
            }
        }
    };

    const handleOpenPermissions = (user) => {
        setSelectedUser(user);
        setShowOffCanvas(true);
    };

    const handleCloseOffCanvas = () => {
        setShowOffCanvas(false);
        setSelectedUser(null);
    };

    return (
        <div className={`users-page ${tema === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <div className="parent users-content">
                <div className="div1 main-container">
                    {/* Header */}
                    <div className="div2 users-header-section">
                        <div className="users-header-content d-flex justify-content-between align-items-center">
                            <div className="users-title-section justify-content-start">
                                <h2 className="users-title fw-bold mb-0">Gestión de Usuarios</h2>
                                <p className="users-subtitle">Administre los usuarios de su empresa</p>
                            </div>
                            <div className="users-actions d-flex justify-content-end gap-2">
                                <input
                                    type="text"
                                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`}
                                    placeholder="Buscar usuarios..."
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
                                    Nuevo Usuario
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
                                    {usuariosFiltrados.length} usuario(s) encontrado(s)
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

                    {/* Tabla de usuarios */}
                    <div className="div3">
                        {cargando ? (
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : (
                            window.TableUsers ? React.createElement(window.TableUsers, {
                                data: usuariosFiltrados,
                                page: page,
                                pageSize: PAGE_SIZE,
                                onPageChange: handlePageChange,
                                onEditUser: handleOpenEdit,
                                onDeleteUser: handleDeleteUser,
                                onActivateUser: handleActivateUser,
                                onPermissions: handleOpenPermissions
                            }) : null
                        )}
                    </div>
                </div>
            </div>

            {/* Modal para crear/editar usuario */}
            {modalOpen && (
                <window.CreateUserModal
                    show={modalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveUser}
                    usuario={modalUser}
                />
            )}

            {/* OffCanvas para ver permisos */}
            {showOffCanvas && selectedUser && (
                <window.OffCanvasPermissions
                    show={showOffCanvas}
                    onClose={handleCloseOffCanvas}
                    usuario={selectedUser}
                />
            )}
        </div>
    );
}

window.UsersList = UsersList;
console.log('✅ UsersList component loaded');
