"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Página de ejemplo usando Redux Toolkit
 * Demuestra el uso del store de Redux en la aplicación
 */

var ExampleReduxPage = function ExampleReduxPage() {
  // Hooks de Redux
  var _window$ReduxProvider = window.ReduxProvider.useUsuarios(),
    usuarios = _window$ReduxProvider.usuarios,
    usuariosFiltrados = _window$ReduxProvider.usuariosFiltrados,
    cargando = _window$ReduxProvider.cargando,
    setUsuarios = _window$ReduxProvider.setUsuarios,
    agregarUsuario = _window$ReduxProvider.agregarUsuario,
    setFiltros = _window$ReduxProvider.setFiltros;
  var _window$ReduxProvider2 = window.ReduxProvider.useApp(),
    agregarNotificacion = _window$ReduxProvider2.agregarNotificacion,
    toggleSidebar = _window$ReduxProvider2.toggleSidebar,
    sidebarAbierto = _window$ReduxProvider2.sidebarAbierto;
  var _window$ReduxProvider3 = window.ReduxProvider.useVentas(),
    ventas = _window$ReduxProvider3.ventas,
    resumen = _window$ReduxProvider3.resumen,
    setVentas = _window$ReduxProvider3.setVentas,
    agregarVenta = _window$ReduxProvider3.agregarVenta;

  // Estado local
  var _React$useState = React.useState({
      nombre: '',
      email: '',
      estado: 'activo'
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    nuevoUsuario = _React$useState2[0],
    setNuevoUsuario = _React$useState2[1];
  var _React$useState3 = React.useState({
      cliente: '',
      monto: 0,
      producto: ''
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    nuevaVenta = _React$useState4[0],
    setNuevaVenta = _React$useState4[1];

  // Efectos
  React.useEffect(function () {
    // Simular carga inicial de datos
    setTimeout(function () {
      setUsuarios([{
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        estado: 'activo'
      }, {
        id: 2,
        nombre: 'María García',
        email: 'maria@email.com',
        estado: 'activo'
      }, {
        id: 3,
        nombre: 'Carlos López',
        email: 'carlos@email.com',
        estado: 'inactivo'
      }]);
      setVentas([{
        id: 1,
        cliente: 'Juan Pérez',
        monto: 1500.00,
        producto: 'Producto A',
        fecha: new Date().toISOString()
      }, {
        id: 2,
        cliente: 'María García',
        monto: 2300.50,
        producto: 'Producto B',
        fecha: new Date().toISOString()
      }]);
    }, 1000);
  }, []);

  // Handlers
  var handleAgregarUsuario = function handleAgregarUsuario() {
    if (nuevoUsuario.nombre && nuevoUsuario.email) {
      var usuario = _objectSpread({
        id: Date.now()
      }, nuevoUsuario);
      agregarUsuario(usuario);
      setNuevoUsuario({
        nombre: '',
        email: '',
        estado: 'activo'
      });
      agregarNotificacion({
        tipo: 'success',
        mensaje: "Usuario ".concat(usuario.nombre, " agregado correctamente"),
        autoClose: true
      });
    }
  };
  var handleAgregarVenta = function handleAgregarVenta() {
    if (nuevaVenta.cliente && nuevaVenta.monto > 0) {
      var venta = _objectSpread(_objectSpread({
        id: Date.now()
      }, nuevaVenta), {}, {
        monto: parseFloat(nuevaVenta.monto),
        fecha: new Date().toISOString()
      });
      agregarVenta(venta);
      setNuevaVenta({
        cliente: '',
        monto: 0,
        producto: ''
      });
      agregarNotificacion({
        tipo: 'success',
        mensaje: "Venta de ".concat(window.formatCurrency(venta.monto), " registrada"),
        autoClose: true
      });
    }
  };
  var handleFiltrarUsuarios = function handleFiltrarUsuarios(busqueda) {
    setFiltros({
      busqueda: busqueda
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container-fluid p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDE80 Redux Toolkit - Demo"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-primary",
    onClick: toggleSidebar
  }, sidebarAbierto ? 'Ocultar Sidebar' : 'Mostrar Sidebar')))), /*#__PURE__*/React.createElement("div", {
    className: "row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "\uD83D\uDC65 Usuarios")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("p", null, "Total: ", window.IntegerUtils.formatear(usuarios.length)), /*#__PURE__*/React.createElement("p", null, "Activos: ", window.IntegerUtils.formatear(usuarios.filter(function (u) {
    return u.estado === 'activo';
  }).length))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "\uD83D\uDCB0 Ventas")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("p", null, "Total ventas: ", window.IntegerUtils.formatear(ventas.length)), /*#__PURE__*/React.createElement("p", null, "Monto total: ", window.formatCurrency(ventas.reduce(function (sum, v) {
    return sum + v.monto;
  }, 0)))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "\u2699\uFE0F Estado App")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("p", null, "Sidebar: ", sidebarAbierto ? 'Abierto' : 'Cerrado'), /*#__PURE__*/React.createElement("p", null, "Cargando: ", cargando ? 'Sí' : 'No'))))), /*#__PURE__*/React.createElement("div", {
    className: "row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "Agregar Usuario")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    value: nuevoUsuario.nombre,
    onChange: function onChange(e) {
      return setNuevoUsuario(_objectSpread(_objectSpread({}, nuevoUsuario), {}, {
        nombre: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "form-control",
    value: nuevoUsuario.email,
    onChange: function onChange(e) {
      return setNuevoUsuario(_objectSpread(_objectSpread({}, nuevoUsuario), {}, {
        email: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleAgregarUsuario
  }, "Agregar Usuario")))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "Agregar Venta")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Cliente"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    value: nuevaVenta.cliente,
    onChange: function onChange(e) {
      return setNuevaVenta(_objectSpread(_objectSpread({}, nuevaVenta), {}, {
        cliente: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Monto"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-control",
    value: nuevaVenta.monto,
    onChange: function onChange(e) {
      return setNuevaVenta(_objectSpread(_objectSpread({}, nuevaVenta), {}, {
        monto: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Producto"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control",
    value: nuevaVenta.producto,
    onChange: function onChange(e) {
      return setNuevaVenta(_objectSpread(_objectSpread({}, nuevaVenta), {}, {
        producto: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: handleAgregarVenta
  }, "Registrar Venta"))))), /*#__PURE__*/React.createElement("div", {
    className: "row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "Lista de Usuarios"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-control w-auto",
    placeholder: "Buscar usuarios...",
    onChange: function onChange(e) {
      return handleFiltrarUsuarios(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, cargando ? /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, "Cargando usuarios...") : /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Nombre"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Estado"))), /*#__PURE__*/React.createElement("tbody", null, usuariosFiltrados.map(function (usuario) {
    return /*#__PURE__*/React.createElement("tr", {
      key: usuario.id
    }, /*#__PURE__*/React.createElement("td", null, usuario.id), /*#__PURE__*/React.createElement("td", null, usuario.nombre), /*#__PURE__*/React.createElement("td", null, usuario.email), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(usuario.estado === 'activo' ? 'bg-success' : 'bg-secondary')
    }, usuario.estado)));
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "mb-0"
  }, "\xDAltimas Ventas")), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Cliente"), /*#__PURE__*/React.createElement("th", null, "Producto"), /*#__PURE__*/React.createElement("th", null, "Monto"), /*#__PURE__*/React.createElement("th", null, "Fecha"))), /*#__PURE__*/React.createElement("tbody", null, ventas.map(function (venta) {
    return /*#__PURE__*/React.createElement("tr", {
      key: venta.id
    }, /*#__PURE__*/React.createElement("td", null, venta.id), /*#__PURE__*/React.createElement("td", null, venta.cliente), /*#__PURE__*/React.createElement("td", null, venta.producto), /*#__PURE__*/React.createElement("td", null, window.formatCurrency(venta.monto)), /*#__PURE__*/React.createElement("td", null, window.formatDate(venta.fecha)));
  })))))))));
};

// Hacer disponible globalmente
window.ExampleReduxPage = ExampleReduxPage;