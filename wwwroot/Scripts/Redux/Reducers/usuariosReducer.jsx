/**
 * Reducer para la gestión de usuarios
 */

const usuariosReducer = (state = {
    lista: [],
    cargando: false,
    error: null,
    filtros: {
        busqueda: '',
        estado: 'todos'
    }
}, action) => {
    const { TYPES } = window.UsuariosActions;
    
    switch (action.type) {
        case TYPES.SET_USUARIOS:
            return {
                ...state,
                lista: action.payload,
                cargando: false,
                error: null
            };
            
        case TYPES.AGREGAR_USUARIO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };
            
        case TYPES.ACTUALIZAR_USUARIO:
            return {
                ...state,
                lista: state.lista.map(u => 
                    u.id === action.payload.id 
                        ? { ...u, ...action.payload } 
                        : u
                )
            };
            
        case TYPES.ELIMINAR_USUARIO:
            return {
                ...state,
                lista: state.lista.filter(u => u.id !== action.payload)
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
                filtros: { ...state.filtros, ...action.payload }
            };
            
        default:
            return state;
    }
};

// Hacer disponible globalmente
window.UsuariosReducer = usuariosReducer;

console.log('👥 Usuarios Reducer cargado correctamente');
