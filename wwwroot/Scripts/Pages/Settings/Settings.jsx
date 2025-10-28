/* jshint ignore:start */

/* global React, ReactDOM, App */

function Settings() {
    const {useState, useEffect} = React;
    const {useHistory} = window.ReactRouterDOM;
    const history = useHistory();
    
    // Redux hooks para tema
    const { tema } = window.ReduxProvider.useApp();

    // React Hook Form para settings
    const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = window.HookFormUtils.useForm({
        mode: 'onChange'
    });

    const [loading, setLoading] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [fondoFile, setFondoFile] = useState(null);
    const [qrWebFile, setQrWebFile] = useState(null);
    const [qrRedesFile, setQrRedesFile] = useState(null);
    const [message, setMessage] = useState(null);
    const [transition, setTransition] = useState('scale-fade-in');

    // Watch para valores del formulario
    const watchNombreComercial = watch("fnombreComercial");
    const watchSlogan = watch("festlogan");

    function handleFileChange(e, fileType) {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showAlert('error', 'Solo se permiten archivos de imagen: JPG, PNG, GIF, WEBP');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showAlert('error', `El archivo es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). El tamaño máximo permitido es 5MB.`);
            return;
        }

        switch (fileType) {
            case 'logo':
                setLogoFile(file);
                break;
            case 'fondo':
                setFondoFile(file);
                break;
            case 'qrWeb':
                setQrWebFile(file);
                break;
            case 'qrRedes':
                setQrRedesFile(file);
                break;
        }
    }

    function showAlert(type, text) {
        setMessage({type, text});
        setTimeout(() => setMessage(null), 5000);
    }

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
        setValue("ftelefonos", formatted, { shouldValidate: true });
    };

    // Enviar formulario con React Hook Form
    const onSubmit = async (data) => {
        const isValid = await trigger();
        
        if (!isValid) {
            showAlert('error', 'Por favor corrige los errores en el formulario antes de continuar.');
            return;
        }

        setLoading(true);
        setMessage(null);

        const formData = {
            ...data,
            logoFile,
            fondoFile,
            qrWebFile,
            qrRedesFile
        };

        console.log('Datos para enviar:', formData);

        setTimeout(() => {
            setLoading(false);
            showAlert('success', 'La configuración de la empresa ha sido guardada exitosamente.');
            
            setLogoFile(null);
            setFondoFile(null);
            setQrWebFile(null);
            setQrRedesFile(null);
            
            ['logo', 'fondo', 'qrWeb', 'qrRedes'].forEach(type => {
                const input = document.getElementById(`${type}-upload`);
                if (input) input.value = '';
            });
        }, 1500);
    };

    function renderFileUploadField(fileType, label, accept = "image/*") {
        const files = {
            'logo': logoFile,
            'fondo': fondoFile,
            'qrWeb': qrWebFile,
            'qrRedes': qrRedesFile
        };
        
        const file = files[fileType];
        const hasFile = !!file;
        
        const handleChangeFile = () => {
            const fileInput = document.getElementById(`${fileType}-upload`);
            if (fileInput) {
                fileInput.click();
            }
        };
        
        return (
            <div className="mb-3">
                <label className="form-label">{label}</label>
                <div className="file-upload-container">
                    <input
                        type="file"
                        accept={accept}
                        onChange={(e) => handleFileChange(e, fileType)}
                        className="settings-file-input"
                        id={`${fileType}-upload`}
                        style={{display: 'none'}}
                    />
                    <div className="file-upload-label" onClick={!hasFile ? handleChangeFile : undefined}>
                        <div className={`file-upload-content ${hasFile ? 'has-file' : ''}`}>
                            {hasFile ? (
                                <div className="file-preview">
                                    <div className="file-info">
                                        <small className="text-muted">
                                            {file.name}
                                        </small>
                                        <div className="mt-1">
                                            <small className="text-success">
                                                ✓ Archivo seleccionado
                                            </small>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="register-button mt-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleChangeFile();
                                        }}
                                    >
                                        Cambiar
                                    </button>
                                </div>
                            ) : (
                                <div className="file-placeholder">
                                    <span>📷 Seleccionar {label}</span>
                                    <small>JPG, PNG, GIF hasta 5MB</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`settings-container d-flex justify-content-center align-items-center position-relative ${tema === 'dark' ? 'theme-dark' : ''}`}>
            <div className="d-flex justify-content-center w-100">
                <div className="col-12 col-lg-11">
                    <div className={`card shadow-sm settings-card glassmorphism-effect ${transition}`}>
                        <div className="card-body d-grid">
                            <div className="row">
                                {/* Columna Izquierda - Información Básica */}
                                <div className="col-md-6">
                                    <div className="form-inner-container w-100">
                                        <h4 className="card-title d-flex justify-content-center gradient-texts">
                                            Configuración de la Empresa
                                        </h4>
                                        <p className="text-muted text-center mb-4">
                                            Administra la información básica de tu empresa
                                        </p>

                                        {message && (
                                            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} register-alert`}>
                                                {message.text}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="settings-fields">
                                                {/* Información Legal */}
                                                <div className="settings-section mb-4">
                                                    <h6 className="section-title mb-3">📋 Información Legal</h6>
                                                    
                                                    <window.HookFormUtils.InputField
                                                        label="RNC"
                                                        name="frnc"
                                                        type="text"
                                                        register={register}
                                                        errors={errors}
                                                        validation={{
                                                            required: 'El RNC es requerido',
                                                            pattern: {
                                                                value: /^\d{9}$|^\d{11}$/,
                                                                message: 'El RNC debe tener 9 o 11 dígitos'
                                                            }
                                                        }}
                                                        placeholder="00000000000"
                                                    />

                                                    <window.HookFormUtils.InputField
                                                        label="Nombre Comercial"
                                                        name="fnombreComercial"
                                                        type="text"
                                                        register={register}
                                                        errors={errors}
                                                        validation={{
                                                            required: 'El nombre comercial es requerido'
                                                        }}
                                                        placeholder="Nombre comercial de la empresa"
                                                    />

                                                    <window.HookFormUtils.OptionalField
                                                        label="Razón Social"
                                                        name="frazonSocial"
                                                        type="text"
                                                        register={register}
                                                        placeholder="Razón social (opcional)"
                                                    />
                                                </div>

                                                {/* Información de Contacto */}
                                                <div className="settings-section mb-4">
                                                    <h6 className="section-title mb-3">📞 Información de Contacto</h6>
                                                    
                                                    <window.HookFormUtils.InputField
                                                        label="Email"
                                                        name="femail"
                                                        type="email"
                                                        register={register}
                                                        errors={errors}
                                                        validation={{
                                                            required: 'El email es obligatorio',
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: 'Ingrese un email válido'
                                                            }
                                                        }}
                                                        placeholder="empresa@ejemplo.com"
                                                    />

                                                    {/* Campo de teléfono personalizado por el formateo */}
                                                    <div className="mb-3">
                                                        <label className="form-label">Teléfono</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control input-light ${errors.ftelefonos ? 'is-invalid' : ''}`}
                                                            placeholder="(000)-000-0000"
                                                            maxLength={14}
                                                            onInput={handlePhoneInput}
                                                            {...register("ftelefonos", {
                                                                required: 'El teléfono es requerido'
                                                            })}
                                                        />
                                                        {errors.ftelefonos && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-circle-fill text-danger me-2"></i>
                                                                {errors.ftelefonos.message}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <window.HookFormUtils.InputField
                                                        label="Dirección"
                                                        name="fdireccion"
                                                        type="text"
                                                        register={register}
                                                        errors={errors}
                                                        validation={{
                                                            required: 'La dirección es requerida'
                                                        }}
                                                        placeholder="Dirección completa"
                                                    />

                                                    <window.HookFormUtils.OptionalField
                                                        label="Municipio"
                                                        name="fmunicipio"
                                                        type="text"
                                                        register={register}
                                                        placeholder="Municipio"
                                                    />

                                                    <window.HookFormUtils.OptionalField
                                                        label="Provincia"
                                                        name="fprovincia"
                                                        type="text"
                                                        register={register}
                                                        placeholder="Provincia"
                                                    />
                                                </div>

                                                {/* Archivos de la Empresa */}
                                                <div className="settings-section mb-4">
                                                    <h6 className="section-title mb-3">🖼️ Archivos</h6>
                                                    {renderFileUploadField('logo', 'Logo de la Empresa')}
                                                    {renderFileUploadField('fondo', 'Imagen de Fondo')}
                                                    {renderFileUploadField('qrWeb', 'Código QR Web')}
                                                    {renderFileUploadField('qrRedes', 'Código QR Redes')}
                                                </div>
                                            </div>

                                            {/* Botones de acción */}
                                            <div className="settings-actions d-flex gap-2 justify-content-end">
                                                <button
                                                    type="button"
                                                    className="atras-button"
                                                    onClick={() => history.push('/home')}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Guardando...' : 'Guardar Configuración'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Columna Derecha - Configuraciones Adicionales */}
                                <div className="col-md-6">
                                    <div className="form-inner-container w-100 h-100">
                                        <div className="settings-section h-100">
                                            {/* Información Adicional */}
                                            <div className="settings-section mb-4">
                                                <h6 className="section-title mb-3">📝 Información Adicional</h6>
                                                <div className="mb-3">
                                                    <label className="form-label">Slogan</label>
                                                    <textarea
                                                        className="form-control input-light"
                                                        placeholder="Slogan de la empresa"
                                                        rows="2"
                                                        {...register("festlogan")}
                                                    ></textarea>
                                                </div>
                                                <window.HookFormUtils.OptionalField
                                                    label="Código Municipio"
                                                    name="fcodMunicipio"
                                                    type="text"
                                                    register={register}
                                                    placeholder="000000"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Código Provincia"
                                                    name="fcodProvincia"
                                                    type="text"
                                                    register={register}
                                                    placeholder="000000"
                                                />
                                            </div>

                                            {/* Certificados y Seguridad */}
                                            <div className="settings-section mb-4">
                                                <h6 className="section-title mb-3">🔐 Certificados y Seguridad</h6>
                                                <window.HookFormUtils.InputField
                                                    label="Contraseña"
                                                    name="fcontrasena"
                                                    type="password"
                                                    register={register}
                                                    errors={errors}
                                                    validation={{
                                                        required: 'La contraseña es requerida'
                                                    }}
                                                    placeholder="********"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Nombre Certificado"
                                                    name="fnombreCertificado"
                                                    type="text"
                                                    register={register}
                                                    placeholder="Nombre del certificado"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Ruta Certificado"
                                                    name="frutaCertificado"
                                                    type="text"
                                                    register={register}
                                                    placeholder="ruta/del/certificado"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Password Certificado"
                                                    name="fpasswordCertificado"
                                                    type="password"
                                                    register={register}
                                                    placeholder="********"
                                                />
                                            </div>

                                            {/* Configuración de Rutas */}
                                            <div className="settings-section mb-4">
                                                <h6 className="section-title mb-3">📁 Configuración de Rutas</h6>
                                                <window.HookFormUtils.OptionalField
                                                    label="Ruta XML"
                                                    name="frutaXml"
                                                    type="text"
                                                    register={register}
                                                    placeholder="ruta/xml"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Ruta XML Firmado"
                                                    name="frutaXmlFirmado"
                                                    type="text"
                                                    register={register}
                                                    placeholder="ruta/xml/firmado"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Ruta Semilla"
                                                    name="frutaSemilla"
                                                    type="text"
                                                    register={register}
                                                    placeholder="ruta/semilla"
                                                />
                                                <window.HookFormUtils.OptionalField
                                                    label="Ruta Semilla Firmado"
                                                    name="frutaSemillaFirmado"
                                                    type="text"
                                                    register={register}
                                                    placeholder="ruta/semilla/firmado"
                                                />
                                            </div>

                                            {/* Vista Previa */}
                                            <div className="preview-section mt-4 p-3 rounded">
                                                <h6 className="section-title mb-3">👁️ Vista Previa</h6>
                                                <div className="preview-content text-center">
                                                    {logoFile ? (
                                                        <div className="preview-image-container mb-3">
                                                            <img 
                                                                src={URL.createObjectURL(logoFile)} 
                                                                alt="Vista previa logo" 
                                                                className="preview-image rounded"
                                                                style={{maxWidth: '120px', maxHeight: '120px'}}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="preview-placeholder mb-3">
                                                            <span className="text-muted">Logo aparecerá aquí</span>
                                                        </div>
                                                    )}
                                                    
                                                    {watchNombreComercial && (
                                                        <h5 className="preview-site-name">{watchNombreComercial}</h5>
                                                    )}
                                                    
                                                    {watchSlogan && (
                                                        <p className="preview-description text-muted">
                                                            {watchSlogan}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.Settings = Settings;

/* jshint ignore:end */