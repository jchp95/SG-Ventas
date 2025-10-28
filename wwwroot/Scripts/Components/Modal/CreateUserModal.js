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
function CreateUserModal(props) {
  var user = props.user || {
    fnombre: '',
    fnombre_usuario: '',
    femail: '',
    fnivel: 1,
    factivo: true
  };
  var _React$useState = React.useState(_objectSpread({}, user)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    form = _React$useState2[0],
    setForm = _React$useState2[1];
  var isEdit = !!props.user;

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var handleChange = function handleChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value,
      type = _e$target.type,
      checked = _e$target.checked;
    setForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, type === 'checkbox' ? checked : value));
    });
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (props.onSave) props.onSave(form);
  };
  var onClose = props.onClose;
  return /*#__PURE__*/React.createElement("form", {
    className: "create-user-form ".concat(tema === 'dark' ? 'create-user-form-dark' : ''),
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("h4", null, isEdit ? 'Editar Usuario' : 'Crear Usuario'), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: tema === 'dark' ? 'text-light' : ''
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "fnombre",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: form.fnombre,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: tema === 'dark' ? 'text-light' : ''
  }, "Usuario"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "fnombre_usuario",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: form.fnombre_usuario,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: tema === 'dark' ? 'text-light' : ''
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "femail",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: form.femail,
    onChange: handleChange,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: tema === 'dark' ? 'text-light' : ''
  }, "Nivel"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "fnivel",
    className: "form-control input-light ".concat(tema === 'dark' ? 'input-dark' : ''),
    value: form.fnivel,
    onChange: handleChange,
    min: 1,
    max: 10,
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 form-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "factivo",
    className: "form-check-input ".concat(tema === 'dark' ? 'form-check-input-dark' : ''),
    checked: form.factivo,
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label ".concat(tema === 'dark' ? 'text-light' : '')
  }, "Activo")), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "atras-button",
    onClick: onClose
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "register-button",
    onClick: function onClick() {
      if (window.Toats && isEdit) {
        window.Toats.show('warning', 'Usuario editado correctamente');
      }
    }
  }, isEdit ? 'Guardar Cambios' : 'Crear Usuario')));
}
window.CreateUserModal = CreateUserModal;