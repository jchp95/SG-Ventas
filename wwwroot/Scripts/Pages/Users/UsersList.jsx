class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.PAGE_SIZE = 15;
        this.state = {
            search: "",
            page: 0,
            modalOpen: false,
            modalUser: null, // null = crear, objeto = editar
            showOffCanvas: false,
            selectedUser: null
        };
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, page: 0 });
    };

    handlePageChange = (newPage) => {
        this.setState({ page: newPage });
    };

    handleOpenCreate = () => {
        this.setState({ modalOpen: true, modalUser: null });
    };

    handleOpenEdit = (user) => {
        this.setState({ modalOpen: true, modalUser: user });
    };

    handleCloseModal = () => {
        this.setState({ modalOpen: false, modalUser: null });
    };

    handleSaveUser = (user) => {
        // Aquí puedes agregar lógica para guardar/actualizar el usuario
        this.setState({ modalOpen: false, modalUser: null });
    };

    handleOpenPermissions = (user) => {
        this.setState({ selectedUser: user, showOffCanvas: true });
    };

    handleCloseOffCanvas = () => {
        this.setState({ showOffCanvas: false, selectedUser: null });
    };

    render() {
        const { search, page, modalOpen, modalUser, showOffCanvas, selectedUser } = this.state;
        return (
            <div className="users-page">
                <div className="parent users-content">
                    <div className="div1 main-container">
                        <div className="div2 users-header-section">
                            <div className="users-header-content d-flex justify-content-between align-items-center">
                                <div className="users-title-section justify-content-start">
                                    <h2 className="users-title fw-bold mb-0">Administrar datos de usuarios</h2>
                                </div>
                                <div className="users-actions d-flex justify-content-end gap-2">
                                    <input
                                        type="text"
                                        className="form-control input-light"
                                        placeholder="Buscar usuario..."
                                        style={{ maxWidth: 260 }}
                                        value={search}
                                        onChange={this.handleSearchChange}
                                    />
                                    <button className="register-button" onClick={this.handleOpenCreate}>
                                         Crear Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="div3 users-table-section mt-3">
                            {window.TableUsers ? React.createElement(window.TableUsers, {
                                search,
                                page,
                                pageSize: this.PAGE_SIZE,
                                onPageChange: this.handlePageChange,
                                onEditUser: this.handleOpenEdit,
                                onPermissions: this.handleOpenPermissions
                            }) : null}
                        </div>
                    </div>
                </div>
                {window.Modal && window.CreateUserModal && React.createElement(window.Modal, {
                    open: modalOpen,
                    onClose: this.handleCloseModal
                }, React.createElement(window.CreateUserModal, {
                    user: modalUser,
                    onClose: this.handleCloseModal,
                    onSave: this.handleSaveUser
                }))}
                {window.OffCanvasPermissions && React.createElement(window.OffCanvasPermissions, {
                    show: showOffCanvas,
                    user: selectedUser,
                    onClose: this.handleCloseOffCanvas
                })}
            </div>
        );
    }
}

window.UsersList = UsersList;
