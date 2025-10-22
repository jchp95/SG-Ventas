class CreateUserModal extends React.Component {
    constructor(props) {
        super(props);
        const user = props.user || { fnombre: '', fnombre_usuario: '', femail: '', fnivel: 1, factivo: true };
        this.state = {
            form: { ...user }
        };
        this.isEdit = !!props.user;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value, type, checked } = e.target;
        this.setState({
            form: {
                ...this.state.form,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSave) this.props.onSave(this.state.form);
    }

    render() {
        const { form } = this.state;
        const { onClose } = this.props;
        const isEdit = this.isEdit;

        return (
            <form className="create-user-form" onSubmit={this.handleSubmit}>
                <h4>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h4>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" name="fnombre" className="form-control input-light" value={form.fnombre} onChange={this.handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Usuario</label>
                    <input type="text" name="fnombre_usuario" className="form-control input-light" value={form.fnombre_usuario} onChange={this.handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="femail" className="form-control input-light" value={form.femail} onChange={this.handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Nivel</label>
                    <input type="number" name="fnivel" className="form-control input-light" value={form.fnivel} onChange={this.handleChange} min={1} max={10} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" name="factivo" className="form-check-input" checked={form.factivo} onChange={this.handleChange} />
                    <label className="form-check-label">Activo</label>
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="atras-button" onClick={onClose}>Cancelar</button>
                    <button type="submit" className="register-button">{isEdit ? 'Guardar Cambios' : 'Crear Usuario'}</button>
                </div>
            </form>
        );
    }
}

window.CreateUserModal = CreateUserModal;
