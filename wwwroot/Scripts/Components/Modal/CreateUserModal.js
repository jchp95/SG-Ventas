"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var CreateUserModal = /*#__PURE__*/function (_React$Component) {
  function CreateUserModal(props) {
    var _this;
    _classCallCheck(this, CreateUserModal);
    _this = _callSuper(this, CreateUserModal, [props]);
    var user = props.user || {
      fnombre: '',
      fnombre_usuario: '',
      femail: '',
      fnivel: 1,
      factivo: true
    };
    _this.state = {
      form: _objectSpread({}, user)
    };
    _this.isEdit = !!props.user;
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }
  _inherits(CreateUserModal, _React$Component);
  return _createClass(CreateUserModal, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value,
        type = _e$target.type,
        checked = _e$target.checked;
      this.setState({
        form: _objectSpread(_objectSpread({}, this.state.form), {}, _defineProperty({}, name, type === 'checkbox' ? checked : value))
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      if (this.props.onSave) this.props.onSave(this.state.form);
    }
  }, {
    key: "render",
    value: function render() {
      var form = this.state.form;
      var onClose = this.props.onClose;
      var isEdit = this.isEdit;
      return /*#__PURE__*/React.createElement("form", {
        className: "create-user-form",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("h4", null, isEdit ? 'Editar Usuario' : 'Crear Usuario'), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", null, "Nombre"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "fnombre",
        className: "form-control input-light",
        value: form.fnombre,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", null, "Usuario"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "fnombre_usuario",
        className: "form-control input-light",
        value: form.fnombre_usuario,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
        type: "email",
        name: "femail",
        className: "form-control input-light",
        value: form.femail,
        onChange: this.handleChange,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3"
      }, /*#__PURE__*/React.createElement("label", null, "Nivel"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "fnivel",
        className: "form-control input-light",
        value: form.fnivel,
        onChange: this.handleChange,
        min: 1,
        max: 10,
        required: true
      })), /*#__PURE__*/React.createElement("div", {
        className: "mb-3 form-check"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        name: "factivo",
        className: "form-check-input",
        checked: form.factivo,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("label", {
        className: "form-check-label"
      }, "Activo")), /*#__PURE__*/React.createElement("div", {
        className: "d-flex justify-content-end gap-2"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "atras-button",
        onClick: onClose
      }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        className: "register-button"
      }, isEdit ? 'Guardar Cambios' : 'Crear Usuario')));
    }
  }]);
}(React.Component);
window.CreateUserModal = CreateUserModal;