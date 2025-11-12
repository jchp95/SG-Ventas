/**
 * Reducer para la gestión de clientes
 */

const clientesReducer = (state = {
    lista: [],
    cargando: false,
    error: null,
    filtros: {
        busqueda: '',
        estado: 'todos'
    }
}, action) => {
    const {TYPES} = window.ClientesActions || {};

    if (!TYPES) {
        return state;
    }

    switch (action.type) {
        case TYPES.SET_CLIENTES:
            return {
                ...state,
                lista: action.payload,
                cargando: false,
                error: null
            };

        case TYPES.AGREGAR_CLIENTE:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case TYPES.ACTUALIZAR_CLIENTE:
            return {
                ...state,
                lista: state.lista.map(c =>
                    c.fidCliente === action.payload.fidCliente
                        ? {...c, ...action.payload}
                        : c
                )
            };

        case TYPES.ELIMINAR_CLIENTE:
            return {
                ...state,
                lista: state.lista.map(c =>
                    c.fidCliente === action.payload
                        ? {...c, factivo: false}
                        : c
                )
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
                filtros: {...state.filtros, ...action.payload}
            };

        default:
            return state;
    }
};

// Hacer disponible globalmente
window.ClientesReducer = clientesReducer;

console.log('👥 Clientes Reducer cargado correctamente');
