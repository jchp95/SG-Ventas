/**
 * Actions para la gestión del estado global de la aplicación
 */

// Action Types
const APP_ACTIONS = {
    TOGGLE_SIDEBAR: 'app/toggleSidebar',
    SET_SIDEBAR_ABIERTO: 'app/setSidebarAbierto',
    SET_TEMA: 'app/setTema',
    SET_USUARIO: 'app/setUsuario',
    AGREGAR_NOTIFICACION: 'app/agregarNotificacion',
    ELIMINAR_NOTIFICACION: 'app/eliminarNotificacion',
    SET_CARGANDO_GLOBAL: 'app/setCargandoGlobal'
};

// Action Creators
const appActions = {
    toggleSidebar: () => ({ 
        type: APP_ACTIONS.TOGGLE_SIDEBAR 
    }),
    
    setSidebarAbierto: (abierto) => ({ 
        type: APP_ACTIONS.SET_SIDEBAR_ABIERTO, 
        payload: abierto 
    }),
    
    setTema: (tema) => ({ 
        type: APP_ACTIONS.SET_TEMA, 
        payload: tema 
    }),
    
    setUsuario: (usuario) => ({ 
        type: APP_ACTIONS.SET_USUARIO, 
        payload: usuario 
    }),
    
    agregarNotificacion: (notificacion) => ({ 
        type: APP_ACTIONS.AGREGAR_NOTIFICACION, 
        payload: notificacion 
    }),
    
    eliminarNotificacion: (id) => ({ 
        type: APP_ACTIONS.ELIMINAR_NOTIFICACION, 
        payload: id 
    }),
    
    setCargandoGlobal: (cargando) => ({ 
        type: APP_ACTIONS.SET_CARGANDO_GLOBAL, 
        payload: cargando 
    })
};

// Hacer disponible globalmente
window.AppActions = {
    TYPES: APP_ACTIONS,
    ...appActions
};

console.log('⚙️ App Actions cargadas correctamente');
