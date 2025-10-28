/**
 * Provider de Redux para la aplicación (versión organizada)
 * Envuelve la aplicación con el store de Redux
 */

const { Provider } = ReactRedux;

// Componente Provider personalizado
const AppProvider = ({ children }) => {
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
    const usuarios = useAppSelector(window.ReduxStore.selectors.selectUsuarios);
    const usuariosFiltrados = useAppSelector(window.ReduxStore.selectors.selectUsuariosFiltrados);
    const cargando = useAppSelector(window.ReduxStore.selectors.selectUsuariosCargando);
    const error = useAppSelector(window.ReduxStore.selectors.selectUsuariosError);
    const filtros = useAppSelector(window.ReduxStore.selectors.selectUsuariosFiltros);

    return {
        usuarios,
        usuariosFiltrados,
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

// Componente de ejemplo que usa Redux
const ContadorEjemplo = () => {
    const { agregarNotificacion } = useApp();
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
    useUsuarios,
    useVentas,
    useApp,
    useEstadisticas,
    ContadorEjemplo
};

console.log('🔗 Redux Provider (organizado) configurado correctamente');
