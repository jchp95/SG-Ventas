"use strict";

var _excluded = ["label", "name", "type", "register", "errors", "validation", "placeholder"],
  _excluded2 = ["label", "name", "type", "register", "placeholder"],
  _excluded3 = ["label", "name", "register", "errors", "validation", "placeholder", "rows"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// HookFormUtils.jsx - Configuración simplificada de React Hook Form

// Hacer disponible React Hook Form globalmente
window.ReactHookForm = window.ReactHookForm;

// Utilidades preconfiguradas para tu proyecto
window.HookFormUtils = {
  // Configuración base para todos los formularios
  useForm: function useForm() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return window.ReactHookForm.useForm(_objectSpread({
      mode: 'onChange',
      reValidateMode: 'onChange'
    }, options));
  },
  // Componente de input preconfigurado
  InputField: function InputField(_ref) {
    var _errors$name;
    var label = _ref.label,
      name = _ref.name,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "text" : _ref$type,
      register = _ref.register,
      errors = _ref.errors,
      _ref$validation = _ref.validation,
      validation = _ref$validation === void 0 ? {} : _ref$validation,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
      props = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/React.createElement("div", {
      className: "form-group mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: name,
      className: "form-label"
    }, label), /*#__PURE__*/React.createElement("input", _extends({
      type: type,
      id: name,
      className: "form-control input-light ".concat(errors[name] ? 'is-invalid' : ''),
      placeholder: placeholder
    }, register(name, validation), props)), errors[name] && /*#__PURE__*/React.createElement("div", {
      className: "invalid-feedback d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "bi bi-exclamation-circle-fill text-danger me-2"
    }), (_errors$name = errors[name]) === null || _errors$name === void 0 ? void 0 : _errors$name.message));
  },
  // Componente para campos opcionales (sin validación)
  OptionalField: function OptionalField(_ref2) {
    var label = _ref2.label,
      name = _ref2.name,
      _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? "text" : _ref2$type,
      register = _ref2.register,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? "" : _ref2$placeholder,
      props = _objectWithoutProperties(_ref2, _excluded2);
    return /*#__PURE__*/React.createElement("div", {
      className: "form-group mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: name,
      className: "form-label"
    }, label), /*#__PURE__*/React.createElement("input", _extends({
      type: type,
      id: name,
      className: "form-control input-light",
      placeholder: placeholder
    }, register(name), props)));
  },
  // Componente para textarea
  TextareaField: function TextareaField(_ref3) {
    var _errors$name2;
    var label = _ref3.label,
      name = _ref3.name,
      register = _ref3.register,
      errors = _ref3.errors,
      _ref3$validation = _ref3.validation,
      validation = _ref3$validation === void 0 ? {} : _ref3$validation,
      _ref3$placeholder = _ref3.placeholder,
      placeholder = _ref3$placeholder === void 0 ? "" : _ref3$placeholder,
      _ref3$rows = _ref3.rows,
      rows = _ref3$rows === void 0 ? 3 : _ref3$rows,
      props = _objectWithoutProperties(_ref3, _excluded3);
    return /*#__PURE__*/React.createElement("div", {
      className: "form-group mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: name,
      className: "form-label"
    }, label), /*#__PURE__*/React.createElement("textarea", _extends({
      id: name,
      className: "form-control input-light ".concat(errors[name] ? 'is-invalid' : ''),
      placeholder: placeholder,
      rows: rows
    }, register(name, validation), props)), errors[name] && /*#__PURE__*/React.createElement("div", {
      className: "invalid-feedback d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("i", {
      className: "bi bi-exclamation-circle-fill text-danger me-2"
    }), (_errors$name2 = errors[name]) === null || _errors$name2 === void 0 ? void 0 : _errors$name2.message));
  }
};