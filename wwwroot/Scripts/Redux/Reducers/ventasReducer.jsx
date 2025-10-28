/**
 * Reducer para la gestión de ventas
 */

// Función auxiliar
function esVentaDeHoy(fecha) {
    const hoy = new Date().toDateString();
    const fechaVenta = new Date(fecha).toDateString();
    return hoy === fechaVenta;
}

const ventasReducer = (state = {
    lista: [],
    resumen: {
        totalVentas: 0,
        ventasHoy: 0,
        clientesActivos: 0
    },
    cargando: false,
    error: null
}, action) => {
    const { TYPES } = window.VentasActions;
    
    switch (action.type) {
        case TYPES.SET_VENTAS:
            return {
                ...state,
                lista: action.payload,
                cargando: false
            };
            
        case TYPES.AGREGAR_VENTA:
            const nuevaLista = [action.payload, ...state.lista];
            return {
                ...state,
                lista: nuevaLista,
                resumen: {
                    ...state.resumen,
                    totalVentas: state.resumen.totalVentas + 1,
                    ventasHoy: esVentaDeHoy(action.payload.fecha) 
                        ? state.resumen.ventasHoy + 1 
                        : state.resumen.ventasHoy
                }
            };
            
        case TYPES.SET_RESUMEN:
            return {
                ...state,
                resumen: action.payload
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
            
        default:
            return state;
    }
};

// Hacer disponible globalmente
window.VentasReducer = ventasReducer;

console.log('💰 Ventas Reducer cargado correctamente');
