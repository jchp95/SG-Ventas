"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* jshint ignore:start */
/* global React */
var ActividadesRecientes = /*#__PURE__*/function (_React$Component) {
  function ActividadesRecientes(props) {
    var _this;
    _classCallCheck(this, ActividadesRecientes);
    _this = _callSuper(this, ActividadesRecientes, [props]);
    // Simulación de muchas actividades para paginación
    _defineProperty(_this, "abrirOffCanvasActividad", function (actividad) {
      _this.setState({
        mostrarOffCanvas: true,
        actividadSeleccionada: actividad
      });
      if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
        window.OffCanvasActRecientes.open();
      }
    });
    _defineProperty(_this, "abrirOffCanvasLista", function () {
      _this.setState({
        mostrarOffCanvas: true,
        offCanvasPage: 0,
        actividadSeleccionada: null
      });
      if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.open) {
        window.OffCanvasActRecientes.open();
      }
    });
    _defineProperty(_this, "cerrarOffCanvas", function () {
      _this.setState({
        mostrarOffCanvas: false,
        actividadSeleccionada: null
      });
      if (window.OffCanvasActRecientes && window.OffCanvasActRecientes.close) {
        window.OffCanvasActRecientes.close();
      }
    });
    _defineProperty(_this, "verMasOffCanvas", function () {
      _this.setState(function (prev) {
        return {
          offCanvasPage: prev.offCanvasPage + 1
        };
      });
    });
    var actividades = [];
    for (var i = 1; i <= 50; i++) {
      actividades.push({
        id: i,
        tipo: i % 3 === 0 ? 'Producto' : i % 2 === 0 ? 'Cliente' : 'Venta',
        descripcion: "Actividad ".concat(i, " realizada"),
        fecha: "21 Oct 2025 ".concat(10 - Math.floor(i / 6), ":0").concat(i % 6, "h"),
        detalleAdicional: i % 4 === 0 ? "Detalle extra ".concat(i) : '',
        esUrgente: i % 7 === 0
      });
    }
    _this.state = {
      actividades: actividades,
      mostrarOffCanvas: false,
      offCanvasPage: 0,
      actividadSeleccionada: null
    };
    return _this;
  }
  _inherits(ActividadesRecientes, _React$Component);
  return _createClass(ActividadesRecientes, [{
    key: "getIconClass",
    value: function getIconClass(tipo) {
      switch (tipo) {
        case 'Venta':
          return 'bi bi-bar-chart-line';
        case 'Cliente':
          return 'bi bi-person-plus';
        case 'Producto':
          return 'bi bi-box-seam';
        default:
          return 'bi bi-info-circle';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        actividades = _this$state.actividades,
        mostrarOffCanvas = _this$state.mostrarOffCanvas,
        offCanvasPage = _this$state.offCanvasPage,
        actividadSeleccionada = _this$state.actividadSeleccionada;
      var ultimas5 = actividades.slice(-5).reverse();
      // Para el offcanvas: 20 por página, paginación simple
      var offCanvasActividades = actividades.slice().reverse().slice(0, 20 * (offCanvasPage + 1));
      var hayMas = actividades.length > offCanvasActividades.length;
      return /*#__PURE__*/React.createElement("div", {
        className: "actividades-recientes-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "section-title mb-2"
      }, "Actividades recientes"), /*#__PURE__*/React.createElement("div", {
        className: "actividades-list"
      }, ultimas5.map(function (act) {
        return /*#__PURE__*/React.createElement("div", {
          key: act.id,
          className: "activity-item mb-3 ".concat(act.esUrgente ? 'urgent' : ''),
          style: {
            cursor: 'pointer'
          },
          onClick: function onClick() {
            return _this2.abrirOffCanvasActividad(act);
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "d-flex"
        }, /*#__PURE__*/React.createElement("div", {
          className: "activity-icon me-3 ".concat(act.tipo.toLowerCase())
        }, /*#__PURE__*/React.createElement("i", {
          className: _this2.getIconClass(act.tipo)
        })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "act-tipo"
        }, act.tipo), /*#__PURE__*/React.createElement("div", {
          className: "act-description"
        }, act.descripcion), /*#__PURE__*/React.createElement("small", {
          className: "act-fecha"
        }, act.fecha))), /*#__PURE__*/React.createElement("hr", {
          className: "my-2"
        }));
      })), /*#__PURE__*/React.createElement("div", {
        className: "text-end"
      }, /*#__PURE__*/React.createElement("a", {
        href: "#",
        className: "show-more-link",
        onClick: function onClick(e) {
          e.preventDefault();
          _this2.abrirOffCanvasLista();
        }
      }, "Mostrar m\xE1s")), /*#__PURE__*/React.createElement(OffCanvasActRecientes, {
        show: mostrarOffCanvas,
        onClose: this.cerrarOffCanvas,
        actividades: offCanvasActividades,
        verMas: hayMas ? this.verMasOffCanvas : null,
        actividad: actividadSeleccionada
      }));
    }
  }]);
}(React.Component);
window.ActividadesRecientes = ActividadesRecientes;

/* jshint ignore:end */