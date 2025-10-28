/**
 * Actions para la gestión de ventas
 */

// Action Types
const VENTAS_ACTIONS = {
    SET_VENTAS: 'ventas/setVentas',
    AGREGAR_VENTA: 'ventas/agregarVenta',
    SET_RESUMEN: 'ventas/setResumen',
    SET_CARGANDO: 'ventas/setCargando',
    SET_ERROR: 'ventas/setError'
};

// Action Creators
const ventasActions = {
    setVentas: (ventas) => ({ 
        type: VENTAS_ACTIONS.SET_VENTAS, 
        payload: ventas 
    }),
    
    agregarVenta: (venta) => ({ 
        type: VENTAS_ACTIONS.AGREGAR_VENTA, 
        payload: venta 
    }),
    
    setResumen: (resumen) => ({ 
        type: VENTAS_ACTIONS.SET_RESUMEN, 
        payload: resumen 
    }),
    
    setCargando: (cargando) => ({ 
        type: VENTAS_ACTIONS.SET_CARGANDO, 
        payload: cargando 
    }),
    
    setError: (error) => ({ 
        type: VENTAS_ACTIONS.SET_ERROR, 
        payload: error 
    })
};

// Hacer disponible globalmente
window.VentasActions = {
    TYPES: VENTAS_ACTIONS,
    ...ventasActions
};

console.log('💰 Ventas Actions cargadas correctamente');
