function CreateUserModal(props) {
    const user = props.user || { fnombre: '', fnombre_usuario: '', femail: '', fnivel: 1, factivo: true };
    const [form, setForm] = React.useState({ ...user });
    const isEdit = !!props.user;
    
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.onSave) props.onSave(form);
    };

    const { onClose } = props;

    return (
        <form className={`create-user-form ${tema === 'dark' ? 'create-user-form-dark' : ''}`} onSubmit={handleSubmit}>
            <h4>{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h4>
            <div className="mb-3">
                <label className={tema === 'dark' ? 'text-light' : ''}>Nombre</label>
                <input 
                    type="text" 
                    name="fnombre" 
                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`} 
                    value={form.fnombre} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className={tema === 'dark' ? 'text-light' : ''}>Usuario</label>
                <input 
                    type="text" 
                    name="fnombre_usuario" 
                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`} 
                    value={form.fnombre_usuario} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className={tema === 'dark' ? 'text-light' : ''}>Email</label>
                <input 
                    type="email" 
                    name="femail" 
                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`} 
                    value={form.femail} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className={tema === 'dark' ? 'text-light' : ''}>Nivel</label>
                <input 
                    type="number" 
                    name="fnivel" 
                    className={`form-control input-light ${tema === 'dark' ? 'input-dark' : ''}`} 
                    value={form.fnivel} 
                    onChange={handleChange} 
                    min={1} 
                    max={10} 
                    required 
                />
            </div>
            <div className="mb-3 form-check">
                <input 
                    type="checkbox" 
                    name="factivo" 
                    className={`form-check-input ${tema === 'dark' ? 'form-check-input-dark' : ''}`} 
                    checked={form.factivo} 
                    onChange={handleChange} 
                />
                <label className={`form-check-label ${tema === 'dark' ? 'text-light' : ''}`}>Activo</label>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="atras-button" onClick={onClose}>Cancelar</button>
                <button type="submit" className="register-button" onClick={() => {
                    if (window.Toats && isEdit) {
                        window.Toats.show('warning', 'Usuario editado correctamente');
                    }
                }}>{isEdit ? 'Guardar Cambios' : 'Crear Usuario'}</button>
            </div>
        </form>
    );
}

window.CreateUserModal = CreateUserModal;
