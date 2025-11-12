function CreateClienteModal({show, onClose, onSave, cliente}) {
    const isEdit = !!cliente;

    const [form, setForm] = React.useState({
        nombre: cliente?.fnombre || '',
        cedulaRnc: cliente?.fcedulaRnc || '',
        telefono: cliente?.ftelefono || '',
        celular: cliente?.fcelular || '',
        direccion: cliente?.fdireccion || '',
        fechaNacimiento: cliente?.ffechaNacimiento || '',
        tipoEntidad: cliente?.ftipoEntidad || 'F', // F = Física, J = Jurídica
        calle: cliente?.fcalle || '',
        limiteCredito: cliente?.flimiteCredito || 0,
        ubicacionGps: cliente?.fubicaciongps || '',
        idRuta: cliente?.fkidRuta || null,
        idEstadoCivil: cliente?.fkidEstadoCivil || null,
        idSector: cliente?.fkidSector || null,
        idMunicipio: cliente?.fkidMunicipio || null,
        idCiudad: cliente?.fkidCiudad || null,
        idProvincia: cliente?.fkidProvincia || null,
        idPais: cliente?.fkidPais || 1,
        idNacionalidad: cliente?.fkidNacionalidad || 1,
        idTipoCliente: cliente?.fkidTipoCliente || null,
        idActividadComercial: cliente?.fkidActividadComercial || null,
        idMoneda: cliente?.fkidMoneda || null
        // Nota: El campo 'imagen' se maneja por separado en 'imagePreview' y 'handleImageChange'
    });

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [imagePreview, setImagePreview] = React.useState(cliente?.imagen || null);
    const fileInputRef = React.useRef(null);
    
    // === NUEVO ESTADO PARA LOS PASOS ===
    const [step, setStep] = React.useState(1);

    // Redux hooks para tema
    const {tema} = window.ReduxProvider.useApp();

    // Estados para selects dependientes
    const [provinciasFiltradas, setProvinciasFiltradas] = React.useState([]);
    const [municipiosFiltrados, setMunicipiosFiltrados] = React.useState([]);
    const [ciudadesFiltradas, setCiudadesFiltradas] = React.useState([]);

    React.useEffect(() => {
        if (form.idPais) {
            setProvinciasFiltradas(window.PROVINCIAS?.filter(p => p.paisId === parseInt(form.idPais)) || []);
        } else {
            setProvinciasFiltradas([]);
        }
    }, [form.idPais]);

    React.useEffect(() => {
        if (form.idProvincia) {
            setMunicipiosFiltrados(window.MUNICIPIOS?.filter(m => m.provinciaId === parseInt(form.idProvincia)) || []);
        } else {
            setMunicipiosFiltrados([]);
        }
    }, [form.idProvincia]);

    React.useEffect(() => {
        if (form.idMunicipio) {
            setCiudadesFiltradas(window.CIUDADES?.filter(c => c.municipioId === parseInt(form.idMunicipio)) || []);
        } else {
            setCiudadesFiltradas([]);
        }
    }, [form.idMunicipio]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                window.ToastUtils?.error('Por favor seleccione un archivo de imagen válido');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB Límite
                window.ToastUtils?.error('La imagen no puede superar los 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setForm(prev => ({...prev, imagen: file})); // Guardar el archivo para el submit
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); 

        // Validaciones (Tu lógica de validación existente)
        const newErrors = {};
        if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (form.nombre.length > 50) newErrors.nombre = 'El nombre no puede exceder 50 caracteres';
        if (form.cedulaRnc && form.cedulaRnc.length > 20) newErrors.cedulaRnc = 'La cédula/RNC no puede exceder 20 caracteres';
        if (form.telefono && form.telefono.length > 14) newErrors.telefono = 'El teléfono no puede exceder 14 caracteres';
        if (form.celular && form.celular.length > 14) newErrors.celular = 'El celular no puede exceder 14 caracteres';
        if (form.direccion && form.direccion.length > 400) newErrors.direccion = 'La dirección no puede exceder 400 caracteres';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Si hay errores en campos de otros pasos, llevar al usuario a ese paso
            if (newErrors.nombre || newErrors.cedulaRnc || newErrors.telefono || newErrors.celular) {
                setStep(1);
            } else if (newErrors.direccion) {
                setStep(2);
            }
            window.ToastUtils?.warning('Por favor, corrija los errores en el formulario');
            setLoading(false);
            return;
        }

        // Preparar datos para enviar (Tu lógica existente)
        const clienteData = {
            nombre: form.nombre,
            cedulaRnc: form.cedulaRnc || null,
            telefono: form.telefono || null,
            celular: form.celular || null,
            direccion: form.direccion || null,
            fechaNacimiento: form.fechaNacimiento || null,
            tipoEntidad: form.tipoEntidad,
            calle: form.calle || null,
            limiteCredito: parseFloat(form.limiteCredito) || 0,
            ubicacionGps: form.ubicacionGps || null,
            idRuta: form.idRuta ? parseInt(form.idRuta) : null,
            idEstadoCivil: form.idEstadoCivil ? parseInt(form.idEstadoCivil) : null,
            idSector: form.idSector ? parseInt(form.idSector) : null,
            idMunicipio: form.idMunicipio ? parseInt(form.idMunicipio) : null,
            idCiudad: form.idCiudad ? parseInt(form.idCiudad) : null,
            idProvincia: form.idProvincia ? parseInt(form.idProvincia) : null,
            idPais: form.idPais ? parseInt(form.idPais) : null,
            idNacionalidad: form.idNacionalidad ? parseInt(form.idNacionalidad) : null,
            idTipoCliente: form.idTipoCliente ? parseInt(form.idTipoCliente) : null,
            idActividadComercial: form.idActividadComercial ? parseInt(form.idActividadComercial) : null,
            idMoneda: form.idMoneda ? parseInt(form.idMoneda) : null
        };
        
        // Aquí también deberías manejar el 'form.imagen' si se subió una nueva
        // y enviarla como FormData o como base64, según espere tu backend.
        // Este ejemplo se enfoca en la lógica de 'onSave' que ya tenías.

        console.log('Datos enviados al backend:', clienteData);

        if (onSave) {
            const result = await onSave(clienteData, form.imagen); // Pasamos la imagen si existe
            
            if (result && !result.success && result.fieldErrors) {
                setErrors(result.fieldErrors);
                // Detectar en qué paso está el error del servidor
                const fieldErrorKeys = Object.keys(result.fieldErrors);
                if (fieldErrorKeys.some(key => ['nombre', 'cedulaRnc', 'telefono', 'celular'].includes(key))) {
                    setStep(1);
                } else if (fieldErrorKeys.some(key => ['direccion', 'calle', 'idPais', 'idProvincia'].includes(key))) {
                    setStep(2);
                } else {
                    setStep(3);
                }
                setLoading(false);
                return;
            }
        }
        setLoading(false);
        // Si todo salió bien, cerramos el modal (onClose ya lo hace el 'onSave' wrapper)
    };
    
    // === FUNCIONES DE NAVEGACIÓN ===
    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const goToStep = (stepNum) => setStep(stepNum);

    // =================================================================
    // === RENDERIZADO DEL COMPONENTE (MODIFICADO) =====================
    // =================================================================
    if (!show) return null;

    return (
        <div className={`modal-backdrop-custom ${tema === 'dark' ? 'modal-backdrop-dark' : ''}`}>
            <div className={`modal-ventana modal-ventana-cliente ${tema === 'dark' ? 'modal-ventana-dark' : ''}`}>
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
                        {isEdit ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
                    </h4>

                    {/* === BARRA DE PROGRESO DE PASOS === */}
                    <div className="step-progress-bar mb-4">
                        <div className={`step ${step >= 1 ? 'active' : ''}`} onClick={() => goToStep(1)}>
                            <span className="step-number">1</span>
                            Datos Personales
                        </div>
                        <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`} onClick={() => goToStep(2)}>
                            <span className="step-number">2</span>
                            Ubicación
                        </div>
                        <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`} onClick={() => goToStep(3)}>
                            <span className="step-number">3</span>
                            Info Adicional
                        </div>
                    </div>

                    <div className="row">
                        {/* === COLUMNA IZQUIERDA: FORMULARIO (PASOS) === */}
                        <div className="col-md-8">
                            
                            {/* === PASO 1: DATOS PERSONALES Y DE CONTACTO === */}
                            {step === 1 && (
                                <div className="form-step-content">
                                    <h5>
                                        <i className="bi bi-person-vcard me-2"></i>
                                        Información Básica
                                    </h5>
                                    
                                    {/* Nombre Completo */}
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
                                            maxLength={50}
                                        />
                                        {errors.nombre && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.nombre}
                                            </div>
                                        )}
                                    </div>

                                    {/* Cédula/RNC */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-card-text me-1"></i>
                                            Cédula/RNC
                                        </label>
                                        <input
                                            type="text"
                                            name="cedulaRnc"
                                            className={`form-control ${errors.cedulaRnc ? 'is-invalid' : ''}`}
                                            value={form.cedulaRnc}
                                            onChange={handleChange}
                                            placeholder="001-1234567-8"
                                            disabled={loading}
                                            maxLength={20}
                                        />
                                        {errors.cedulaRnc && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.cedulaRnc}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Tipo Entidad y Fecha Nacimiento */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-people me-1"></i>
                                                Tipo de Entidad *
                                            </label>
                                            <select
                                                name="tipoEntidad"
                                                className="form-control"
                                                value={form.tipoEntidad}
                                                onChange={handleChange}
                                                disabled={loading}
                                                required
                                            >
                                                <option value="F">Física</option>
                                                <option value="J">Jurídica</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-calendar me-1"></i>
                                                Fecha Nacimiento
                                            </label>
                                            <input
                                                type="date"
                                                name="fechaNacimiento"
                                                className="form-control"
                                                value={form.fechaNacimiento}
                                                onChange={handleChange}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Teléfono y Celular */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-telephone me-1"></i>
                                                Teléfono
                                            </label>
                                            <input
                                                type="text"
                                                name="telefono"
                                                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                                value={form.telefono}
                                                onChange={handleChange}
                                                placeholder="809-555-1234"
                                                disabled={loading}
                                                maxLength={14}
                                            />
                                            {errors.telefono && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {errors.telefono}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-phone me-1"></i>
                                                Celular
                                            </label>
                                            <input
                                                type="text"
                                                name="celular"
                                                className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                                                value={form.celular}
                                                onChange={handleChange}
                                                placeholder="829-555-5678"
                                                disabled={loading}
                                                maxLength={14}
                                            />
                                            {errors.celular && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {errors.celular}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Estado Civil y Nacionalidad (Movidos al Paso 1) */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-heart me-1"></i>
                                                Estado Civil
                                            </label>
                                            <select
                                                name="idEstadoCivil"
                                                className="form-control"
                                                value={form.idEstadoCivil || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.ESTADOS_CIVILES && window.ESTADOS_CIVILES.map(estado => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-passport me-1"></i>
                                                Nacionalidad
                                            </label>
                                            <select
                                                name="idNacionalidad"
                                                className="form-control"
                                                value={form.idNacionalidad || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.NACIONALIDADES && window.NACIONALIDADES.map(nacionalidad => (
                                                    <option key={nacionalidad.id} value={nacionalidad.id}>
                                                        {nacionalidad.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* === PASO 2: DIRECCIÓN Y UBICACIÓN GEOGRÁFICA === */}
                            {step === 2 && (
                                <div className="form-step-content">
                                    <h5>
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Dirección y Ubicación
                                    </h5>

                                    {/* Dirección Completa */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-house me-1"></i>
                                            Dirección Completa
                                        </label>
                                        <textarea
                                            name="direccion"
                                            className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                            value={form.direccion}
                                            onChange={handleChange}
                                            placeholder="Ej: Calle Principal #123"
                                            disabled={loading}
                                            rows={2}
                                            maxLength={400}
                                        />
                                        {errors.direccion && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.direccion}
                                            </div>
                                        )}
                                    </div>

                                    {/* Calle y Sector */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-signpost me-1"></i>
                                                Calle
                                            </label>
                                            <input
                                                type="text"
                                                name="calle"
                                                className="form-control"
                                                value={form.calle}
                                                onChange={handleChange}
                                                placeholder="Ej: Calle 5"
                                                disabled={loading}
                                                maxLength={50}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-houses me-1"></i>
                                                Sector
                                            </label>
                                            <select
                                                name="idSector"
                                                className="form-control"
                                                value={form.idSector || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.SECTORES && window.SECTORES.map(sector => (
                                                    <option key={sector.id} value={sector.id}>
                                                        {sector.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Ubicación GPS */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-pin-map me-1"></i>
                                            Ubicación GPS
                                        </label>
                                        <input
                                            type="text"
                                            name="ubicacionGps"
                                            className="form-control"
                                            value={form.ubicacionGps}
                                            onChange={handleChange}
                                            placeholder="Ej: 18.4861,-69.9312"
                                            disabled={loading}
                                            maxLength={60}
                                        />
                                    </div>

                                    <h5 className="mt-4">
                                        <i className="bi bi-geo me-2"></i>
                                        Ubicación Geográfica
                                    </h5>
                                    
                                    {/* País y Provincia */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-globe me-1"></i>
                                                País
                                            </label>
                                            <select
                                                name="idPais"
                                                className="form-control"
                                                value={form.idPais || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.PAISES && window.PAISES.map(pais => (
                                                    <option key={pais.id} value={pais.id}>
                                                        {pais.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-flag me-1"></i>
                                                Provincia
                                            </label>
                                            <select
                                                name="idProvincia"
                                                className="form-control"
                                                value={form.idProvincia || ''}
                                                onChange={handleChange}
                                                disabled={loading || provinciasFiltradas.length === 0}
                                            >
                                                <option value="">Seleccione</option>
                                                {provinciasFiltradas.map(provincia => (
                                                    <option key={provincia.id} value={provincia.id}>
                                                        {provincia.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Municipio y Ciudad */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-map me-1"></i>
                                                Municipio
                                            </label>
                                            <select
                                                name="idMunicipio"
                                                className="form-control"
                                                value={form.idMunicipio || ''}
                                                onChange={handleChange}
                                                disabled={loading || municipiosFiltrados.length === 0}
                                            >
                                                <option value="">Seleccione</option>
                                                {municipiosFiltrados.map(municipio => (
                                                    <option key={municipio.id} value={municipio.id}>
                                                        {municipio.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-building me-1"></i>
                                                Ciudad
                                            </label>
                                            <select
                                                name="idCiudad"
                                                className="form-control"
                                                value={form.idCiudad || ''}
                                                onChange={handleChange}
                                                disabled={loading || ciudadesFiltradas.length === 0}
                                            >
                                                <option value="">Seleccione</option>
                                                {ciudadesFiltradas.map(ciudad => (
                                                    <option key={ciudad.id} value={ciudad.id}>
                                                        {ciudad.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* === PASO 3: INFORMACIÓN ADICIONAL === */}
                            {step === 3 && (
                                <div className="form-step-content">
                                    <h5>
                                        <i className="bi bi-info-circle me-2"></i>
                                        Información Adicional
                                    </h5>
                                    
                                    {/* Límite de Crédito */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-cash-coin me-1"></i>
                                            Límite de Crédito
                                        </label>
                                        <input
                                            type="number"
                                            name="limiteCredito"
                                            className="form-control"
                                            value={form.limiteCredito}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            disabled={loading}
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>
                                    
                                    {/* Tipo de Cliente y Moneda */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-person-badge me-1"></i>
                                                Tipo de Cliente
                                            </label>
                                            <select
                                                name="idTipoCliente"
                                                className="form-control"
                                                value={form.idTipoCliente || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.TIPOS_CLIENTE && window.TIPOS_CLIENTE.map(tipo => (
                                                    <option key={tipo.id} value={tipo.id}>
                                                        {tipo.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-currency-exchange me-1"></i>
                                                Moneda
                                            </label>
                                            <select
                                                name="idMoneda"
                                                className="form-control"
                                                value={form.idMoneda || ''}
                                                onChange={handleChange}
                                                disabled={loading}
                                            >
                                                <option value="">Seleccione</option>
                                                {window.MONEDAS && window.MONEDAS.map(moneda => (
                                                    <option key={moneda.id} value={moneda.id}>
                                                        {moneda.nombre} ({moneda.simbolo})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {/* Actividad Comercial */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-briefcase me-1"></i>
                                            Actividad Comercial
                                        </label>
                                        <select
                                            name="idActividadComercial"
                                            className="form-control"
                                            value={form.idActividadComercial || ''}
                                            onChange={handleChange}
                                            disabled={loading}
                                        >
                                            <option value="">Seleccione</option>
                                            {window.ACTIVIDADES_COMERCIALES && window.ACTIVIDADES_COMERCIALES.map(actividad => (
                                                <option key={actividad.id} value={actividad.id}>
                                                    {actividad.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Ruta (Campo que estaba en el form pero no en el sketch) */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-truck me-1"></i>
                                            Ruta
                                        </label>
                                        <select
                                            name="idRuta"
                                            className="form-control"
                                            value={form.idRuta || ''}
                                            onChange={handleChange}
                                            disabled={loading}
                                        >
                                            <option value="">Seleccione una ruta</option>
                                            {/* Asumiendo que tienes 'window.RUTAS' */}
                                            {window.RUTAS && window.RUTAS.map(ruta => (
                                                <option key={ruta.id} value={ruta.id}>
                                                    {ruta.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* === COLUMNA DERECHA: IMAGEN Y RESUMEN === */}
                        <div className="col-md-4">
                            
                            {/* Cargador de Imagen (Movido aquí) */}
                            <label className="form-label d-block text-center mb-2">Foto del Cliente</label>
                            <div 
                                className={`image-upload-container ${tema === 'dark' ? 'image-upload-dark' : ''}`}
                                onClick={handleImageClick}
                                style={{cursor: 'pointer', height: '180px', width: '180px', margin: '0 auto 1.5rem auto'}}
                            >
                                {imagePreview ? (
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="image-preview"
                                    />
                                ) : (
                                    <div className="image-placeholder">
                                        <i className="bi bi-camera-fill"></i>
                                        <p>Subir Foto</p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{display: 'none'}}
                                disabled={loading}
                            />
                            
                            {/* Resumen en Vivo */}
                            <div className={`form-summary-sidebar ${tema === 'dark' ? 'form-summary-sidebar-dark' : ''}`}>
                                <h6 className="text-center">Resumen del Cliente</h6>
                                <div className="summary-item">
                                    <i className="bi bi-person"></i>
                                    <span>{form.nombre || 'Nombre no ingresado'}</span>
                                </div>
                                <div className="summary-item">
                                    <i className="bi bi-card-text"></i>
                                    <span>{form.cedulaRnc || 'Cédula/RNC no ingresada'}</span>
                                </div>
                                <div className="summary-item">
                                    <i className="bi bi-phone"></i>
                                    <span>{form.celular || 'Celular no ingresado'}</span>
                                </div>
                                <div className="summary-item">
                                    <i className="bi bi-house"></i>
                                    <span>{form.direccion || 'Dirección no ingresada'}</span>
                                </div>
                                <div className="summary-item">
                                    <i className="bi bi-cash-coin"></i>
                                    <span>Límite Crédito: {form.limiteCredito || '0.00'}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* === BOTONES DE NAVEGACIÓN Y ACCIÓN === */}
                    <div className="d-flex justify-content-between align-items-center gap-2 mt-4">
                        {/* Botón de Cancelar (siempre a la izquierda) */}
                        <button
                            type="button"
                            className="btn atras-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancelar
                        </button>
                        
                        {/* Botones de Navegación (a la derecha) */}
                        <div className="d-flex justify-content-end gap-2">
                            {/* Botón "Atrás" (no se muestra en el paso 1) */}
                            {step > 1 && (
                                <button
                                    type="button"
                                    className="btn atras-button"
                                    onClick={prevStep}
                                    disabled={loading}
                                >
                                    <i className="bi bi-arrow-left-circle me-1"></i>
                                    Atrás
                                </button>
                            )}

                            {/* Botón "Siguiente" (no se muestra en el paso 3) */}
                            {step < 3 && (
                                <button
                                    type="button"
                                    className="btn register-button"
                                    onClick={nextStep}
                                    disabled={loading}
                                >
                                    Siguiente
                                    <i className="bi bi-arrow-right-circle ms-1"></i>
                                </button>
                            )}
                            
                            {/* Botón "Guardar" (solo se muestra en el paso 3) */}
                            {step === 3 && (
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
                                            {isEdit ? 'Guardar Cambios' : 'Crear Cliente'}
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

window.CreateClienteModal = CreateClienteModal;
console.log('✅ CreateClienteModal component (Multi-Step) loaded');