"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Provider de Redux para la aplicación (versión organizada)
 * Envuelve la aplicación con el store de Redux
 */

var _ReactRedux = ReactRedux,
  Provider = _ReactRedux.Provider;

// Componente Provider personalizado
var AppProvider = function AppProvider(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Provider, {
    store: window.ReduxStore.store
  }, children);
};

// Hook personalizado para usar el store
var useAppSelector = function useAppSelector(selector) {
  return ReactRedux.useSelector(selector);
};
var useAppDispatch = function useAppDispatch() {
  return ReactRedux.useDispatch();
};

// Hook para acciones de usuarios
var useUsuarios = function useUsuarios() {
  var dispatch = useAppDispatch();
  var usuarios = useAppSelector(window.ReduxStore.selectors.selectUsuarios);
  var usuariosFiltrados = useAppSelector(window.ReduxStore.selectors.selectUsuariosFiltrados);
  var cargando = useAppSelector(window.ReduxStore.selectors.selectUsuariosCargando);
  var error = useAppSelector(window.ReduxStore.selectors.selectUsuariosError);
  var filtros = useAppSelector(window.ReduxStore.selectors.selectUsuariosFiltros);
  return {
    usuarios: usuarios,
    usuariosFiltrados: usuariosFiltrados,
    cargando: cargando,
    error: error,
    filtros: filtros,
    // Acciones
    setUsuarios: function setUsuarios(usuarios) {
      return dispatch(window.ReduxStore.usuarios.setUsuarios(usuarios));
    },
    agregarUsuario: function agregarUsuario(usuario) {
      return dispatch(window.ReduxStore.usuarios.agregarUsuario(usuario));
    },
    actualizarUsuario: function actualizarUsuario(usuario) {
      return dispatch(window.ReduxStore.usuarios.actualizarUsuario(usuario));
    },
    eliminarUsuario: function eliminarUsuario(id) {
      return dispatch(window.ReduxStore.usuarios.eliminarUsuario(id));
    },
    setCargando: function setCargando(cargando) {
      return dispatch(window.ReduxStore.usuarios.setCargando(cargando));
    },
    setError: function setError(error) {
      return dispatch(window.ReduxStore.usuarios.setError(error));
    },
    setFiltros: function setFiltros(filtros) {
      return dispatch(window.ReduxStore.usuarios.setFiltros(filtros));
    }
  };
};

// Hook para acciones de ventas
var useVentas = function useVentas() {
  var dispatch = useAppDispatch();
  var ventas = useAppSelector(window.ReduxStore.selectors.selectVentas);
  var resumen = useAppSelector(window.ReduxStore.selectors.selectResumenVentas);
  var cargando = useAppSelector(window.ReduxStore.selectors.selectVentasCargando);
  var error = useAppSelector(window.ReduxStore.selectors.selectVentasError);
  return {
    ventas: ventas,
    resumen: resumen,
    cargando: cargando,
    error: error,
    // Acciones
    setVentas: function setVentas(ventas) {
      return dispatch(window.ReduxStore.ventas.setVentas(ventas));
    },
    agregarVenta: function agregarVenta(venta) {
      return dispatch(window.ReduxStore.ventas.agregarVenta(venta));
    },
    setResumen: function setResumen(resumen) {
      return dispatch(window.ReduxStore.ventas.setResumen(resumen));
    },
    setCargando: function setCargando(cargando) {
      return dispatch(window.ReduxStore.ventas.setCargando(cargando));
    },
    setError: function setError(error) {
      return dispatch(window.ReduxStore.ventas.setError(error));
    }
  };
};

// Hook para estado de la aplicación
var useApp = function useApp() {
  var dispatch = useAppDispatch();
  var sidebarAbierto = useAppSelector(window.ReduxStore.selectors.selectSidebarAbierto);
  var usuario = useAppSelector(window.ReduxStore.selectors.selectUsuarioActual);
  var tema = useAppSelector(window.ReduxStore.selectors.selectTema);
  var notificaciones = useAppSelector(window.ReduxStore.selectors.selectNotificaciones);
  var cargandoGlobal = useAppSelector(window.ReduxStore.selectors.selectCargandoGlobal);
  return {
    sidebarAbierto: sidebarAbierto,
    usuario: usuario,
    tema: tema,
    notificaciones: notificaciones,
    cargandoGlobal: cargandoGlobal,
    // Acciones
    toggleSidebar: function toggleSidebar() {
      return dispatch(window.ReduxStore.app.toggleSidebar());
    },
    setSidebarAbierto: function setSidebarAbierto(abierto) {
      return dispatch(window.ReduxStore.app.setSidebarAbierto(abierto));
    },
    setTema: function setTema(tema) {
      return dispatch(window.ReduxStore.app.setTema(tema));
    },
    setUsuario: function setUsuario(usuario) {
      return dispatch(window.ReduxStore.app.setUsuario(usuario));
    },
    agregarNotificacion: function agregarNotificacion(notificacion) {
      return dispatch(window.ReduxStore.app.agregarNotificacion(notificacion));
    },
    eliminarNotificacion: function eliminarNotificacion(id) {
      return dispatch(window.ReduxStore.app.eliminarNotificacion(id));
    },
    setCargandoGlobal: function setCargandoGlobal(cargando) {
      return dispatch(window.ReduxStore.app.setCargandoGlobal(cargando));
    }
  };
};

// Hook combinado para estadísticas
var useEstadisticas = function useEstadisticas() {
  var usuariosActivos = useAppSelector(window.ReduxStore.selectors.selectUsuariosActivos);
  var ventasDelDia = useAppSelector(window.ReduxStore.selectors.selectVentasDelDia);
  var totalVentasHoy = useAppSelector(window.ReduxStore.selectors.selectTotalVentasHoy);
  return {
    usuariosActivos: usuariosActivos,
    ventasDelDia: ventasDelDia,
    totalVentasHoy: totalVentasHoy,
    cantidadUsuariosActivos: usuariosActivos.length,
    cantidadVentasHoy: ventasDelDia.length
  };
};

// Componente de ejemplo que usa Redux
var ContadorEjemplo = function ContadorEjemplo() {
  var _useApp = useApp(),
    agregarNotificacion = _useApp.agregarNotificacion;
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    contador = _React$useState2[0],
    setContador = _React$useState2[1];
  var incrementar = function incrementar() {
    var nuevoValor = contador + 1;
    setContador(nuevoValor);

    // Agregar notificación usando Redux
    agregarNotificacion({
      tipo: 'info',
      mensaje: "Contador incrementado a ".concat(nuevoValor),
      autoClose: true
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-3 border rounded"
  }, /*#__PURE__*/React.createElement("h5", null, "Ejemplo Redux Organizado"), /*#__PURE__*/React.createElement("p", null, "Contador: ", contador), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: incrementar
  }, "Incrementar"));
};

// Hacer disponible globalmente
window.ReduxProvider = {
  AppProvider: AppProvider,
  useAppSelector: useAppSelector,
  useAppDispatch: useAppDispatch,
  useUsuarios: useUsuarios,
  useVentas: useVentas,
  useApp: useApp,
  useEstadisticas: useEstadisticas,
  ContadorEjemplo: ContadorEjemplo
};
console.log('🔗 Redux Provider (organizado) configurado correctamente');