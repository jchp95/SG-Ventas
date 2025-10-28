"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* jshint ignore:start */

/* global React, ReactDOM, App */

function Settings() {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;
  var useHistory = window.ReactRouterDOM.useHistory;
  var history = useHistory();

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;

  // React Hook Form para settings
  var _window$HookFormUtils = window.HookFormUtils.useForm({
      mode: 'onChange'
    }),
    register = _window$HookFormUtils.register,
    handleSubmit = _window$HookFormUtils.handleSubmit,
    errors = _window$HookFormUtils.formState.errors,
    setValue = _window$HookFormUtils.setValue,
    watch = _window$HookFormUtils.watch,
    trigger = _window$HookFormUtils.trigger;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    logoFile = _useState4[0],
    setLogoFile = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    fondoFile = _useState6[0],
    setFondoFile = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    qrWebFile = _useState8[0],
    setQrWebFile = _useState8[1];
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    qrRedesFile = _useState0[0],
    setQrRedesFile = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    message = _useState10[0],
    setMessage = _useState10[1];
  var _useState11 = useState('scale-fade-in'),
    _useState12 = _slicedToArray(_useState11, 2),
    transition = _useState12[0],
    setTransition = _useState12[1];

  // Watch para valores del formulario
  var watchNombreComercial = watch("fnombreComercial");
  var watchSlogan = watch("festlogan");
  function handleFileChange(e, fileType) {
    var file = e.target.files[0];
    if (!file) return;
    var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showAlert('error', 'Solo se permiten archivos de imagen: JPG, PNG, GIF, WEBP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showAlert('error', "El archivo es demasiado grande (".concat((file.size / 1024 / 1024).toFixed(1), "MB). El tama\xF1o m\xE1ximo permitido es 5MB."));
      return;
    }
    switch (fileType) {
      case 'logo':
        setLogoFile(file);
        break;
      case 'fondo':
        setFondoFile(file);
        break;
      case 'qrWeb':
        setQrWebFile(file);
        break;
      case 'qrRedes':
        setQrRedesFile(file);
        break;
    }
  }
  function showAlert(type, text) {
    setMessage({
      type: type,
      text: text
    });
    setTimeout(function () {
      return setMessage(null);
    }, 5000);
  }
  function formatPhone(value) {
    var v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 1) v = '(' + v;
    if (v.length >= 4) v = v.slice(0, 4) + ')-' + v.slice(4);
    if (v.length >= 9) v = v.slice(0, 9) + '-' + v.slice(9);
    return v;
  }
  var handlePhoneInput = function handlePhoneInput(e) {
    var value = e.target.value;
    var formatted = formatPhone(value);
    e.target.value = formatted;
    setValue("ftelefonos", formatted, {
      shouldValidate: true
    });
  };

  // Enviar formulario con React Hook Form
  var onSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
      var isValid, formData;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return trigger();
          case 1:
            isValid = _context.v;
            if (isValid) {
              _context.n = 2;
              break;
            }
            showAlert('error', 'Por favor corrige los errores en el formulario antes de continuar.');
            return _context.a(2);
          case 2:
            setLoading(true);
            setMessage(null);
            formData = _objectSpread(_objectSpread({}, data), {}, {
              logoFile: logoFile,
              fondoFile: fondoFile,
              qrWebFile: qrWebFile,
              qrRedesFile: qrRedesFile
            });
            console.log('Datos para enviar:', formData);
            setTimeout(function () {
              setLoading(false);
              showAlert('success', 'La configuración de la empresa ha sido guardada exitosamente.');
              setLogoFile(null);
              setFondoFile(null);
              setQrWebFile(null);
              setQrRedesFile(null);
              ['logo', 'fondo', 'qrWeb', 'qrRedes'].forEach(function (type) {
                var input = document.getElementById("".concat(type, "-upload"));
                if (input) input.value = '';
              });
            }, 1500);
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  function renderFileUploadField(fileType, label) {
    var accept = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "image/*";
    var files = {
      'logo': logoFile,
      'fondo': fondoFile,
      'qrWeb': qrWebFile,
      'qrRedes': qrRedesFile
    };
    var file = files[fileType];
    var hasFile = !!file;
    var handleChangeFile = function handleChangeFile() {
      var fileInput = document.getElementById("".concat(fileType, "-upload"));
      if (fileInput) {
        fileInput.click();
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "file-upload-container"
    }, /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: accept,
      onChange: function onChange(e) {
        return handleFileChange(e, fileType);
      },
      className: "settings-file-input",
      id: "".concat(fileType, "-upload"),
      style: {
        display: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "file-upload-label",
      onClick: !hasFile ? handleChangeFile : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-upload-content ".concat(hasFile ? 'has-file' : '')
    }, hasFile ? /*#__PURE__*/React.createElement("div", {
      className: "file-preview"
    }, /*#__PURE__*/React.createElement("div", {
      className: "file-info"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-muted"
    }, file.name), /*#__PURE__*/React.createElement("div", {
      className: "mt-1"
    }, /*#__PURE__*/React.createElement("small", {
      className: "text-success"
    }, "\u2713 Archivo seleccionado"))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "register-button mt-2",
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        handleChangeFile();
      }
    }, "Cambiar")) : /*#__PURE__*/React.createElement("div", {
      className: "file-placeholder"
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF7 Seleccionar ", label), /*#__PURE__*/React.createElement("small", null, "JPG, PNG, GIF hasta 5MB"))))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-container d-flex justify-content-center align-items-center position-relative ".concat(tema === 'dark' ? 'theme-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center w-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-lg-11"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card shadow-sm settings-card glassmorphism-effect ".concat(transition)
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body d-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-inner-container w-100"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "card-title d-flex justify-content-center gradient-texts"
  }, "Configuraci\xF3n de la Empresa"), /*#__PURE__*/React.createElement("p", {
    className: "text-muted text-center mb-4"
  }, "Administra la informaci\xF3n b\xE1sica de tu empresa"), message && /*#__PURE__*/React.createElement("div", {
    className: "alert ".concat(message.type === 'success' ? 'alert-success' : 'alert-danger', " register-alert")
  }, message.text), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDCCB Informaci\xF3n Legal"), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "RNC",
    name: "frnc",
    type: "text",
    register: register,
    errors: errors,
    validation: {
      required: 'El RNC es requerido',
      pattern: {
        value: /^\d{9}$|^\d{11}$/,
        message: 'El RNC debe tener 9 o 11 dígitos'
      }
    },
    placeholder: "00000000000"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Nombre Comercial",
    name: "fnombreComercial",
    type: "text",
    register: register,
    errors: errors,
    validation: {
      required: 'El nombre comercial es requerido'
    },
    placeholder: "Nombre comercial de la empresa"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Raz\xF3n Social",
    name: "frazonSocial",
    type: "text",
    register: register,
    placeholder: "Raz\xF3n social (opcional)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDCDE Informaci\xF3n de Contacto"), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Email",
    name: "femail",
    type: "email",
    register: register,
    errors: errors,
    validation: {
      required: 'El email es obligatorio',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ingrese un email válido'
      }
    },
    placeholder: "empresa@ejemplo.com"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control input-light ".concat(errors.ftelefonos ? 'is-invalid' : ''),
    placeholder: "(000)-000-0000",
    maxLength: 14,
    onInput: handlePhoneInput
  }, register("ftelefonos", {
    required: 'El teléfono es requerido'
  }))), errors.ftelefonos && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle-fill text-danger me-2"
  }), errors.ftelefonos.message)), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Direcci\xF3n",
    name: "fdireccion",
    type: "text",
    register: register,
    errors: errors,
    validation: {
      required: 'La dirección es requerida'
    },
    placeholder: "Direcci\xF3n completa"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Municipio",
    name: "fmunicipio",
    type: "text",
    register: register,
    placeholder: "Municipio"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Provincia",
    name: "fprovincia",
    type: "text",
    register: register,
    placeholder: "Provincia"
  })), /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDDBC\uFE0F Archivos"), renderFileUploadField('logo', 'Logo de la Empresa'), renderFileUploadField('fondo', 'Imagen de Fondo'), renderFileUploadField('qrWeb', 'Código QR Web'), renderFileUploadField('qrRedes', 'Código QR Redes'))), /*#__PURE__*/React.createElement("div", {
    className: "settings-actions d-flex gap-2 justify-content-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "atras-button",
    onClick: function onClick() {
      return history.push('/home');
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: loading
  }, loading ? 'Guardando...' : 'Guardar Configuración'))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-inner-container w-100 h-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-section h-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDCDD Informaci\xF3n Adicional"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Slogan"), /*#__PURE__*/React.createElement("textarea", _extends({
    className: "form-control input-light",
    placeholder: "Slogan de la empresa",
    rows: "2"
  }, register("festlogan")))), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "C\xF3digo Municipio",
    name: "fcodMunicipio",
    type: "text",
    register: register,
    placeholder: "000000"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "C\xF3digo Provincia",
    name: "fcodProvincia",
    type: "text",
    register: register,
    placeholder: "000000"
  })), /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDD10 Certificados y Seguridad"), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Contrase\xF1a",
    name: "fcontrasena",
    type: "password",
    register: register,
    errors: errors,
    validation: {
      required: 'La contraseña es requerida'
    },
    placeholder: "********"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Nombre Certificado",
    name: "fnombreCertificado",
    type: "text",
    register: register,
    placeholder: "Nombre del certificado"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Ruta Certificado",
    name: "frutaCertificado",
    type: "text",
    register: register,
    placeholder: "ruta/del/certificado"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Password Certificado",
    name: "fpasswordCertificado",
    type: "password",
    register: register,
    placeholder: "********"
  })), /*#__PURE__*/React.createElement("div", {
    className: "settings-section mb-4"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDCC1 Configuraci\xF3n de Rutas"), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Ruta XML",
    name: "frutaXml",
    type: "text",
    register: register,
    placeholder: "ruta/xml"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Ruta XML Firmado",
    name: "frutaXmlFirmado",
    type: "text",
    register: register,
    placeholder: "ruta/xml/firmado"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Ruta Semilla",
    name: "frutaSemilla",
    type: "text",
    register: register,
    placeholder: "ruta/semilla"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Ruta Semilla Firmado",
    name: "frutaSemillaFirmado",
    type: "text",
    register: register,
    placeholder: "ruta/semilla/firmado"
  })), /*#__PURE__*/React.createElement("div", {
    className: "preview-section mt-4 p-3 rounded"
  }, /*#__PURE__*/React.createElement("h6", {
    className: "section-title mb-3"
  }, "\uD83D\uDC41\uFE0F Vista Previa"), /*#__PURE__*/React.createElement("div", {
    className: "preview-content text-center"
  }, logoFile ? /*#__PURE__*/React.createElement("div", {
    className: "preview-image-container mb-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: URL.createObjectURL(logoFile),
    alt: "Vista previa logo",
    className: "preview-image rounded",
    style: {
      maxWidth: '120px',
      maxHeight: '120px'
    }
  })) : /*#__PURE__*/React.createElement("div", {
    className: "preview-placeholder mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-muted"
  }, "Logo aparecer\xE1 aqu\xED")), watchNombreComercial && /*#__PURE__*/React.createElement("h5", {
    className: "preview-site-name"
  }, watchNombreComercial), watchSlogan && /*#__PURE__*/React.createElement("p", {
    className: "preview-description text-muted"
  }, watchSlogan))))))))))));
}
window.Settings = Settings;

/* jshint ignore:end */