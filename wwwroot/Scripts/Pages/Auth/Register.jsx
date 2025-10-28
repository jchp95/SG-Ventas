/* jshint ignore:start */

/* global React, ReactDOM, App */

function Register() {
    const {useState} = React;
    const {useHistory} = window.ReactRouterDOM;
    const history = useHistory();

    // React Hook Form SEPARADO para cada step
    const { register: userRegister, handleSubmit: handleUserSubmit, formState: { errors: userErrors }, trigger: triggerUser, watch: watchUser } = window.HookFormUtils.useForm({
        mode: 'onChange'
    });

    const { register: companyRegister, handleSubmit: handleCompanySubmit, formState: { errors: companyErrors }, trigger: triggerCompany } = window.HookFormUtils.useForm({
        mode: 'onChange'
    });

    // React Hook Form para login
    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = window.HookFormUtils.useForm({
        mode: 'onChange'
    });

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [fading, setFading] = useState(false);
    const [exiting, setExiting] = useState(false);

    const [loginMode, setLoginMode] = useState(true);
    const [loginFading, setLoginFading] = useState(false);
    const [loginTransition, setLoginTransition] = useState('scale-fade-in');
    const [imageTransition, setImageTransition] = useState('scale-fade-in');
    const [stepTransition, setStepTransition] = useState('scale-fade-in');

    // Watch para validación de confirmación de password (del step 1)
    const watchPassword = watchUser("password");

    // Datos combinados para enviar al servidor
    const [formData, setFormData] = useState({
        user: {},
        company: {}
    });

    // Continuar al step 2 - Guardar datos del usuario y avanzar
    const onUserSubmit = async (userData) => {
        const isValid = await triggerUser(['name', 'username', 'email', 'password', 'confirm']);
        if (isValid) {
            setFormData(prev => ({...prev, user: userData}));
            setMessage(null);
            setStepTransition('scale-fade-out');
            setTimeout(() => {
                setStep(2);
                setStepTransition('slide-fade-in');
            }, 450);
        }
    };

    // Enviar formulario completo - Combinar datos de usuario y empresa
    const onCompanySubmit = async (companyData) => {
        const isValid = await triggerCompany(['companyRnc', 'companyName']);
        if (isValid) {
            setSubmitting(true);
            setMessage(null);

            const completeData = {
                ...formData.user,
                ...companyData
            };

            console.log('Datos completos para enviar:', completeData);

            setTimeout(() => {
                setSubmitting(false);
                history.push('/home');
            }, 1200);
        }
    };

    function formatPhone(value) {
        let v = value.replace(/\D/g, '').slice(0, 10);
        if (v.length >= 1) v = '(' + v;
        if (v.length >= 4) v = v.slice(0, 4) + ')-' + v.slice(4);
        if (v.length >= 9) v = v.slice(0, 9) + '-' + v.slice(9);
        return v;
    }

    const handlePhoneInput = (e) => {
        const value = e.target.value;
        const formatted = formatPhone(value);
        e.target.value = formatted;
    };

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

    // Login submit con React Hook Form
    const onLoginSubmit = async (data) => {
        setSubmitting(true);
        console.log('Datos de login:', data);
        setTimeout(() => {
            setSubmitting(false);
        }, 900);
    };

    const transitionClass = `${fading ? 'fade-out' : 'fade-in'} fade-slide`;
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

                                                {/* FORMULARIO SEPARADO PARA STEP 1 - USUARIO */}
                                                {step === 1 && (
                                                    <form className="mt-2" onSubmit={handleUserSubmit(onUserSubmit)}>
                                                        <div className="register-fields">
                                                            <window.HookFormUtils.InputField
                                                                label="Nombre"
                                                                name="name"
                                                                type="text"
                                                                register={userRegister}
                                                                errors={userErrors}
                                                                validation={{
                                                                    required: 'El nombre es obligatorio',
                                                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                                                }}
                                                                placeholder="Nombre completo"
                                                            />

                                                            <window.HookFormUtils.InputField
                                                                label="Nombre de usuario"
                                                                name="username"
                                                                type="text"
                                                                register={userRegister}
                                                                errors={userErrors}
                                                                validation={{
                                                                    required: 'El nombre de usuario es obligatorio',
                                                                    pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Solo letras, números y guiones bajos' }
                                                                }}
                                                                placeholder="usuario123"
                                                            />

                                                            <window.HookFormUtils.InputField
                                                                label="Email"
                                                                name="email"
                                                                type="email"
                                                                register={userRegister}
                                                                errors={userErrors}
                                                                validation={{
                                                                    required: 'El email es obligatorio',
                                                                    pattern: {
                                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                        message: 'Ingrese un email válido'
                                                                    }
                                                                }}
                                                                placeholder="mail@ejemplo.com"
                                                            />

                                                            <window.HookFormUtils.InputField
                                                                label="Contraseña"
                                                                name="password"
                                                                type="password"
                                                                register={userRegister}
                                                                errors={userErrors}
                                                                validation={{
                                                                    required: 'La contraseña es obligatoria',
                                                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                                                }}
                                                                placeholder="*******"
                                                            />

                                                            <window.HookFormUtils.InputField
                                                                label="Confirmar contraseña"
                                                                name="confirm"
                                                                type="password"
                                                                register={userRegister}
                                                                errors={userErrors}
                                                                validation={{
                                                                    required: 'Confirme la contraseña',
                                                                    validate: value => value === watchPassword || 'Las contraseñas no coinciden'
                                                                }}
                                                                placeholder="*******"
                                                            />
                                                        </div>
                                                    </form>
                                                )}

                                                {/* FORMULARIO SEPARADO PARA STEP 2 - EMPRESA */}
                                                {step === 2 && (
                                                    <form className="mt-2" onSubmit={handleCompanySubmit(onCompanySubmit)}>
                                                        <div className="register-fields">
                                                            <window.HookFormUtils.InputField
                                                                label="RNC"
                                                                name="companyRnc"
                                                                type="text"
                                                                register={companyRegister}
                                                                errors={companyErrors}
                                                                validation={{
                                                                    required: 'El RNC es requerido',
                                                                    pattern: {
                                                                        value: /^\d{9}$|^\d{11}$/,
                                                                        message: 'El RNC debe tener 9 o 11 dígitos'
                                                                    }
                                                                }}
                                                                placeholder="RNC de la empresa"
                                                            />

                                                            <window.HookFormUtils.InputField
                                                                label="Nombre comercial"
                                                                name="companyName"
                                                                type="text"
                                                                register={companyRegister}
                                                                errors={companyErrors}
                                                                validation={{
                                                                    required: 'El nombre comercial de la empresa es obligatorio'
                                                                }}
                                                                placeholder="Nombre comercial"
                                                            />

                                                            <window.HookFormUtils.OptionalField
                                                                label="Razón social"
                                                                name="companyRazonSocial"
                                                                type="text"
                                                                register={companyRegister}
                                                                placeholder="Razón social (opcional)"
                                                            />

                                                            <window.HookFormUtils.OptionalField
                                                                label="Dirección"
                                                                name="companyAddress"
                                                                type="text"
                                                                register={companyRegister}
                                                                placeholder="Dirección"
                                                            />

                                                            {/* Campo de teléfono personalizado por el formateo */}
                                                            <div className="mb-3">
                                                                <label className="form-label">Teléfono</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control input-light"
                                                                    placeholder="(000)-000-0000"
                                                                    maxLength={14}
                                                                    onInput={handlePhoneInput}
                                                                    {...companyRegister("companyPhone")}
                                                                />
                                                            </div>

                                                            <window.HookFormUtils.InputField
                                                                label="Email de la empresa"
                                                                name="companyEmail"
                                                                type="email"
                                                                register={companyRegister}
                                                                errors={companyErrors}
                                                                validation={{
                                                                    required: false,
                                                                    pattern: {
                                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                        message: 'Ingrese un email válido'
                                                                    }
                                                                }}
                                                                placeholder="empresa@ejemplo.com"
                                                            />
                                                        </div>
                                                    </form>
                                                )}

                                                {/* Botones */}
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
                                                        onClick={step === 1 ? handleUserSubmit(onUserSubmit) : handleCompanySubmit(onCompanySubmit)}
                                                    >
                                                        {step === 1 ? 'Continuar' : (submitting ? 'Registrando...' : 'Registrar')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                                            <img src="/img/register.jpg" alt="Ilustración registro"
                                                 className={`image ${imageTransition}`}
                                                 style={{ maxWidth: '100%', boxShadow: '0 8px 30px rgba(36,37,38,0.06)' }}/>
                                        </div>
                                    </>
                                )}

                                {/* Modo Login */}
                                {loginMode && (
                                    <>
                                        <div className={`col-md-6 ${loginTransition}`}>
                                            <div className="form-inner-container w-100">
                                                <h4 className="card-title d-flex justify-content-center">Iniciar sesión</h4>
                                                <form className="mt-2" onSubmit={handleLoginSubmit(onLoginSubmit)}>
                                                    <div className="register-fields">
                                                        <window.HookFormUtils.InputField
                                                            label="Usuario"
                                                            name="username"
                                                            type="text"
                                                            register={loginRegister}
                                                            errors={loginErrors}
                                                            validation={{
                                                                required: 'El usuario es obligatorio'
                                                            }}
                                                            placeholder="usuario123"
                                                        />

                                                        <window.HookFormUtils.InputField
                                                            label="Contraseña"
                                                            name="password"
                                                            type="password"
                                                            register={loginRegister}
                                                            errors={loginErrors}
                                                            validation={{
                                                                required: 'La contraseña es obligatoria'
                                                            }}
                                                            placeholder="*******"
                                                        />
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
                                                 style={{ maxWidth: '100%', boxShadow: '0 8px 30px rgba(36,37,38,0.06)' }}/>
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