/**
 * Provider de Redux para la aplicación (versión organizada)
 * Envuelve la aplicación con el store de Redux
 */

const {Provider} = ReactRedux;

// Componente Provider personalizado
const AppProvider = ({children}) => {
    // Verificar que el store esté disponible antes de usarlo
    if (!window.ReduxStore || !window.ReduxStore.store) {
        console.warn('ReduxStore no está disponible aún');
        return React.createElement('div', {className: 'loading'}, 'Cargando...');
    }
    return <Provider store={window.ReduxStore.store}>{children}</Provider>;
};

// Hook personalizado para usar el store
const useAppSelector = (selector) => {
    return ReactRedux.useSelector(selector);
};

const useAppDispatch = () => {
    return ReactRedux.useDispatch();
};

// Hook para acciones de usuarios
const useUsuarios = () => {
    const dispatch = useAppDispatch();
    const lista = useAppSelector((state) => state.usuarios.lista || []);
    const cargando = useAppSelector((state) => state.usuarios.cargando || false);
    const error = useAppSelector((state) => state.usuarios.error || null);
    const filtros = useAppSelector((state) => state.usuarios.filtros || {busqueda: '', estado: 'todos'});

    return {
        usuarios: lista,
        cargando,
        error,
        filtros,
        // Acciones
        setUsuarios: (usuarios) => dispatch(window.ReduxStore.usuarios.setUsuarios(usuarios)),
        agregarUsuario: (usuario) => dispatch(window.ReduxStore.usuarios.agregarUsuario(usuario)),
        actualizarUsuario: (usuario) => dispatch(window.ReduxStore.usuarios.actualizarUsuario(usuario)),
        eliminarUsuario: (id) => dispatch(window.ReduxStore.usuarios.eliminarUsuario(id)),
        setCargando: (cargando) => dispatch(window.ReduxStore.usuarios.setCargando(cargando)),
        setError: (error) => dispatch(window.ReduxStore.usuarios.setError(error)),
        setFiltros: (filtros) => dispatch(window.ReduxStore.usuarios.setFiltros(filtros))
    };
};

// Hook para acciones de ventas
const useVentas = () => {
    const dispatch = useAppDispatch();
    const ventas = useAppSelector(window.ReduxStore.selectors.selectVentas);
    const resumen = useAppSelector(window.ReduxStore.selectors.selectResumenVentas);
    const cargando = useAppSelector(window.ReduxStore.selectors.selectVentasCargando);
    const error = useAppSelector(window.ReduxStore.selectors.selectVentasError);

    return {
        ventas,
        resumen,
        cargando,
        error,
        // Acciones
        setVentas: (ventas) => dispatch(window.ReduxStore.ventas.setVentas(ventas)),
        agregarVenta: (venta) => dispatch(window.ReduxStore.ventas.agregarVenta(venta)),
        setResumen: (resumen) => dispatch(window.ReduxStore.ventas.setResumen(resumen)),
        setCargando: (cargando) => dispatch(window.ReduxStore.ventas.setCargando(cargando)),
        setError: (error) => dispatch(window.ReduxStore.ventas.setError(error))
    };
};

// Hook para acciones de clientes
const useClientes = () => {
    const dispatch = useAppDispatch();
    const lista = useAppSelector((state) => state.clientes.lista || []);
    const cargando = useAppSelector((state) => state.clientes.cargando || false);
    const error = useAppSelector((state) => state.clientes.error || null);
    const filtros = useAppSelector((state) => state.clientes.filtros || {busqueda: '', estado: 'todos'});

    return {
        clientes: lista,
        cargando,
        error,
        filtros,
        // Acciones síncronas
        setClientes: (clientes) => dispatch(window.ReduxStore.clientes.setClientes(clientes)),
        agregarCliente: (cliente) => dispatch(window.ReduxStore.clientes.agregarCliente(cliente)),
        actualizarCliente: (cliente) => dispatch(window.ReduxStore.clientes.actualizarCliente(cliente)),
        eliminarCliente: (id) => dispatch(window.ReduxStore.clientes.eliminarCliente(id)),
        setCargando: (cargando) => dispatch(window.ReduxStore.clientes.setCargando(cargando)),
        setError: (error) => dispatch(window.ReduxStore.clientes.setError(error)),
        setFiltros: (filtros) => dispatch(window.ReduxStore.clientes.setFiltros(filtros)),
        // Acciones asíncronas (thunks)
        fetchClientes: () => dispatch(window.ReduxStore.clientes.fetchClientes()),
        createCliente: (clienteData) => dispatch(window.ReduxStore.clientes.createCliente(clienteData)),
        updateCliente: (clienteData) => dispatch(window.ReduxStore.clientes.updateCliente(clienteData)),
        deleteCliente: (clienteId) => dispatch(window.ReduxStore.clientes.deleteCliente(clienteId)),
        activateCliente: (clienteId) => dispatch(window.ReduxStore.clientes.activateCliente(clienteId)),
        toggleActivoCliente: (clienteId) => dispatch(window.ReduxStore.clientes.toggleActivoCliente(clienteId))
    };
};

// Hook para estado de la aplicación
const useApp = () => {
    const dispatch = useAppDispatch();
    const sidebarAbierto = useAppSelector(window.ReduxStore.selectors.selectSidebarAbierto);
    const usuario = useAppSelector(window.ReduxStore.selectors.selectUsuarioActual);
    const tema = useAppSelector(window.ReduxStore.selectors.selectTema);
    const notificaciones = useAppSelector(window.ReduxStore.selectors.selectNotificaciones);
    const cargandoGlobal = useAppSelector(window.ReduxStore.selectors.selectCargandoGlobal);

    return {
        sidebarAbierto,
        usuario,
        tema,
        notificaciones,
        cargandoGlobal,
        // Acciones
        toggleSidebar: () => dispatch(window.ReduxStore.app.toggleSidebar()),
        setSidebarAbierto: (abierto) => dispatch(window.ReduxStore.app.setSidebarAbierto(abierto)),
        setTema: (tema) => dispatch(window.ReduxStore.app.setTema(tema)),
        setUsuario: (usuario) => dispatch(window.ReduxStore.app.setUsuario(usuario)),
        agregarNotificacion: (notificacion) => dispatch(window.ReduxStore.app.agregarNotificacion(notificacion)),
        eliminarNotificacion: (id) => dispatch(window.ReduxStore.app.eliminarNotificacion(id)),
        setCargandoGlobal: (cargando) => dispatch(window.ReduxStore.app.setCargandoGlobal(cargando))
    };
};

// Hook combinado para estadísticas
const useEstadisticas = () => {
    const usuariosActivos = useAppSelector(window.ReduxStore.selectors.selectUsuariosActivos);
    const ventasDelDia = useAppSelector(window.ReduxStore.selectors.selectVentasDelDia);
    const totalVentasHoy = useAppSelector(window.ReduxStore.selectors.selectTotalVentasHoy);

    return {
        usuariosActivos,
        ventasDelDia,
        totalVentasHoy,
        cantidadUsuariosActivos: usuariosActivos.length,
        cantidadVentasHoy: ventasDelDia.length
    };
};

// Hook para autenticación
const useAuth = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth?.isAuthenticated || false);
    const token = useAppSelector(state => state.auth?.token || null);
    const userName = useAppSelector(state => state.auth?.userName || null);
    const loading = useAppSelector(state => state.auth?.loading || false);
    const error = useAppSelector(state => state.auth?.error || null);
    const message = useAppSelector(state => state.auth?.message || null);

    return {
        isAuthenticated,
        token,
        userName,
        loading,
        error,
        message,
        // Acciones thunk - ahora todas son consistentes
        login: (credentials) => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return Promise.resolve({success: false, error: 'AuthActions no disponible'});
            }
            return dispatch(window.AuthActions.login(credentials));
        },
        register: (userData) => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return Promise.resolve({success: false, error: 'AuthActions no disponible'});
            }
            return dispatch(window.AuthActions.register(userData));
        },
        logout: () => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return;
            }
            return dispatch(window.AuthActions.logout());
        },
        changePassword: (passwordData) => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return Promise.resolve({success: false, error: 'AuthActions no disponible'});
            }
            return dispatch(window.AuthActions.changePassword(passwordData));
        },
        clearError: () => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return;
            }
            return dispatch(window.AuthActions.clearAuthError());
        },
        checkAuthToken: () => {
            if (!window.AuthActions) {
                console.error('AuthActions no está disponible');
                return;
            }
            return dispatch(window.AuthActions.checkAuthToken());
        }
    };
};

// Hook para acciones de auditoría
const useAuditoria = () => {
    const dispatch = useAppDispatch();
    const auditorias = useAppSelector(window.ReduxStore.selectors.selectAuditorias);
    const auditoriasFiltradas = useAppSelector(window.ReduxStore.selectors.selectAuditoriasFiltradas);
    const cargando = useAppSelector(window.ReduxStore.selectors.selectAuditoriasCargando);
    const error = useAppSelector(window.ReduxStore.selectors.selectAuditoriasError);
    const filtros = useAppSelector(window.ReduxStore.selectors.selectAuditoriasFiltros);
    const paginacion = useAppSelector(window.ReduxStore.selectors.selectAuditoriasPaginacion);
    
    // Estado para auditoría de usuarios
    const auditoriasUsuarios = useAppSelector(state => state.auditoria?.usuarios?.lista || []);
    const cargandoUsuarios = useAppSelector(state => state.auditoria?.usuarios?.cargando || false);
    const errorUsuarios = useAppSelector(state => state.auditoria?.usuarios?.error || null);

    return {
        auditorias,
        auditoriasFiltradas,
        cargando,
        error,
        filtros,
        paginacion,
        // Estado de auditoría de usuarios
        auditoriasUsuarios,
        cargandoUsuarios,
        errorUsuarios,
        // Acciones síncronas
        setAuditorias: (auditorias) => dispatch(window.AuditoriaActions.setAuditorias(auditorias)),
        setCargando: (cargando) => dispatch(window.AuditoriaActions.setCargando(cargando)),
        setError: (error) => dispatch(window.AuditoriaActions.setError(error)),
        setFiltros: (filtros) => dispatch(window.AuditoriaActions.setFiltros(filtros)),
        setPaginacion: (paginacion) => dispatch(window.AuditoriaActions.setPaginacion(paginacion)),
        limpiarFiltros: () => dispatch(window.AuditoriaActions.limpiarFiltros()),
        // Acciones asíncronas
        fetchAuditorias: () => dispatch(window.AuditoriaActions.fetchAuditorias()),
        fetchAuditoriasByFilter: (filtros) => dispatch(window.AuditoriaActions.fetchAuditoriasByFilter(filtros)),
        fetchUsuariosAuditoria: (filtros) => dispatch(window.AuditoriaActions.fetchUsuariosAuditoria(filtros))
    };
};

// Componente de ejemplo que usa Redux
const ContadorEjemplo = () => {
    const {agregarNotificacion} = useApp();
    const [contador, setContador] = React.useState(0);

    const incrementar = () => {
        const nuevoValor = contador + 1;
        setContador(nuevoValor);

        // Agregar notificación usando Redux
        agregarNotificacion({
            tipo: 'info',
            mensaje: `Contador incrementado a ${nuevoValor}`,
            autoClose: true
        });
    };

    return (
        <div className="p-3 border rounded">
            <h5>Ejemplo Redux Organizado</h5>
            <p>Contador: {contador}</p>
            <button className="btn btn-primary" onClick={incrementar}>
                Incrementar
            </button>
        </div>
    );
};

// Hacer disponible globalmente
window.ReduxProvider = {
    AppProvider,
    useAppSelector,
    useAppDispatch,
    useDispatch: useAppDispatch, // Agregar alias para useDispatch
    useUsuarios,
    useVentas,
    useClientes,
    useApp,
    useEstadisticas,
    useAuth,
    useAuditoria,
    ContadorEjemplo
};

console.log('🔗 Redux Provider (organizado) configurado correctamente');
