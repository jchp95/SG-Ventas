/**
 * Actions para la gestión de auditorías
 */

// Action Types
const AUDITORIA_ACTIONS = {
    SET_AUDITORIAS: 'auditoria/setAuditorias',
    SET_CARGANDO: 'auditoria/setCargando',
    SET_ERROR: 'auditoria/setError',
    CLEAR_ERROR: 'auditoria/clearError',
    SET_FILTROS: 'auditoria/setFiltros',
    SET_PAGINACION: 'auditoria/setPaginacion',
    LIMPIAR_FILTROS: 'auditoria/limpiarFiltros',
    // Action types para auditoría de usuarios
    SET_AUDITORIAS_USUARIOS: 'auditoria/setAuditoriasUsuarios',
    SET_CARGANDO_USUARIOS: 'auditoria/setCargandoUsuarios',
    SET_ERROR_USUARIOS: 'auditoria/setErrorUsuarios'
};

// Action Creators
const auditoriaActions = {
    // Acciones síncronas
    setAuditorias: (auditorias) => ({
        type: AUDITORIA_ACTIONS.SET_AUDITORIAS,
        payload: auditorias
    }),

    setCargando: (cargando) => ({
        type: AUDITORIA_ACTIONS.SET_CARGANDO,
        payload: cargando
    }),

    setError: (error) => ({
        type: AUDITORIA_ACTIONS.SET_ERROR,
        payload: error
    }),

    clearError: () => ({
        type: AUDITORIA_ACTIONS.CLEAR_ERROR
    }),

    setFiltros: (filtros) => ({
        type: AUDITORIA_ACTIONS.SET_FILTROS,
        payload: filtros
    }),

    setPaginacion: (paginacion) => ({
        type: AUDITORIA_ACTIONS.SET_PAGINACION,
        payload: paginacion
    }),

    limpiarFiltros: () => ({
        type: AUDITORIA_ACTIONS.LIMPIAR_FILTROS
    }),

    // Acciones síncronas para auditoría de usuarios
    setAuditoriasUsuarios: (auditorias) => ({
        type: AUDITORIA_ACTIONS.SET_AUDITORIAS_USUARIOS,
        payload: auditorias
    }),

    setCargandoUsuarios: (cargando) => ({
        type: AUDITORIA_ACTIONS.SET_CARGANDO_USUARIOS,
        payload: cargando
    }),

    setErrorUsuarios: (error) => ({
        type: AUDITORIA_ACTIONS.SET_ERROR_USUARIOS,
        payload: error
    }),

    // ============================================
    // Acciones asíncronas (Thunks)
    // ============================================

    // Acción asíncrona para cargar auditorías desde la API
    fetchAuditorias: () => async (dispatch, getState) => {
        dispatch(auditoriaActions.setCargando(true));

        try {
            // Obtener el token del state de Redux
            const state = getState();
            const token = state.auth?.token || localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No hay token de autenticación disponible');
            }

            const response = await fetch('/api/Auditoria', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar auditorías');
            }

            const data = await response.json();
            dispatch(auditoriaActions.setAuditorias(data));
        } catch (error) {
            console.error('Error al cargar auditorías:', error);
            dispatch(auditoriaActions.setError(error.message));
        } finally {
            dispatch(auditoriaActions.setCargando(false));
        }
    },

    // Acción para filtrar auditorías con parámetros
    fetchAuditoriasByFilter: (filtros) => async (dispatch, getState) => {
        dispatch(auditoriaActions.setCargando(true));

        try {
            // Obtener el token del state de Redux
            const state = getState();
            const token = state.auth?.token || localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No hay token de autenticación disponible');
            }

            const params = new URLSearchParams();

            if (filtros.tipo) params.append('tipo', filtros.tipo);
            if (filtros.usuario) params.append('usuario', filtros.usuario);
            if (filtros.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
            if (filtros.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);
            if (filtros.busqueda) params.append('busqueda', filtros.busqueda);

            const response = await fetch(`/api/Auditoria?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar auditorías');
            }

            const data = await response.json();
            dispatch(auditoriaActions.setAuditorias(data));
        } catch (error) {
            console.error('Error al cargar auditorías con filtros:', error);
            dispatch(auditoriaActions.setError(error.message));
        } finally {
            dispatch(auditoriaActions.setCargando(false));
        }
    },

    // Acción asíncrona para cargar auditorías de usuarios desde la API
    fetchUsuariosAuditoria: (filtros = {}) => async (dispatch, getState) => {
        dispatch(auditoriaActions.setCargandoUsuarios(true));

        try {
            // Obtener el token del state de Redux
            const state = getState();
            const token = state.auth?.token || localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No hay token de autenticación disponible');
            }

            // Construir query string con filtros - debe coincidir con los parámetros del endpoint
            const params = new URLSearchParams();
            
            // Solo agregar parámetros si tienen valores válidos
            if (filtros.busqueda && filtros.busqueda.trim()) {
                params.append('busqueda', filtros.busqueda.trim());
            }
            if (filtros.tipo && filtros.tipo.trim()) {
                params.append('accion', filtros.tipo.trim());
            }
            if (filtros.fechaDesde && filtros.fechaDesde.trim()) {
                params.append('fechaDesde', filtros.fechaDesde.trim());
            }
            if (filtros.fechaHasta && filtros.fechaHasta.trim()) {
                params.append('fechaHasta', filtros.fechaHasta.trim());
            }
            if (filtros.usuario) {
                // Asegurarse de que sea un número válido
                const usuarioId = parseInt(filtros.usuario);
                if (!isNaN(usuarioId)) {
                    params.append('usuarioId', usuarioId.toString());
                }
            }

            const queryString = params.toString() ? `?${params.toString()}` : '';
            
            console.log('📋 Fetching auditorías de usuarios con URL:', `/api/Auditoria/usuarios${queryString}`);
            
            const response = await fetch(`/api/Auditoria/usuarios${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Error response:', errorText);
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Auditorías de usuarios cargadas:', data.length, 'registros');
            dispatch(auditoriaActions.setAuditoriasUsuarios(data));
        } catch (error) {
            console.error('❌ Error al cargar auditorías de usuarios:', error);
            dispatch(auditoriaActions.setErrorUsuarios(error.message));
        } finally {
            dispatch(auditoriaActions.setCargandoUsuarios(false));
        }
    }
};

// Hacer disponible globalmente
window.AuditoriaActions = auditoriaActions;
window.AuditoriaActions.TYPES = AUDITORIA_ACTIONS;

console.log('📋 Auditoria Actions cargadas correctamente con Thunks');
