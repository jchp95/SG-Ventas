/* jshint ignore:start */

/* global React, ReactDOM, App */

function Register() {
    const {useState} = React;

    const [form, setForm] = useState({
        // Usuario
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        // Empresa
        companyRnc: '',
        companyName: '',
        companyRazonSocial: '',
        companyAddress: '',
        companyPhone: '',
        companyEmail: ''
    });

    const [step, setStep] = useState(1); // 1 = usuario, 2 = empresa
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [fading, setFading] = useState(false); // controla la animación de fade entre pasos
    const [exiting, setExiting] = useState(false); // controla la animación de salida global
    const [errors, setErrors] = useState({});

    const [loginMode, setLoginMode] = useState(true); // controla si se muestra el login
    const [loginFading, setLoginFading] = useState(false); // animación de fade para login
    const [loginForm, setLoginForm] = useState({username: '', password: ''});
    const [loginErrors, setLoginErrors] = useState({});

    const [loginTransition, setLoginTransition] = useState('scale-fade-in');
    const [imageTransition, setImageTransition] = useState('scale-fade-in');


    // Estado para animación entre pasos
    const [stepTransition, setStepTransition] = useState('scale-fade-in');

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prev => ({...prev, [name]: value}));
    }

    function handleLoginInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setLoginForm(prev => ({...prev, [name]: value}));
    }

    function validateUser() {
        const newErrors = {};
        if (!form.name) newErrors.name = 'El nombre es obligatorio.';
        if (!form.username) newErrors.username = 'El nombre de usuario es obligatorio.';
        if (!form.email) newErrors.email = 'El email es obligatorio.';
        if (!form.password) newErrors.password = 'La contraseña es obligatoria.';
        if (form.password !== form.confirm) newErrors.confirm = 'Las contraseñas no coinciden.';
        return newErrors;
    }

    function validateCompany() {
        const newErrors = {};
        if (!form.companyRnc) newErrors.companyRnc = 'El RNC de la empresa es obligatorio.';
        if (!form.companyName) newErrors.companyName = 'El nombre comercial de la empresa es obligatorio.';
        // ...puedes agregar más validaciones si lo deseas...
        return newErrors;
    }

    function handleContinue(e) {
        e.preventDefault();
        const fieldErrors = validateUser();
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) return;

        setMessage(null);
        setStepTransition('scale-fade-out');
        setTimeout(() => {
            setStep(2);
            setStepTransition('slide-fade-in');
        }, 450);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (step === 1) {
            return handleContinue(e);
        }
        const fieldErrors = validateCompany();
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) return;

        setSubmitting(true);
        setMessage(null);

        // Simula llamada al servidor. Reemplaza por fetch real a tu API cuando exista.
        setTimeout(() => {
            setSubmitting(false);

            // Animación de fade out global antes de cambiar a App
            setExiting(true);

            setTimeout(() => {
                if (typeof App !== 'undefined') {
                    try {
                        const rootEl = document.getElementById('root');
                        if (window.__APP_ROOT && typeof window.__APP_ROOT.render === 'function') {
                            window.__APP_ROOT.render(React.createElement(App, {animateIn: true}));
                        } else if (rootEl && typeof ReactDOM !== 'undefined' && typeof ReactDOM.createRoot === 'function') {
                            window.__APP_ROOT = ReactDOM.createRoot(rootEl);
                            window.__APP_ROOT.render(React.createElement(App, {animateIn: true}));
                        } else {
                            window.location.reload();
                        }
                    } catch (ex) {
                        window.location.reload();
                    }
                } else {
                    window.location.reload();
                }
            }, 400); // Espera a que termine el fade out
        }, 900);
    }

    function formatPhone(value) {
        // Solo números
        let v = value.replace(/\D/g, '').slice(0, 10);
        if (v.length >= 1) v = '(' + v;
        if (v.length >= 4) v = v.slice(0, 4) + ')-' + v.slice(4);
        if (v.length >= 9) v = v.slice(0, 9) + '-' + v.slice(9);
        return v;
    }

    function handlePhoneInput(e) {
        const value = e.target.value;
        setForm(prev => ({...prev, companyPhone: formatPhone(value)}));
    }

    function showLogin() {
        setStepTransition('scale-fade-out');
        setLoginTransition('scale-fade-out');
        setImageTransition('scale-fade-out');
        setTimeout(() => {
            setLoginMode(true);
            setStepTransition('scale-fade-in');
            setLoginTransition('scale-fade-in');
            setImageTransition('scale-fade-in');
        }, 450);
    }

    function hideLogin() {
        setStepTransition('scale-fade-out');
        setLoginTransition('scale-fade-out');
        setImageTransition('scale-fade-out');
        setTimeout(() => {
            setLoginMode(false);
            setStepTransition('scale-fade-in');
            setLoginTransition('scale-fade-in');
            setImageTransition('scale-fade-in');
        }, 450);
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        const errors = {};
        if (!loginForm.username) errors.username = 'El usuario es obligatorio.';
        if (!loginForm.password) errors.password = 'La contraseña es obligatoria.';
        setLoginErrors(errors);
        if (Object.keys(errors).length > 0) return;
        // Aquí iría la lógica de autenticación
        // Simulación de éxito
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            // Aquí podrías redirigir o mostrar mensaje de éxito
        }, 900);
    }

    // clase de transición moderna
    const transitionClass = `${fading ? 'fade-out' : 'fade-in'} fade-slide`;

    // Estilo para fade out global
    const containerStyle = {
        transition: 'opacity .4s ease',
        opacity: exiting ? 0 : 1
    };

    const stepTitle = step === 1 ? 'Registro de usuario' : 'Registro de la empresa';

    return (
        <div className="register-container d-flex justify-content-center align-items-center position-relative"
             style={containerStyle}>
            <button
                type="button"
                className={`register-button login-button ${loginFading ? 'fade-out fade-slide' : 'fade-in fade-slide'}`}
                style={{
                    position: 'absolute',
                    top: 24,
                    right: 32,
                    zIndex: 10
                }}
                onClick={loginMode ? hideLogin : showLogin}
            >
                {loginMode ? 'Registrar' : 'Acceder'}
            </button>
            <div className="row justify-content-center w-100">
                <div className="col-12 col-lg-10">
                    <div className="card shadow-sm register-card glassmorphism-effect register-card-min-height">
                        <div className="card-body d-grid">
                            <div className="row">
                                {/* Izquierda: formulario (usuario o empresa según step) */}
                                {!loginMode && (
                                    <>
                                        <div className={`col-md-6 ${stepTransition}`}>
                                            <div className="form-inner-container w-100">
                                                <h4 className="card-title d-flex justify-content-center">{stepTitle}</h4>

                                                <form className="mt-2"
                                                      onSubmit={step === 1 ? handleContinue : handleSubmit}>
                                                    {/* Campos del formulario */}
                                                    <div className="register-fields">
                                                        {step === 1 ? (
                                                            <>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={form.name}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="Nombre completo"
                                                                    />
                                                                    {errors.name !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.name}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Nombre de
                                                                        usuario</label>
                                                                    <input
                                                                        type="text"
                                                                        name="username"
                                                                        value={form.username}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="usuario123"
                                                                    />
                                                                    {errors.username !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.username}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Email</label>
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={form.email}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="mail@ejemplo.com"
                                                                    />
                                                                    {errors.email !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.email}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Contraseña</label>
                                                                    <input
                                                                        type="password"
                                                                        name="password"
                                                                        value={form.password}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="*******"
                                                                    />
                                                                    {errors.password !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.password}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Confirmar
                                                                        contraseña</label>
                                                                    <input
                                                                        type="password"
                                                                        name="confirm"
                                                                        value={form.confirm}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="*******"
                                                                    />
                                                                    {errors.confirm !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.confirm}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="mb-3">
                                                                    <label className="form-label">RNC</label>
                                                                    <input
                                                                        type="text"
                                                                        name="companyRnc"
                                                                        value={form.companyRnc}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="RNC de la empresa"
                                                                    />
                                                                    {errors.companyRnc !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.companyRnc}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Nombre
                                                                        comercial</label>
                                                                    <input
                                                                        type="text"
                                                                        name="companyName"
                                                                        value={form.companyName}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="Nombre comercial"
                                                                    />
                                                                    {errors.companyName !== undefined ? (
                                                                        <div
                                                                            className="form-text text-danger small">{errors.companyName}</div>
                                                                    ) : (
                                                                        <div className="form-text text-danger small"
                                                                             style={{visibility: 'hidden'}}>&nbsp;</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Razón social</label>
                                                                    <input
                                                                        type="text"
                                                                        name="companyRazonSocial"
                                                                        value={form.companyRazonSocial}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="Razón social (opcional)"
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Dirección</label>
                                                                    <input
                                                                        type="text"
                                                                        name="companyAddress"
                                                                        value={form.companyAddress}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="Dirección"
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Teléfono</label>
                                                                    <input
                                                                        type="text"
                                                                        name="companyPhone"
                                                                        value={form.companyPhone}
                                                                        onChange={handlePhoneInput}
                                                                        className="form-control input-light"
                                                                        placeholder="(000)-000-0000"
                                                                        maxLength={14}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Email de la
                                                                        empresa</label>
                                                                    <input
                                                                        type="email"
                                                                        name="companyEmail"
                                                                        value={form.companyEmail}
                                                                        onChange={handleInput}
                                                                        className="form-control input-light"
                                                                        placeholder="empresa@ejemplo.com"
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </form>
                                                {/* Botón fijo al fondo, fuera del formulario */}
                                                <div className="register-btn-container d-flex gap-2">
                                                    {step === 2 && (
                                                        <button
                                                            type="button"
                                                            className="atras-button"
                                                            disabled={submitting}
                                                            onClick={() => {
                                                                setStepTransition('slide-fade-out');
                                                                setTimeout(() => {
                                                                    setStep(1);
                                                                    setStepTransition('scale-fade-in');
                                                                }, 450);
                                                            }}
                                                        >
                                                            Atrás
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="register-button"
                                                        disabled={submitting}
                                                        onClick={step === 1 ? handleContinue : handleSubmit}
                                                    >
                                                        {step === 1 ? 'Continuar' : (submitting ? 'Registrando...' : 'Registrar')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                                            <img src="/img/register.jpg" alt="Ilustración registro"
                                                 className={`image ${imageTransition}`}
                                                 style={{
                                                     maxWidth: '100%',
                                                     boxShadow: '0 8px 30px rgba(36,37,38,0.06)'
                                                 }}/>
                                        </div>
                                    </>
                                )}
                                {/* Modo Login */}
                                {loginMode && (
                                    <>
                                        <div className={`col-md-6 ${loginTransition}`}>
                                            <div className="form-inner-container w-100">
                                                <h4 className="card-title d-flex justify-content-center">Iniciar
                                                    sesión</h4>
                                                <form className="mt-2" onSubmit={handleLoginSubmit}>
                                                    <div className="register-fields">
                                                        <div className="mb-3">
                                                            <label className="form-label">Usuario</label>
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                value={loginForm.username}
                                                                onChange={handleLoginInput}
                                                                className="form-control input-light"
                                                                placeholder="usuario123"
                                                            />
                                                            {loginErrors.username !== undefined ? (
                                                                <div
                                                                    className="form-text text-danger small">{loginErrors.username}</div>
                                                            ) : (
                                                                <div className="form-text text-danger small"
                                                                     style={{visibility: 'hidden'}}>&nbsp;</div>
                                                            )}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Contraseña</label>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={loginForm.password}
                                                                onChange={handleLoginInput}
                                                                className="form-control input-light"
                                                                placeholder="*******"
                                                            />
                                                            {loginErrors.password !== undefined ? (
                                                                <div
                                                                    className="form-text text-danger small">{loginErrors.password}</div>
                                                            ) : (
                                                                <div className="form-text text-danger small"
                                                                     style={{visibility: 'hidden'}}>&nbsp;</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="register-btn-container d-flex gap-2">
                                                        <button
                                                            type="submit"
                                                            className="register-button"
                                                            disabled={submitting}
                                                        >
                                                            {submitting ? 'Accediendo...' : 'Acceder'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                                            <img src="/img/login.jpg" alt="Ilustración login"
                                                 className={`image ${imageTransition}`}
                                                 style={{
                                                     maxWidth: '100%',
                                                     boxShadow: '0 8px 30px rgba(36,37,38,0.06)'
                                                 }}/>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Register = Register;

/* jshint ignore:end */
