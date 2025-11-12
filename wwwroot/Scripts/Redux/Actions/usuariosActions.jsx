/**
 * Actions para la gestión de usuarios
 */

// Action Types
const USUARIOS_ACTIONS = {
    SET_USUARIOS: 'usuarios/setUsuarios',
    AGREGAR_USUARIO: 'usuarios/agregarUsuario',
    ACTUALIZAR_USUARIO: 'usuarios/actualizarUsuario',
    ELIMINAR_USUARIO: 'usuarios/eliminarUsuario',
    SET_CARGANDO: 'usuarios/setCargando',
    SET_ERROR: 'usuarios/setError',
    SET_FILTROS: 'usuarios/setFiltros'
};

// Action Creators
const usuariosActions = {
    setUsuarios: (usuarios) => ({
        type: USUARIOS_ACTIONS.SET_USUARIOS,
        payload: usuarios
    }),

    agregarUsuario: (usuario) => ({
        type: USUARIOS_ACTIONS.AGREGAR_USUARIO,
        payload: usuario
    }),

    actualizarUsuario: (usuario) => ({
        type: USUARIOS_ACTIONS.ACTUALIZAR_USUARIO,
        payload: usuario
    }),

    eliminarUsuario: (id) => ({
        type: USUARIOS_ACTIONS.ELIMINAR_USUARIO,
        payload: id
    }),

    setCargando: (cargando) => ({
        type: USUARIOS_ACTIONS.SET_CARGANDO,
        payload: cargando
    }),

    setError: (error) => ({
        type: USUARIOS_ACTIONS.SET_ERROR,
        payload: error
    }),

    setFiltros: (filtros) => ({
        type: USUARIOS_ACTIONS.SET_FILTROS,
        payload: filtros
    }),

    // Acciones asíncronas (Thunks)
    fetchUsuarios: () => async (dispatch) => {
        dispatch(usuariosActions.setCargando(true));
        dispatch(usuariosActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/usuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }

            const result = await response.json();

            if (result.success && result.data) {
                dispatch(usuariosActions.setUsuarios(result.data));
            } else {
                throw new Error(result.message || 'Error al obtener usuarios');
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            dispatch(usuariosActions.setError(error.message));
            if (window.Toats) {
                window.Toats.show('danger', 'Error al cargar usuarios');
            }
        } finally {
            dispatch(usuariosActions.setCargando(false));
        }
    },

    crearUsuario: (usuarioData) => async (dispatch) => {
        dispatch(usuariosActions.setCargando(true));
        dispatch(usuariosActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/usuario', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear usuario');
            }

            const result = await response.json();

            if (result.success && result.data) {
                dispatch(usuariosActions.agregarUsuario(result.data));
                return {success: true, data: result.data};
            } else {
                throw new Error(result.message || 'Error al crear usuario');
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            dispatch(usuariosActions.setError(error.message));
            return {success: false, error: error.message};
        } finally {
            dispatch(usuariosActions.setCargando(false));
        }
    },

    editarUsuario: (usuarioData) => async (dispatch) => {
        dispatch(usuariosActions.setCargando(true));
        dispatch(usuariosActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/usuario/${usuarioData.fidUsuario}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar usuario');
            }

            const result = await response.json();

            if (result.success && result.data) {
                dispatch(usuariosActions.actualizarUsuario(result.data));
                return {success: true, data: result.data};
            } else {
                throw new Error(result.message || 'Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            dispatch(usuariosActions.setError(error.message));
            return {success: false, error: error.message};
        } finally {
            dispatch(usuariosActions.setCargando(false));
        }
    },

    eliminarUsuarioById: (usuarioId) => async (dispatch) => {
        dispatch(usuariosActions.setCargando(true));
        dispatch(usuariosActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/usuario/${usuarioId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar usuario');
            }

            const result = await response.json();

            if (result.success) {
                dispatch(usuariosActions.eliminarUsuario(usuarioId));
                return {success: true};
            } else {
                throw new Error(result.message || 'Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            dispatch(usuariosActions.setError(error.message));
            return {success: false, error: error.message};
        } finally {
            dispatch(usuariosActions.setCargando(false));
        }
    },

    activarUsuario: (usuarioId) => async (dispatch) => {
        dispatch(usuariosActions.setCargando(true));
        dispatch(usuariosActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/usuario/${usuarioId}/activate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al activar usuario');
            }

            const result = await response.json();

            if (result.success) {
                // Recargar la lista de usuarios
                dispatch(usuariosActions.fetchUsuarios());
                return {success: true};
            } else {
                throw new Error(result.message || 'Error al activar usuario');
            }
        } catch (error) {
            console.error('Error al activar usuario:', error);
            dispatch(usuariosActions.setError(error.message));
            return {success: false, error: error.message};
        } finally {
            dispatch(usuariosActions.setCargando(false));
        }
    }
};

// Hacer disponible globalmente
window.UsuariosActions = {
    TYPES: USUARIOS_ACTIONS,
    ...usuariosActions
};

console.log('👥 Usuarios Actions cargadas correctamente');
