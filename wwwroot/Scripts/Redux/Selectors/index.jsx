/**
 * Selectores para obtener datos del store de Redux
 */

const reduxSelectors = {
    // Selectores de Usuarios
    selectUsuarios: (state) => state.usuarios.lista,
    
    selectUsuariosFiltrados: (state) => {
        const { lista, filtros } = state.usuarios;
        return lista.filter(usuario => {
            const coincideBusqueda = usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                                   usuario.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
            const coincedeEstado = filtros.estado === 'todos' || usuario.estado === filtros.estado;
            return coincideBusqueda && coincedeEstado;
        });
    },
    
    selectUsuariosCargando: (state) => state.usuarios.cargando,
    selectUsuariosError: (state) => state.usuarios.error,
    selectUsuariosFiltros: (state) => state.usuarios.filtros,
    
    // Selectores de Ventas
    selectVentas: (state) => state.ventas.lista,
    selectResumenVentas: (state) => state.ventas.resumen,
    selectVentasCargando: (state) => state.ventas.cargando,
    selectVentasError: (state) => state.ventas.error,
    
    // Selectores de App
    selectUsuarioActual: (state) => state.app.usuario,
    selectSidebarAbierto: (state) => state.app.sidebarAbierto,
    selectTema: (state) => state.app.tema,
    selectNotificaciones: (state) => state.app.notificaciones,
    selectCargandoGlobal: (state) => state.app.cargandoGlobal,
    
    // Selectores combinados
    selectUsuariosActivos: (state) => {
        return state.usuarios.lista.filter(u => u.estado === 'activo');
    },
    
    selectVentasDelDia: (state) => {
        const hoy = new Date().toDateString();
        return state.ventas.lista.filter(venta => {
            return new Date(venta.fecha).toDateString() === hoy;
        });
    },
    
    selectTotalVentasHoy: (state) => {
        const ventasHoy = reduxSelectors.selectVentasDelDia(state);
        return ventasHoy.reduce((total, venta) => total + venta.monto, 0);
    }
};

// Hacer disponible globalmente
window.ReduxSelectors = reduxSelectors;

console.log('🎯 Redux Selectors cargados correctamente');
