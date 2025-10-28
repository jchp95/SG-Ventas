// HookFormUtils.jsx - Configuración simplificada de React Hook Form

// Hacer disponible React Hook Form globalmente
window.ReactHookForm = window.ReactHookForm;

// Utilidades preconfiguradas para tu proyecto
window.HookFormUtils = {
    // Configuración base para todos los formularios
    useForm: (options = {}) => {
        return window.ReactHookForm.useForm({
            mode: 'onChange',
            reValidateMode: 'onChange',
            ...options
        });
    },
    
    // Componente de input preconfigurado
    InputField: ({ label, name, type = "text", register, errors, validation = {}, placeholder = "", ...props }) => {
        return (
            <div className="form-group mb-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <input
                    type={type}
                    id={name}
                    className={`form-control input-light ${errors[name] ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    {...register(name, validation)}
                    {...props}
                />
                {errors[name] && (
                    <div className="invalid-feedback d-flex align-items-center">
                        <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                        {errors[name]?.message}
                    </div>
                )}
            </div>
        );
    },

    // Componente para campos opcionales (sin validación)
    OptionalField: ({ label, name, type = "text", register, placeholder = "", ...props }) => {
        return (
            <div className="form-group mb-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <input
                    type={type}
                    id={name}
                    className="form-control input-light"
                    placeholder={placeholder}
                    {...register(name)}
                    {...props}
                />
            </div>
        );
    },

    // Componente para textarea
    TextareaField: ({ label, name, register, errors, validation = {}, placeholder = "", rows = 3, ...props }) => {
        return (
            <div className="form-group mb-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <textarea
                    id={name}
                    className={`form-control input-light ${errors[name] ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    rows={rows}
                    {...register(name, validation)}
                    {...props}
                />
                {errors[name] && (
                    <div className="invalid-feedback d-flex align-items-center">
                        <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                        {errors[name]?.message}
                    </div>
                )}
            </div>
        );
    }
};