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
/* jshint ignore:start */
/* global React */
var OffCanvasActRecientes = /*#__PURE__*/function (_React$Component) {
  function OffCanvasActRecientes() {
    _classCallCheck(this, OffCanvasActRecientes);
    return _callSuper(this, OffCanvasActRecientes, arguments);
  }
  _inherits(OffCanvasActRecientes, _React$Component);
  return _createClass(OffCanvasActRecientes, [{
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
      var _this = this;
      var _this$props = this.props,
        show = _this$props.show,
        onClose = _this$props.onClose,
        _this$props$actividad = _this$props.actividades,
        actividades = _this$props$actividad === void 0 ? [] : _this$props$actividad,
        verMas = _this$props.verMas,
        actividad = _this$props.actividad;
      if (!show) return null;
      // Si hay actividad seleccionada, mostrar solo el detalle
      if (actividad) {
        return /*#__PURE__*/React.createElement(window.OffCanvas, {
          show: show,
          onClose: onClose,
          width: "350px"
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            width: '100%',
            marginBottom: '16px'
          }
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
          className: "mb-3"
        }, "Detalle de actividad"))), /*#__PURE__*/React.createElement("div", {
          className: "act-description mb-2"
        }, /*#__PURE__*/React.createElement("b", null, "Tipo:"), " ", actividad.tipo), /*#__PURE__*/React.createElement("div", {
          className: "act-description mb-2"
        }, /*#__PURE__*/React.createElement("b", null, "Descripci\xF3n:"), " ", actividad.descripcion), /*#__PURE__*/React.createElement("div", {
          className: "act-description mb-2"
        }, /*#__PURE__*/React.createElement("b", null, "Fecha:"), " ", actividad.fecha), actividad.detalleAdicional && /*#__PURE__*/React.createElement("div", {
          className: "act-detalle mb-2"
        }, /*#__PURE__*/React.createElement("b", null, "Detalle:"), " ", actividad.detalleAdicional), actividad.esUrgente && /*#__PURE__*/React.createElement("span", {
          className: "badge bg-danger"
        }, "\xA1Urgente!"));
      }
      // Si no, mostrar la lista paginada
      return /*#__PURE__*/React.createElement(window.OffCanvas, {
        show: show,
        onClose: onClose,
        width: "350px"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "mb-3"
      }, "Actividades recientes"), /*#__PURE__*/React.createElement("div", {
        className: "actividades-list"
      }, actividades.length === 0 && /*#__PURE__*/React.createElement("div", {
        className: "text-muted"
      }, "No hay actividades."), actividades.map(function (act) {
        return /*#__PURE__*/React.createElement("div", {
          key: act.id,
          className: "activity-item mb-3 ".concat(act.esUrgente ? 'urgent' : ''),
          style: {
            cursor: 'default'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "d-flex"
        }, /*#__PURE__*/React.createElement("div", {
          className: "activity-icon me-3 ".concat(act.tipo.toLowerCase())
        }, /*#__PURE__*/React.createElement("i", {
          className: _this.getIconClass(act.tipo)
        })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          className: "act-tipo"
        }, act.tipo), /*#__PURE__*/React.createElement("div", {
          className: "act-description"
        }, act.descripcion), /*#__PURE__*/React.createElement("small", {
          className: "act-fecha"
        }, act.fecha), act.detalleAdicional && /*#__PURE__*/React.createElement("div", {
          className: "act-detalle"
        }, act.detalleAdicional), act.esUrgente && /*#__PURE__*/React.createElement("span", {
          className: "badge bg-danger ms-2"
        }, "\xA1Urgente!"))), /*#__PURE__*/React.createElement("hr", {
          className: "my-2"
        }));
      })), verMas && /*#__PURE__*/React.createElement("div", {
        className: "text-center mt-3"
      }, /*#__PURE__*/React.createElement("button", {
        className: "register-button",
        onClick: verMas
      }, "Ver m\xE1s")));
    }
  }], [{
    key: "open",
    value: function open() {
      var offcanvas = document.getElementById('offcanvas-actividad-reciente');
      if (offcanvas) {
        offcanvas.classList.add('show');
        offcanvas.style.display = 'block';
      }
    }
  }, {
    key: "close",
    value: function close() {
      var offcanvas = document.getElementById('offcanvas-actividad-reciente');
      if (offcanvas) {
        offcanvas.classList.remove('show');
        offcanvas.style.display = 'none';
      }
    }
  }]);
}(React.Component);
window.OffCanvasActRecientes = OffCanvasActRecientes;

/* jshint ignore:end */