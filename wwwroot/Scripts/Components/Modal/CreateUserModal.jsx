function CreateUserModal({show, onClose, onSave, usuario}) {
    const isEdit = !!usuario;

    const [form, setForm] = React.useState({
        nombre: usuario?.nombre || '',
        nombreUsuario: usuario?.nombreUsuario || '',
        email: usuario?.email || '',
        password: '',
        rol: usuario?.roles?.[0] || 'Usuario',
        activo: usuario?.activo !== undefined ? usuario.activo : true
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    // Redux hooks para tema
    const {tema} = window.ReduxProvider.useApp();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); // Limpiar errores previos

        // Validaciones
        const newErrors = {};
        
        if (!form.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!form.nombreUsuario.trim()) {
            newErrors.nombreUsuario = 'El nombre de usuario es requerido';
        }

        if (!form.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'El formato del email no es válido';
        }

        if (!isEdit && !form.password.trim()) {
            newErrors.password = 'La contraseña es requerida';
        } else if (form.password.trim() && form.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        // Si hay errores de validación, mostrarlos y detener
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            window.ToastUtils?.warning('Por favor, corrija los errores en el formulario');
            setLoading(false);
            return;
        }

        // Preparar datos para enviar
        const userData = {
            nombre: form.nombre,
            nombreUsuario: form.nombreUsuario,
            email: form.email,
            nivel: form.rol === 'Administrador' ? 1 : 2, // Asignar nivel según rol
            rol: form.rol,
            activo: form.activo
        };

        // Solo incluir password si no es edición o si se proporcionó uno nuevo
        if (!isEdit || form.password.trim()) {
            userData.password = form.password;
        }

        if (onSave) {
            const result = await onSave(userData);
            
            // Si hay errores del servidor, mostrarlos en los campos correspondientes
            if (result && !result.success && result.fieldErrors) {
                setErrors(result.fieldErrors);
                setLoading(false);
                return;
            }
        }

        setLoading(false);
    };

    if (!show) return null;

    return (
        <div className={`modal-backdrop-custom ${tema === 'dark' ? 'modal-backdrop-dark' : ''}`}>
            <div className={`modal-ventana ${tema === 'dark' ? 'modal-ventana-dark' : ''}`}>
                <button
                    type="button"
                    className={`modal-close-btn ${tema === 'dark' ? 'modal-close-btn-dark' : ''}`}
                    onClick={onClose}
                    disabled={loading}
                >
                    ×
                </button>
                <form onSubmit={handleSubmit} className={`create-user-form ${tema === 'dark' ? 'create-user-form-dark' : ''}`}>
                    <h4>
                        <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-person-plus'} me-2`}></i>
                        {isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                    </h4>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-person me-1"></i>
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Juan Pérez"
                            disabled={loading}
                        />
                        {errors.nombre && (
                            <div className="invalid-feedback d-block">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.nombre}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-at me-1"></i>
                            Nombre de Usuario *
                        </label>
                        <input
                            type="text"
                            name="nombreUsuario"
                            className={`form-control ${errors.nombreUsuario ? 'is-invalid' : ''}`}
                            value={form.nombreUsuario}
                            onChange={handleChange}
                            required
                            placeholder="Ej: jperez"
                            disabled={loading}
                        />
                        {errors.nombreUsuario && (
                            <div className="invalid-feedback d-block">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.nombreUsuario}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-envelope me-1"></i>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Ej: juan@empresa.com"
                            disabled={loading}
                        />
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-key me-1"></i>
                            Contraseña {isEdit && '(dejar vacío para mantener la actual)'}
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={form.password}
                                onChange={handleChange}
                                required={!isEdit}
                                placeholder={isEdit ? "Nueva contraseña" : "Contraseña"}
                                disabled={loading}
                                minLength={6}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                                style={{
                                    borderColor: tema === 'dark' ? 'rgba(179, 169, 255, 0.3)' : '#d7ceff',
                                    color: tema === 'dark' ? '#b3a9ff' : '#4361ee',
                                    background: tema === 'dark' ? 'rgba(76, 127, 255, 0.08)' : '#fff'
                                }}
                            >
                                <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                            </button>
                        </div>
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.password}
                            </div>
                        )}
                        {!isEdit && !errors.password && (
                            <small className="text-muted">
                                Mínimo 6 caracteres
                            </small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            <i className="bi bi-shield-check me-1"></i>
                            Rol *
                        </label>
                        <select
                            name="rol"
                            className="form-control"
                            value={form.rol}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        >
                            <option value="Usuario">Usuario</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                        <small className="text-muted">
                            {form.rol === 'Administrador' ? 'Nivel 1 - Acceso completo' : 'Nivel 2 - Acceso limitado'}
                        </small>
                    </div>

                    <div className="form-check form-switch mb-4">
                        <input
                            type="checkbox"
                            name="activo"
                            className="form-check-input"
                            id="activoCheck"
                            checked={form.activo}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <label className="form-check-label" htmlFor="activoCheck">
                            Usuario activo
                        </label>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn atras-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn register-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle me-1"></i>
                                    {isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

window.CreateUserModal = CreateUserModal;
console.log('✅ CreateUserModal component loaded');
