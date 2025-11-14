function CreateClienteModal({show, onClose, onSave, cliente}) {
    const isEdit = !!cliente;

    // React Hook Form configurado con util global
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
        setValue
    } = window.HookFormUtils.useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            nombre: cliente?.fnombre || '',
            cedulaRnc: cliente?.fcedulaRnc || '',
            telefono: cliente?.ftelefono || '',
            celular: cliente?.fcelular || '',
            direccion: cliente?.fdireccion || '',
            fechaNacimiento: cliente?.ffechaNacimiento || '',
            tipoEntidad: cliente?.ftipoEntidad || 'F',
            calle: cliente?.fcalle || '',
            limiteCredito: cliente?.flimiteCredito || 0,
            ubicacionGps: cliente?.fubicaciongps || '',
            idRuta: cliente?.fkidRuta || '',
            idEstadoCivil: cliente?.fkidEstadoCivil || '',
            idSector: cliente?.fkidSector || '',
            idMunicipio: cliente?.fkidMunicipio || '',
            idCiudad: cliente?.fkidCiudad || '',
            idProvincia: cliente?.fkidProvincia || '',
            idPais: cliente?.fkidPais || 1,
            idNacionalidad: cliente?.fkidNacionalidad || 1,
            idTipoCliente: cliente?.fkidTipoCliente || '',
            idActividadComercial: cliente?.fkidActividadComercial || '',
            idMoneda: cliente?.fkidMoneda || '',
            imagen: null
        }
    });

    const form = watch();
    const [loading, setLoading] = React.useState(false);
    const [serverErrors, setServerErrors] = React.useState({});
    const [imagePreview, setImagePreview] = React.useState(cliente?.imagen || null);
    const fileInputRef = React.useRef(null);

    const [step, setStep] = React.useState(1);

    const {tema} = window.ReduxProvider.useApp();

    const [provinciasFiltradas, setProvinciasFiltradas] = React.useState([]);
    const [municipiosFiltrados, setMunicipiosFiltrados] = React.useState([]);
    const [ciudadesFiltradas, setCiudadesFiltradas] = React.useState([]);

    // Helper para obtener error combinando RHF + servidor
    const getError = (field) => {
        if (errors[field]?.message) return errors[field].message;
        if (serverErrors[field]) return serverErrors[field];
        return null;
    };

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
                setValue('imagen', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // Campos por paso para validación al avanzar
    const stepFieldGroups = {
        1: ['nombre', 'cedulaRnc', 'telefono', 'celular', 'tipoEntidad', 'fechaNacimiento'],
        2: ['direccion', 'calle', 'idSector', 'idPais', 'idProvincia', 'idMunicipio', 'idCiudad', 'ubicacionGps'],
        3: ['limiteCredito', 'idTipoCliente', 'idMoneda', 'idActividadComercial', 'idRuta']
    };

    const validateCurrentStep = async () => {
        const fields = stepFieldGroups[step] || [];
        if (fields.length === 0) return true;
        const isValid = await trigger(fields);
        if (!isValid) {
            window.ToastUtils?.warning('Por favor, corrija los errores antes de continuar');
        }
        return isValid;
    };

    const handleNextStep = async () => {
        const ok = await validateCurrentStep();
        if (ok) {
            setStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleGoToStep = async (targetStep) => {
        if (targetStep === step) return;

        // Siempre permitir ir hacia atrás
        if (targetStep < step) {
            setStep(targetStep);
            return;
        }

        // Ir hacia adelante: validar pasos intermedios
        let tmpStep = step;
        while (tmpStep < targetStep) {
            const fields = stepFieldGroups[tmpStep] || [];
            if (fields.length > 0) {
                const ok = await trigger(fields);
                if (!ok) {
                    setStep(tmpStep);
                    window.ToastUtils?.warning('Por favor, corrija los errores antes de continuar');
                    return;
                }
            }
            tmpStep++;
        }
        setStep(targetStep);
    };

    // Envío del formulario (solo se dispara si TODO es válido según RHF)
    const onSubmitForm = async (data) => {
        try {
            setLoading(true);
            setServerErrors({});

            const formData = new FormData();
            // Campos simples
            formData.append('Nombre', data.nombre);
            formData.append('CedulaRnc', data.cedulaRnc || '');
            formData.append('Telefono', data.telefono || '');
            formData.append('Celular', data.celular || '');
            formData.append('Direccion', data.direccion || '');
            formData.append('FechaNacimiento', data.fechaNacimiento || '');
            formData.append('TipoEntidad', data.tipoEntidad);
            formData.append('Calle', data.calle || '');
            formData.append('LimiteCredito', parseFloat(data.limiteCredito || 0) || 0);
            formData.append('UbicacionGps', data.ubicacionGps || '');

            // Nombres relacionados (para crear si no existe)
            const rutaSeleccionada = window.RUTAS?.find(r => r.id == data.idRuta);
            formData.append('Ruta', rutaSeleccionada?.nombre || '');

            const estadoCivilSel = window.ESTADOS_CIVILES?.find(e => e.id == data.idEstadoCivil);
            formData.append('EstadoCivil', estadoCivilSel?.nombre || '');

            const sectorSel = window.SECTORES?.find(s => s.id == data.idSector);
            formData.append('Sector', sectorSel?.nombre || '');

            const municipioSel = window.MUNICIPIOS?.find(m => m.id == data.idMunicipio);
            formData.append('Municipio', municipioSel?.nombre || '');

            const ciudadSel = window.CIUDADES?.find(c => c.id == data.idCiudad);
            formData.append('Ciudad', ciudadSel?.nombre || '');

            const provinciaSel = window.PROVINCIAS?.find(p => p.id == data.idProvincia);
            formData.append('Provincia', provinciaSel?.nombre || '');

            const paisSel = window.PAISES?.find(p => p.id == data.idPais);
            formData.append('Pais', paisSel?.nombre || '');

            const nacionalidadSel = window.NACIONALIDADES?.find(n => n.id == data.idNacionalidad);
            formData.append('Nacionalidad', nacionalidadSel?.nombre || '');

            const tipoClienteSel = window.TIPOS_CLIENTE?.find(t => t.id == data.idTipoCliente);
            formData.append('TipoCliente', tipoClienteSel?.nombre || '');

            const actividadSel = window.ACTIVIDADES_COMERCIALES?.find(a => a.id == data.idActividadComercial);
            formData.append('ActividadComercial', actividadSel?.nombre || '');

            const monedaSel = window.MONEDAS?.find(m => m.id == data.idMoneda);
            formData.append('Moneda', monedaSel?.nombre || '');

            // IDs relacionados (el backend los acepta y prioriza)
            formData.append('IdRuta', data.idRuta ? parseInt(data.idRuta) : 0);
            formData.append('IdEstadoCivil', data.idEstadoCivil ? parseInt(data.idEstadoCivil) : 0);
            formData.append('IdSector', data.idSector ? parseInt(data.idSector) : 0);
            formData.append('IdMunicipio', data.idMunicipio ? parseInt(data.idMunicipio) : 0);
            formData.append('IdCiudad', data.idCiudad ? parseInt(data.idCiudad) : 0);
            formData.append('IdProvincia', data.idProvincia ? parseInt(data.idProvincia) : 0);
            formData.append('IdPais', data.idPais ? parseInt(data.idPais) : 0);
            formData.append('IdNacionalidad', data.idNacionalidad ? parseInt(data.idNacionalidad) : 0);
            formData.append('IdTipoCliente', data.idTipoCliente ? parseInt(data.idTipoCliente) : 0);
            formData.append('IdActividadComercial', data.idActividadComercial ? parseInt(data.idActividadComercial) : 0);
            formData.append('IdMoneda', data.idMoneda ? parseInt(data.idMoneda) : 0);

            // Imagen
            if (data.imagen) {
                formData.append('Imagen', data.imagen);
            }

            console.log('Datos enviados al backend (FormData):', formData);

            if (onSave) {
                const result = await onSave(formData);
                if (result && !result.success && result.fieldErrors) {
                    setServerErrors(result.fieldErrors);

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
            // El cierre del modal lo maneja quien llama (onSave wrapper)
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    // Manejo cuando hay errores de validación de RHF al enviar
    const onInvalid = (formErrors) => {
        const fieldErrorKeys = Object.keys(formErrors);
        if (fieldErrorKeys.length === 0) return;

        if (fieldErrorKeys.some(key =>
            ['nombre', 'cedulaRnc', 'telefono', 'celular', 'tipoEntidad', 'fechaNacimiento', 'idEstadoCivil', 'idNacionalidad'].includes(key)
        )) {
            setStep(1);
        } else if (fieldErrorKeys.some(key =>
            ['direccion', 'calle', 'idSector', 'idPais', 'idProvincia', 'idMunicipio', 'idCiudad', 'ubicacionGps'].includes(key)
        )) {
            setStep(2);
        } else {
            setStep(3);
        }

        window.ToastUtils?.warning('Por favor, corrija los errores en el formulario');
    };

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
                <form
                    onSubmit={handleSubmit(onSubmitForm, onInvalid)}
                    className={`create-user-form ${tema === 'dark' ? 'create-user-form-dark' : ''}`}
                >
                    <h4>
                        <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-person-plus'} me-2`}></i>
                        {isEdit ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
                    </h4>

                    {/* === BARRA DE PROGRESO DE PASOS === */}
                    <div className="step-progress-bar mb-4">
                        <div
                            className={`step ${step >= 1 ? 'active' : ''}`}
                            onClick={() => handleGoToStep(1)}
                        >
                            <span className="step-number">1</span>
                            Datos Personales
                        </div>
                        <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
                        <div
                            className={`step ${step >= 2 ? 'active' : ''}`}
                            onClick={() => handleGoToStep(2)}
                        >
                            <span className="step-number">2</span>
                            Ubicación
                        </div>
                        <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
                        <div
                            className={`step ${step >= 3 ? 'active' : ''}`}
                            onClick={() => handleGoToStep(3)}
                        >
                            <span className="step-number">3</span>
                            Info Adicional
                        </div>
                    </div>

                    <div className="row">
                        {/* === COLUMNA IZQUIERDA: FORMULARIO (PASOS) === */}
                        <div className="col-md-8">
                            {/* === PASO 1 === */}
                            {step === 1 && (
                                <div className="form-step-content">
                                    <h5>
                                        <i className="bi bi-person-vcard me-2"></i>
                                        Información Básica
                                    </h5>

                                    {/* Nombre */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-person me-1"></i>
                                            Nombre Completo *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${getError('nombre') ? 'is-invalid' : ''}`}
                                            placeholder="Ej: Juan Pérez"
                                            disabled={loading}
                                            maxLength={50}
                                            {...register('nombre', {
                                                required: 'El nombre es requerido',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'El nombre no puede exceder 50 caracteres'
                                                }
                                            })}
                                        />
                                        {getError('nombre') && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {getError('nombre')}
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
                                            className={`form-control ${getError('cedulaRnc') ? 'is-invalid' : ''}`}
                                            placeholder="001-1234567-8"
                                            disabled={loading}
                                            maxLength={20}
                                            {...register('cedulaRnc', {
                                                maxLength: {
                                                    value: 20,
                                                    message: 'La cédula/RNC no puede exceder 20 caracteres'
                                                }
                                            })}
                                        />
                                        {getError('cedulaRnc') && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {getError('cedulaRnc')}
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
                                                className="form-control"
                                                disabled={loading}
                                                {...register('tipoEntidad', {
                                                    required: 'El tipo de entidad es requerido'
                                                })}
                                            >
                                                <option value="F">Física</option>
                                                <option value="J">Jurídica</option>
                                            </select>
                                            {getError('tipoEntidad') && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {getError('tipoEntidad')}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-calendar me-1"></i>
                                                Fecha Nacimiento
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                disabled={loading}
                                                {...register('fechaNacimiento')}
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
                                                className={`form-control ${getError('telefono') ? 'is-invalid' : ''}`}
                                                placeholder="809-555-1234"
                                                disabled={loading}
                                                maxLength={14}
                                                {...register('telefono', {
                                                    maxLength: {
                                                        value: 14,
                                                        message: 'El teléfono no puede exceder 14 caracteres'
                                                    }
                                                })}
                                            />
                                            {getError('telefono') && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {getError('telefono')}
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
                                                className={`form-control ${getError('celular') ? 'is-invalid' : ''}`}
                                                placeholder="829-555-5678"
                                                disabled={loading}
                                                maxLength={14}
                                                {...register('celular', {
                                                    maxLength: {
                                                        value: 14,
                                                        message: 'El celular no puede exceder 14 caracteres'
                                                    }
                                                })}
                                            />
                                            {getError('celular') && (
                                                <div className="invalid-feedback d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    {getError('celular')}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Estado Civil y Nacionalidad */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-heart me-1"></i>
                                                Estado Civil
                                            </label>
                                            <select
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idEstadoCivil')}
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
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idNacionalidad')}
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

                            {/* === PASO 2 === */}
                            {step === 2 && (
                                <div className="form-step-content">
                                    <h5>
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Dirección y Ubicación
                                    </h5>

                                    {/* Dirección */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-house me-1"></i>
                                            Dirección Completa
                                        </label>
                                        <textarea
                                            className={`form-control ${getError('direccion') ? 'is-invalid' : ''}`}
                                            placeholder="Ej: Calle Principal #123"
                                            disabled={loading}
                                            rows={2}
                                            maxLength={400}
                                            {...register('direccion', {
                                                maxLength: {
                                                    value: 400,
                                                    message: 'La dirección no puede exceder 400 caracteres'
                                                }
                                            })}
                                        />
                                        {getError('direccion') && (
                                            <div className="invalid-feedback d-block">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {getError('direccion')}
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
                                                className="form-control"
                                                placeholder="Ej: Calle 5"
                                                disabled={loading}
                                                maxLength={50}
                                                {...register('calle')}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-houses me-1"></i>
                                                Sector
                                            </label>
                                            <select
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idSector')}
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
                                            className="form-control"
                                            placeholder="Ej: 18.4861,-69.9312"
                                            disabled={loading}
                                            maxLength={60}
                                            {...register('ubicacionGps')}
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
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idPais')}
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
                                                className="form-control"
                                                disabled={loading || provinciasFiltradas.length === 0}
                                                {...register('idProvincia')}
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
                                                className="form-control"
                                                disabled={loading || municipiosFiltrados.length === 0}
                                                {...register('idMunicipio')}
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
                                                className="form-control"
                                                disabled={loading || ciudadesFiltradas.length === 0}
                                                {...register('idCiudad')}
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

                            {/* === PASO 3 === */}
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
                                            className="form-control"
                                            placeholder="0.00"
                                            disabled={loading}
                                            step="0.01"
                                            min="0"
                                            {...register('limiteCredito')}
                                        />
                                    </div>

                                    {/* Tipo Cliente y Moneda */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="bi bi-person-badge me-1"></i>
                                                Tipo de Cliente
                                            </label>
                                            <select
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idTipoCliente')}
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
                                                className="form-control"
                                                disabled={loading}
                                                {...register('idMoneda')}
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
                                            className="form-control"
                                            disabled={loading}
                                            {...register('idActividadComercial')}
                                        >
                                            <option value="">Seleccione</option>
                                            {window.ACTIVIDADES_COMERCIALES && window.ACTIVIDADES_COMERCIALES.map(actividad => (
                                                <option key={actividad.id} value={actividad.id}>
                                                    {actividad.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Ruta */}
                                    <div className="mb-3">
                                        <label className="form-label">
                                            <i className="bi bi-truck me-1"></i>
                                            Ruta
                                        </label>
                                        <select
                                            className="form-control"
                                            disabled={loading}
                                            {...register('idRuta')}
                                        >
                                            <option value="">Seleccione una ruta</option>
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
                            {/* Imagen */}
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

                            {/* Resumen */}
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

                    {/* === BOTONES === */}
                    <div className="d-flex justify-content-between align-items-center gap-2 mt-4">
                        <button
                            type="button"
                            className="btn atras-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Cancelar
                        </button>

                        <div className="d-flex justify-content-end gap-2">
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

                            {step < 3 && (
                                <button
                                    type="button"
                                    className="btn register-button"
                                    onClick={handleNextStep}
                                    disabled={loading}
                                >
                                    Siguiente
                                    <i className="bi bi-arrow-right-circle ms-1"></i>
                                </button>
                            )}

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
