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
    })
};

// Hacer disponible globalmente
window.UsuariosActions = {
    TYPES: USUARIOS_ACTIONS,
    ...usuariosActions
};

console.log('👥 Usuarios Actions cargadas correctamente');
