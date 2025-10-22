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
var OffCanvasPermissions = /*#__PURE__*/function (_React$Component) {
  function OffCanvasPermissions(props) {
    var _this;
    _classCallCheck(this, OffCanvasPermissions);
    _this = _callSuper(this, OffCanvasPermissions, [props]);
    _this.state = {
      activeTab: 'general',
      categories: [{
        key: 'general',
        name: 'General'
      }, {
        key: 'ventas',
        name: 'Ventas'
      }, {
        key: 'clientes',
        name: 'Clientes'
      }],
      permissions: {
        general: [{
          value: 'VerDashboard',
          displayName: 'Ver Dashboard',
          isSelected: true
        }, {
          value: 'VerReportes',
          displayName: 'Ver Reportes',
          isSelected: false
        }],
        ventas: [{
          value: 'CrearVenta',
          displayName: 'Crear Venta',
          isSelected: true
        }, {
          value: 'AnularVenta',
          displayName: 'Anular Venta',
          isSelected: false
        }],
        clientes: [{
          value: 'VerCliente',
          displayName: 'Ver Cliente',
          isSelected: true
        }, {
          value: 'EditarCliente',
          displayName: 'Editar Cliente',
          isSelected: false
        }]
      }
    };
    _this.handleTabChange = _this.handleTabChange.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }
  _inherits(OffCanvasPermissions, _React$Component);
  return _createClass(OffCanvasPermissions, [{
    key: "handleTabChange",
    value: function handleTabChange(tabKey) {
      this.setState({
        activeTab: tabKey
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      if (this.props.onClose) this.props.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        show = _this$props.show,
        user = _this$props.user;
      var _this$state = this.state,
        activeTab = _this$state.activeTab,
        categories = _this$state.categories,
        permissions = _this$state.permissions;
      if (!show || !user) return null;
      return /*#__PURE__*/React.createElement(window.OffCanvas, {
        show: show,
        onClose: this.handleClose,
        width: "400px"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: '18px'
        }
      }, /*#__PURE__*/React.createElement("h5", {
        style: {
          color: 'var(--primary-dark)',
          fontWeight: 700,
          marginBottom: 0
        }
      }, 'Permisos de ' + (user.fnombre || user.nombre))), /*#__PURE__*/React.createElement("ul", {
        className: "nav nav-tabs mb-3"
      }, categories.map(function (cat) {
        return /*#__PURE__*/React.createElement("li", {
          className: "nav-item",
          key: cat.key
        }, /*#__PURE__*/React.createElement("button", {
          className: 'nav-link' + (activeTab === cat.key ? ' active' : ''),
          onClick: function onClick() {
            return _this2.handleTabChange(cat.key);
          }
        }, cat.name));
      })), /*#__PURE__*/React.createElement("div", {
        className: "tab-content"
      }, categories.map(function (cat) {
        return /*#__PURE__*/React.createElement("div", {
          className: 'tab-pane fade' + (activeTab === cat.key ? ' show active' : ''),
          key: cat.key,
          style: {
            paddingTop: '8px'
          }
        }, permissions[cat.key].map(function (perm) {
          return /*#__PURE__*/React.createElement("div", {
            className: "form-check form-switch mb-2",
            key: perm.value
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            className: "form-check-input",
            id: 'perm-' + perm.value,
            checked: perm.isSelected,
            onChange: function onChange() {}
          }), /*#__PURE__*/React.createElement("label", {
            className: "form-check-label",
            htmlFor: 'perm-' + perm.value
          }, perm.displayName));
        }));
      })), /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-end gap-2 mt-4"
      }, /*#__PURE__*/React.createElement("button", {
        className: "atras-button",
        onClick: this.handleClose
      }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
        className: "register-button"
      }, "Guardar Cambios")));
    }
  }]);
}(React.Component);
window.OffCanvasPermissions = OffCanvasPermissions;

/* jshint ignore:end */