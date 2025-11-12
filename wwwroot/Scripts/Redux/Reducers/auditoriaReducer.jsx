/**
 * Reducer para la gestión de auditoría
 */

const auditoriaReducer = (state = {
    lista: [],
    cargando: false,
    error: null,
    filtros: {
        tipo: '',
        usuario: '',
        fechaDesde: '',
        fechaHasta: '',
        busqueda: ''
    },
    paginacion: {
        paginaActual: 0,
        elementosPorPagina: 15,
        totalElementos: 0
    },
    // Estado para auditoría de usuarios
    usuarios: {
        lista: [],
        cargando: false,
        error: null
    }
}, action) => {
    const {TYPES} = window.AuditoriaActions;

    switch (action.type) {
        case TYPES.SET_AUDITORIAS:
            return {
                ...state,
                lista: action.payload,
                cargando: false,
                error: null,
                paginacion: {
                    ...state.paginacion,
                    totalElementos: action.payload.length
                }
            };

        case TYPES.SET_CARGANDO:
            return {
                ...state,
                cargando: action.payload
            };

        case TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                cargando: false
            };

        case TYPES.SET_FILTROS:
            return {
                ...state,
                filtros: {...state.filtros, ...action.payload},
                paginacion: {
                    ...state.paginacion,
                    paginaActual: 0 // Resetear página al cambiar filtros
                }
            };

        case TYPES.SET_PAGINACION:
            return {
                ...state,
                paginacion: {...state.paginacion, ...action.payload}
            };

        case TYPES.LIMPIAR_FILTROS:
            return {
                ...state,
                filtros: {
                    tipo: '',
                    usuario: '',
                    fechaDesde: '',
                    fechaHasta: '',
                    busqueda: ''
                },
                paginacion: {
                    ...state.paginacion,
                    paginaActual: 0
                }
            };

        // Casos para auditoría de usuarios
        case TYPES.SET_AUDITORIAS_USUARIOS:
            return {
                ...state,
                usuarios: {
                    ...state.usuarios,
                    lista: action.payload,
                    cargando: false,
                    error: null
                }
            };

        case TYPES.SET_CARGANDO_USUARIOS:
            return {
                ...state,
                usuarios: {
                    ...state.usuarios,
                    cargando: action.payload
                }
            };

        case TYPES.SET_ERROR_USUARIOS:
            return {
                ...state,
                usuarios: {
                    ...state.usuarios,
                    error: action.payload,
                    cargando: false
                }
            };

        default:
            return state;
    }
};

// Hacer disponible globalmente
window.AuditoriaReducer = auditoriaReducer;

console.log('📋 Auditoria Reducer cargado correctamente');
// FIN: Reducer de Auditoría

// Nota: Las Actions de Auditoría se definen en ~/Scripts/Redux/Actions/auditoriaActions.js
// para evitar duplicación y garantizar el envío del token en los headers.
