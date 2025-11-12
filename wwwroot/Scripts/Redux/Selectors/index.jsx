/**
 * Selectores para obtener datos del store de Redux
 */

const reduxSelectors = {
    // Selectores de Usuarios
    selectUsuarios: (state) => state.usuarios.lista,

    selectUsuariosFiltrados: (state) => {
        const {lista, filtros} = state.usuarios;
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

    // Selectores de Clientes
    selectClientes: (state) => state.clientes.lista,

    selectClientesFiltrados: (state) => {
        const {lista, filtros} = state.clientes;
        return lista.filter(cliente => {
            const coincideBusqueda = cliente.fnombre?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                cliente.fcedulaRnc?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                cliente.ftelefono?.toLowerCase().includes(filtros.busqueda.toLowerCase());
            const coincedeEstado = filtros.estado === 'todos' || 
                (filtros.estado === 'activos' && cliente.factivo) ||
                (filtros.estado === 'inactivos' && !cliente.factivo);
            return coincideBusqueda && coincedeEstado;
        });
    },

    selectClientesCargando: (state) => state.clientes.cargando,
    selectClientesError: (state) => state.clientes.error,
    selectClientesFiltros: (state) => state.clientes.filtros,
    
    selectClientesActivos: (state) => {
        return state.clientes.lista.filter(c => c.factivo);
    },

    // Selectores de Ventas
    selectVentas: (state) => state.ventas.lista,
    selectResumenVentas: (state) => state.ventas.resumen,
    selectVentasCargando: (state) => state.ventas.cargando,
    selectVentasError: (state) => state.ventas.error,

    // Selectores de Auditoría
    selectAuditorias: (state) => state.auditoria?.lista || [],

    selectAuditoriasFiltradas: (state) => {
        const {lista, filtros} = state.auditoria || {lista: [], filtros: {}};
        return lista.filter(auditoria => {
            // Filtro por búsqueda
            if (filtros.busqueda) {
                const searchLower = filtros.busqueda.toLowerCase();
                const matchBusqueda =
                    (auditoria.ftabla?.toLowerCase().includes(searchLower)) ||
                    (auditoria.faccion?.toLowerCase().includes(searchLower)) ||
                    (auditoria.fjustificacion?.toLowerCase().includes(searchLower));
                if (!matchBusqueda) return false;
            }

            // Filtro por tipo de acción
            if (filtros.tipo && auditoria.faccion !== filtros.tipo) {
                return false;
            }

            // Filtro por usuario
            if (filtros.usuario) {
                const matchUsuario = auditoria.fkidUsuario?.toString().includes(filtros.usuario);
                if (!matchUsuario) return false;
            }

            // Filtro por fecha desde
            if (filtros.fechaDesde && auditoria.ffecha < filtros.fechaDesde) {
                return false;
            }

            // Filtro por fecha hasta
            if (filtros.fechaHasta && auditoria.ffecha > filtros.fechaHasta) {
                return false;
            }

            return true;
        });
    },

    selectAuditoriasCargando: (state) => state.auditoria?.cargando || false,
    selectAuditoriasError: (state) => state.auditoria?.error || null,
    selectAuditoriasFiltros: (state) => state.auditoria?.filtros || {},
    selectAuditoriasPaginacion: (state) => state.auditoria?.paginacion || {
        paginaActual: 0,
        elementosPorPagina: 15,
        totalElementos: 0
    },

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
    },

    selectAuditoriasDeHoy: (state) => {
        const hoy = new Date().toISOString().split('T')[0];
        return state.auditoria?.lista?.filter(aud => aud.ffecha === hoy) || [];
    },

    selectAuditoriasPorAccion: (state, accion) => {
        return state.auditoria?.lista?.filter(aud => aud.faccion === accion) || [];
    },

    // Selectores de Autenticación
    selectAuthIsAuthenticated: (state) => state.auth?.isAuthenticated || false,
    selectAuthToken: (state) => state.auth?.token || null,
    selectAuthUserName: (state) => state.auth?.userName || null,
    selectAuthLoading: (state) => state.auth?.loading || false,
    selectAuthError: (state) => state.auth?.error || null,
    selectAuthMessage: (state) => state.auth?.message || null,
};

// Hacer disponible globalmente
window.ReduxSelectors = reduxSelectors;

console.log('🎯 Redux Selectors cargados correctamente');
