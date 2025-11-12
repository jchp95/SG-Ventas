/**
 * Actions para la gestión de clientes
 */

// Action Types
const CLIENTES_ACTIONS = {
    SET_CLIENTES: 'clientes/setClientes',
    AGREGAR_CLIENTE: 'clientes/agregarCliente',
    ACTUALIZAR_CLIENTE: 'clientes/actualizarCliente',
    ELIMINAR_CLIENTE: 'clientes/eliminarCliente',
    SET_CARGANDO: 'clientes/setCargando',
    SET_ERROR: 'clientes/setError',
    SET_FILTROS: 'clientes/setFiltros'
};

// Action Creators
const clientesActions = {
    setClientes: (clientes) => ({
        type: CLIENTES_ACTIONS.SET_CLIENTES,
        payload: clientes
    }),

    agregarCliente: (cliente) => ({
        type: CLIENTES_ACTIONS.AGREGAR_CLIENTE,
        payload: cliente
    }),

    actualizarCliente: (cliente) => ({
        type: CLIENTES_ACTIONS.ACTUALIZAR_CLIENTE,
        payload: cliente
    }),

    eliminarCliente: (id) => ({
        type: CLIENTES_ACTIONS.ELIMINAR_CLIENTE,
        payload: id
    }),

    setCargando: (cargando) => ({
        type: CLIENTES_ACTIONS.SET_CARGANDO,
        payload: cargando
    }),

    setError: (error) => ({
        type: CLIENTES_ACTIONS.SET_ERROR,
        payload: error
    }),

    setFiltros: (filtros) => ({
        type: CLIENTES_ACTIONS.SET_FILTROS,
        payload: filtros
    }),

    // ============================================
    // Acciones asíncronas (Thunks)
    // ============================================
    
    fetchClientes: () => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/cliente/listar', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener clientes');
            }

            const result = await response.json();

            if (result.success && result.data) {
                dispatch(clientesActions.setClientes(result.data));
            } else {
                throw new Error(result.message || 'Error al obtener clientes');
            }
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            dispatch(clientesActions.setError(error.message));
            if (window.ToastUtils) {
                window.ToastUtils.error('Error al cargar clientes', 'Error');
            }
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    },

    createCliente: (clienteData) => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/cliente/crear', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear cliente');
            }

            const result = await response.json();

            if (result.success) {
                dispatch(clientesActions.agregarCliente(result.data));
                return { success: true, data: result.data };
            } else {
                throw new Error(result.message || 'Error al crear cliente');
            }
        } catch (error) {
            console.error('Error al crear cliente:', error);
            dispatch(clientesActions.setError(error.message));
            return { success: false, error: error.message };
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    },

    updateCliente: (clienteData) => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch('/api/cliente/actualizar', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idCliente: clienteData.fidCliente,
                    nombre: clienteData.fnombre,
                    cedulaRnc: clienteData.fcedulaRnc,
                    telefono: clienteData.ftelefono,
                    celular: clienteData.fcelular,
                    direccion: clienteData.fdireccion,
                    fechaNacimiento: clienteData.ffechaNacimiento,
                    tipoEntidad: clienteData.ftipoEntidad,
                    calle: clienteData.fcalle,
                    limiteCredito: clienteData.flimiteCredito,
                    ubicacionGps: clienteData.fubicaciongps
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar cliente');
            }

            const result = await response.json();

            if (result.success) {
                dispatch(clientesActions.actualizarCliente(result.data));
                return { success: true, data: result.data };
            } else {
                throw new Error(result.message || 'Error al actualizar cliente');
            }
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            dispatch(clientesActions.setError(error.message));
            return { success: false, error: error.message };
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    },

    deleteCliente: (clienteId) => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/cliente/eliminar/${clienteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar cliente');
            }

            const result = await response.json();

            if (result.success) {
                dispatch(clientesActions.eliminarCliente(clienteId));
                return { success: true };
            } else {
                throw new Error(result.message || 'Error al eliminar cliente');
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            dispatch(clientesActions.setError(error.message));
            return { success: false, error: error.message };
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    },

    activateCliente: (clienteId) => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/cliente/activar/${clienteId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al activar cliente');
            }

            const result = await response.json();

            if (result.success) {
                // Recargar la lista de clientes para reflejar el cambio
                dispatch(clientesActions.fetchClientes());
                return { success: true };
            } else {
                throw new Error(result.message || 'Error al activar cliente');
            }
        } catch (error) {
            console.error('Error al activar cliente:', error);
            dispatch(clientesActions.setError(error.message));
            return { success: false, error: error.message };
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    },

    toggleActivoCliente: (clienteId) => async (dispatch) => {
        dispatch(clientesActions.setCargando(true));
        dispatch(clientesActions.setError(null));

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await fetch(`/api/cliente/toggle-activo/${clienteId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al cambiar estado del cliente');
            }

            const result = await response.json();

            if (result.success) {
                // Recargar la lista de clientes para reflejar el cambio
                dispatch(clientesActions.fetchClientes());
                return { success: true };
            } else {
                throw new Error(result.message || 'Error al cambiar estado del cliente');
            }
        } catch (error) {
            console.error('Error al cambiar estado del cliente:', error);
            dispatch(clientesActions.setError(error.message));
            return { success: false, error: error.message };
        } finally {
            dispatch(clientesActions.setCargando(false));
        }
    }
};

// Exportar al objeto global
window.ClientesActions = {
    TYPES: CLIENTES_ACTIONS,
    ...clientesActions
};

console.log('✅ ClientesActions cargados correctamente');
