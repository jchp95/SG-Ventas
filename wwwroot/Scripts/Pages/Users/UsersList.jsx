function UsersList() {
    const PAGE_SIZE = 15;
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalUser, setModalUser] = React.useState(null); // null = crear, objeto = editar
    const [showOffCanvas, setShowOffCanvas] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);
    
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();

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

    const handleSaveUser = (user) => {
        // Aquí puedes agregar lógica para guardar/actualizar el usuario
        setModalOpen(false);
        setModalUser(null);
    };

    const handleOpenPermissions = (user) => {
        setSelectedUser(user);
        setShowOffCanvas(true);
    };

    const handleCloseOffCanvas = () => {
        setShowOffCanvas(false);
        setSelectedUser(null);
    };
    return React.createElement('div', { className: `users-page ${tema === 'dark' ? 'theme-dark' : 'theme-light'}` },
        React.createElement('div', { className: 'parent users-content' },
            React.createElement('div', { className: 'div1 main-container' },
                React.createElement('div', { className: 'div2 users-header-section' },
                    React.createElement('div', { className: 'users-header-content d-flex justify-content-between align-items-center' },
                        React.createElement('div', { className: 'users-title-section justify-content-start' },
                            React.createElement('h2', { className: 'users-title fw-bold mb-0' }, 'Administrar datos de usuarios')
                        ),
                        React.createElement('div', { className: 'users-actions d-flex justify-content-end gap-2' },
                            React.createElement('input', {
                                type: 'text',
                                className: `form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`,
                                placeholder: 'Buscar usuario...',
                                style: { maxWidth: 260 },
                                value: search,
                                onChange: handleSearchChange
                            }),
                            React.createElement('button', { 
                                className: 'btn btn-primary', 
                                onClick: handleOpenCreate 
                            }, React.createElement('i', { className: 'bi bi-plus-circle me-2' }), 'Crear Usuario')
                        )
                    )
                ),
                React.createElement('div', { className: 'div3' },
                    window.TableUsers ? React.createElement(window.TableUsers, {
                        search,
                        page,
                        pageSize: PAGE_SIZE,
                        onPageChange: handlePageChange,
                        onEditUser: handleOpenEdit,
                        onPermissions: handleOpenPermissions
                    }) : null
                )
            )
        ),
        window.Modal && window.CreateUserModal && React.createElement(window.Modal, {
            open: modalOpen,
            onClose: handleCloseModal
        }, React.createElement(window.CreateUserModal, {
            user: modalUser,
            onClose: handleCloseModal,
            onSave: handleSaveUser
        })),
        window.OffCanvasPermissions && React.createElement(window.OffCanvasPermissions, {
            show: showOffCanvas,
            user: selectedUser,
            onClose: handleCloseOffCanvas
        })
    );
}

window.UsersList = UsersList;
