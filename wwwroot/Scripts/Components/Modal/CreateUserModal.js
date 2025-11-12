"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function CreateUserModal(_ref) {
  var _usuario$roles;
  var show = _ref.show,
    onClose = _ref.onClose,
    onSave = _ref.onSave,
    usuario = _ref.usuario;
  var isEdit = !!usuario;
  var _React$useState = React.useState({
      nombre: (usuario === null || usuario === void 0 ? void 0 : usuario.nombre) || '',
      nombreUsuario: (usuario === null || usuario === void 0 ? void 0 : usuario.nombreUsuario) || '',
      email: (usuario === null || usuario === void 0 ? void 0 : usuario.email) || '',
      password: '',
      rol: (usuario === null || usuario === void 0 || (_usuario$roles = usuario.roles) === null || _usuario$roles === void 0 ? void 0 : _usuario$roles[0]) || 'Usuario',
      activo: (usuario === null || usuario === void 0 ? void 0 : usuario.activo) !== undefined ? usuario.activo : true
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    form = _React$useState2[0],
    setForm = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showPassword = _React$useState4[0],
    setShowPassword = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    loading = _React$useState6[0],
    setLoading = _React$useState6[1];
  var _React$useState7 = React.useState({}),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    errors = _React$useState8[0],
    setErrors = _React$useState8[1];

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
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, null));
      });
    }
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var newErrors, _window$ToastUtils, userData, result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            setLoading(true);
            setErrors({}); // Limpiar errores previos

            // Validaciones
            newErrors = {};
            if (!form.nombre.trim()) {
              newErrors.nombre = 'El nombre es requerido';
            }
            if (!form.nombreUsuario.trim()) {
              newErrors.nombreUsuario = 'El nombre de usuario es requerido';
            }
            if (!form.email.trim()) {
              newErrors.email = 'El email es requerido';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
              newErrors.email = 'El formato del email no es válido';
            }
            if (!isEdit && !form.password.trim()) {
              newErrors.password = 'La contraseña es requerida';
            } else if (form.password.trim() && form.password.length < 6) {
              newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
            }

            // Si hay errores de validación, mostrarlos y detener
            if (!(Object.keys(newErrors).length > 0)) {
              _context.n = 1;
              break;
            }
            setErrors(newErrors);
            (_window$ToastUtils = window.ToastUtils) === null || _window$ToastUtils === void 0 || _window$ToastUtils.warning('Por favor, corrija los errores en el formulario');
            setLoading(false);
            return _context.a(2);
          case 1:
            // Preparar datos para enviar
            userData = {
              nombre: form.nombre,
              nombreUsuario: form.nombreUsuario,
              email: form.email,
              nivel: form.rol === 'Administrador' ? 1 : 2,
              // Asignar nivel según rol
              rol: form.rol,
              activo: form.activo
            }; // Solo incluir password si no es edición o si se proporcionó uno nuevo
            if (!isEdit || form.password.trim()) {
              userData.password = form.password;
            }
            if (!onSave) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return onSave(userData);
          case 2:
            result = _context.v;
            if (!(result && !result.success && result.fieldErrors)) {
              _context.n = 3;
              break;
            }
            setErrors(result.fieldErrors);
            setLoading(false);
            return _context.a(2);
          case 3:
            setLoading(false);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop-custom ".concat(tema === 'dark' ? 'modal-backdrop-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-ventana ".concat(tema === 'dark' ? 'modal-ventana-dark' : '')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "modal-close-btn ".concat(tema === 'dark' ? 'modal-close-btn-dark' : ''),
    onClick: onClose,
    disabled: loading
  }, "\xD7"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "create-user-form ".concat(tema === 'dark' ? 'create-user-form-dark' : '')
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("i", {
    className: "bi ".concat(isEdit ? 'bi-pencil-square' : 'bi-person-plus', " me-2")
  }), isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person me-1"
  }), "Nombre Completo *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "nombre",
    className: "form-control ".concat(errors.nombre ? 'is-invalid' : ''),
    value: form.nombre,
    onChange: handleChange,
    required: true,
    placeholder: "Ej: Juan P\xE9rez",
    disabled: loading
  }), errors.nombre && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.nombre)), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-at me-1"
  }), "Nombre de Usuario *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "nombreUsuario",
    className: "form-control ".concat(errors.nombreUsuario ? 'is-invalid' : ''),
    value: form.nombreUsuario,
    onChange: handleChange,
    required: true,
    placeholder: "Ej: jperez",
    disabled: loading
  }), errors.nombreUsuario && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.nombreUsuario)), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-envelope me-1"
  }), "Email *"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    className: "form-control ".concat(errors.email ? 'is-invalid' : ''),
    value: form.email,
    onChange: handleChange,
    required: true,
    placeholder: "Ej: juan@empresa.com",
    disabled: loading
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-key me-1"
  }), "Contrase\xF1a ", isEdit && '(dejar vacío para mantener la actual)'), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("input", {
    type: showPassword ? "text" : "password",
    name: "password",
    className: "form-control ".concat(errors.password ? 'is-invalid' : ''),
    value: form.password,
    onChange: handleChange,
    required: !isEdit,
    placeholder: isEdit ? "Nueva contraseña" : "Contraseña",
    disabled: loading,
    minLength: 6
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline-secondary",
    type: "button",
    onClick: function onClick() {
      return setShowPassword(!showPassword);
    },
    disabled: loading,
    style: {
      borderColor: tema === 'dark' ? 'rgba(179, 169, 255, 0.3)' : '#d7ceff',
      color: tema === 'dark' ? '#b3a9ff' : '#4361ee',
      background: tema === 'dark' ? 'rgba(76, 127, 255, 0.08)' : '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-eye".concat(showPassword ? '-slash' : '')
  }))), errors.password && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.password), !isEdit && !errors.password && /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, "M\xEDnimo 6 caracteres")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-shield-check me-1"
  }), "Rol *"), /*#__PURE__*/React.createElement("select", {
    name: "rol",
    className: "form-control",
    value: form.rol,
    onChange: handleChange,
    disabled: loading,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "Usuario"
  }, "Usuario"), /*#__PURE__*/React.createElement("option", {
    value: "Administrador"
  }, "Administrador")), /*#__PURE__*/React.createElement("small", {
    className: "text-muted"
  }, form.rol === 'Administrador' ? 'Nivel 1 - Acceso completo' : 'Nivel 2 - Acceso limitado')), /*#__PURE__*/React.createElement("div", {
    className: "form-check form-switch mb-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "activo",
    className: "form-check-input",
    id: "activoCheck",
    checked: form.activo,
    onChange: handleChange,
    disabled: loading
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: "activoCheck"
  }, "Usuario activo")), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn atras-button",
    onClick: onClose,
    disabled: loading
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-circle me-1"
  }), "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn register-button",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "spinner-border spinner-border-sm me-2"
  }), "Guardando...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-check-circle me-1"
  }), isEdit ? 'Guardar Cambios' : 'Crear Usuario'))))));
}
window.CreateUserModal = CreateUserModal;
console.log('✅ CreateUserModal component loaded');