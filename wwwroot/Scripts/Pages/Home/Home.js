"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Home = function Home() {
  // Redux hooks para tema y usuario
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var useSelector = window.ReactRedux.useSelector;

  // Obtener el nombre de usuario del estado de autenticación
  var userName = useSelector(function (state) {
    var _state$auth;
    return (_state$auth = state.auth) === null || _state$auth === void 0 ? void 0 : _state$auth.userName;
  });

  // Estado local
  var _React$useState = React.useState({
      ventasHoy: 12,
      cobros: 8,
      cxc: 4,
      clientesNuevos: 5,
      productoTop: 'Laptop Pro 15"',
      productosVendidos: 1200,
      nuevaPequena: 'Tablet X'
    }),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    metrics = _React$useState2[0];
  var user = userName || 'Administrador';
  return /*#__PURE__*/React.createElement("div", {
    className: "home-page ".concat(tema === 'dark' ? 'theme-dark' : 'theme-light')
  }, /*#__PURE__*/React.createElement("div", {
    className: "parent home-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div1 main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "div2 welcome-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "welcome-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "welcome-text"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "home-title"
  }, "\xA1Bienvenido, ", user, "!", /*#__PURE__*/React.createElement("span", {
    className: "badge bg-primary ms-2",
    style: {
      fontSize: '0.5em',
      verticalAlign: 'middle'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-shield-check me-1"
  }), "Admin")), /*#__PURE__*/React.createElement("p", {
    className: "home-subtitle"
  }, "Gestiona tus ventas y clientes de forma r\xE1pida y moderna.")), /*#__PURE__*/React.createElement("div", {
    className: "home-actions ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("button", {
    className: "home-button me-2 ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-plus-circle me-1"
  }), " Registrar venta"), /*#__PURE__*/React.createElement("button", {
    className: "home-button me-2 ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-people me-1"
  }), " Clientes"), /*#__PURE__*/React.createElement("button", {
    className: "home-button me-2 ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-box-seam me-1"
  }), " Productos"), /*#__PURE__*/React.createElement("button", {
    className: "home-button ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-graph-up me-1"
  }), " Reportes")))), /*#__PURE__*/React.createElement("div", {
    className: "div3 metrics-section ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "metrics-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "large-cards-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "large-cards-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-card large ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-bar-chart-line"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.ventasHoy), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Ventas hoy"))), /*#__PURE__*/React.createElement("div", {
    className: "metric-card large ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-cash-coin"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.cobros), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Cobros"))), /*#__PURE__*/React.createElement("div", {
    className: "metric-card large ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-credit-card"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.cxc), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Cxc"))))), /*#__PURE__*/React.createElement("div", {
    className: "small-cards-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "small-cards-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-card small ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-box-seam"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.productosVendidos), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Productos vendidos"))), /*#__PURE__*/React.createElement("div", {
    className: "metric-card small ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-plus"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.clientesNuevos), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Clientes nuevos"))), /*#__PURE__*/React.createElement("div", {
    className: "metric-card small ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-star"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.productoTop), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Producto top"))), /*#__PURE__*/React.createElement("div", {
    className: "metric-card small ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-tablet"
  })), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-metric-value"
  }, metrics.nuevaPequena), /*#__PURE__*/React.createElement("div", {
    className: "home-metric-label"
  }, "Nueva card"))))))), /*#__PURE__*/React.createElement("div", {
    className: "div4 graphs-section ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "graphs-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "graph-card ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-graph-title"
  }, "Gr\xE1fica de ventas"), /*#__PURE__*/React.createElement(ChartHome, null)), /*#__PURE__*/React.createElement("div", {
    className: "graph-card ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-graph-title"
  }, "Productos vendidos"), /*#__PURE__*/React.createElement(ChartHome, {
    type: "line"
  })), /*#__PURE__*/React.createElement("div", {
    className: "graph-card ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-graph-title"
  }, "Clientes nuevos"), /*#__PURE__*/React.createElement(ChartHome, {
    type: "doughnut"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "div5 activities-section ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "activities-container ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement(ActividadesRecientes, null))))));
};
window.Home = Home;