"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Home = /*#__PURE__*/function (_React$Component) {
  function Home(props) {
    var _this;
    _classCallCheck(this, Home);
    _this = _callSuper(this, Home, [props]);
    _this.state = {
      user: 'Invitado',
      metrics: {
        ventasHoy: 12,
        cobros: 8,
        cxc: 4,
        clientesNuevos: 5,
        productoTop: 'Laptop Pro 15"',
        productosVendidos: 1200,
        nuevaPequena: 'Tablet X'
      }
    };
    return _this;
  }
  _inherits(Home, _React$Component);
  return _createClass(Home, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
        user = _this$state.user,
        metrics = _this$state.metrics;
      return /*#__PURE__*/React.createElement("div", {
        className: "home-page"
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
      }, "\xA1Bienvenido, ", user, "!"), /*#__PURE__*/React.createElement("p", {
        className: "home-subtitle"
      }, "Gestiona tus ventas y clientes de forma r\xE1pida y moderna.")), /*#__PURE__*/React.createElement("div", {
        className: "home-actions"
      }, /*#__PURE__*/React.createElement("button", {
        className: "home-button me-2"
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-plus-circle me-1"
      }), " Registrar venta"), /*#__PURE__*/React.createElement("button", {
        className: "home-button me-2"
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-people me-1"
      }), " Clientes"), /*#__PURE__*/React.createElement("button", {
        className: "home-button me-2"
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-box-seam me-1"
      }), " Productos"), /*#__PURE__*/React.createElement("button", {
        className: "home-button"
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-graph-up me-1"
      }), " Reportes")))), /*#__PURE__*/React.createElement("div", {
        className: "div3 metrics-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "metrics-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "large-cards-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "large-cards-grid"
      }, /*#__PURE__*/React.createElement("div", {
        className: "metric-card large"
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
        className: "metric-card large"
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
        className: "metric-card large"
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
        className: "metric-card small"
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
        className: "metric-card small"
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
        className: "metric-card small"
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
        className: "metric-card small"
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
        className: "div4 graphs-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "graphs-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "graph-card"
      }, /*#__PURE__*/React.createElement("div", {
        className: "home-graph-title"
      }, "Gr\xE1fica de ventas"), /*#__PURE__*/React.createElement(ChartHome, null)), /*#__PURE__*/React.createElement("div", {
        className: "graph-card"
      }, /*#__PURE__*/React.createElement("div", {
        className: "home-graph-title"
      }, "Productos vendidos"), /*#__PURE__*/React.createElement(ChartHome, {
        type: "line"
      })), /*#__PURE__*/React.createElement("div", {
        className: "graph-card"
      }, /*#__PURE__*/React.createElement("div", {
        className: "home-graph-title"
      }, "Clientes nuevos"), /*#__PURE__*/React.createElement(ChartHome, {
        type: "doughnut"
      })))), /*#__PURE__*/React.createElement("div", {
        className: "div5 activities-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "activities-container"
      }, /*#__PURE__*/React.createElement(ActividadesRecientes, null))))));
    }
  }]);
}(React.Component);
window.Home = Home;