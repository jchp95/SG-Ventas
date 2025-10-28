/**
 * Reducer para la gestión del estado global de la aplicación
 */

const appReducer = (state = {
    sidebarAbierto: true,
    tema: 'light', // 'light' o 'dark'
    usuario: null,
    notificaciones: [],
    cargandoGlobal: false
}, action) => {
    const { TYPES } = window.AppActions;
    
    switch (action.type) {
        case TYPES.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarAbierto: !state.sidebarAbierto
            };
            
        case TYPES.SET_SIDEBAR_ABIERTO:
            return {
                ...state,
                sidebarAbierto: action.payload
            };
            
        case TYPES.SET_TEMA:
            return {
                ...state,
                tema: action.payload
            };
            
        case TYPES.SET_USUARIO:
            return {
                ...state,
                usuario: action.payload
            };
            
        case TYPES.AGREGAR_NOTIFICACION:
            return {
                ...state,
                notificaciones: [...state.notificaciones, {
                    id: Date.now(),
                    ...action.payload,
                    timestamp: new Date().toISOString()
                }]
            };
            
        case TYPES.ELIMINAR_NOTIFICACION:
            return {
                ...state,
                notificaciones: state.notificaciones.filter(n => n.id !== action.payload)
            };
            
        case TYPES.SET_CARGANDO_GLOBAL:
            return {
                ...state,
                cargandoGlobal: action.payload
            };
            
        default:
            return state;
    }
};

// Hacer disponible globalmente
window.AppReducer = appReducer;

console.log('⚙️ App Reducer cargado correctamente');
