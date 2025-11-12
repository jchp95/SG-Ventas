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
function CreateClienteModal(_ref) {
  var show = _ref.show,
    onClose = _ref.onClose,
    onSave = _ref.onSave,
    cliente = _ref.cliente;
  var isEdit = !!cliente;
  var _React$useState = React.useState({
      nombre: (cliente === null || cliente === void 0 ? void 0 : cliente.fnombre) || '',
      cedulaRnc: (cliente === null || cliente === void 0 ? void 0 : cliente.fcedulaRnc) || '',
      telefono: (cliente === null || cliente === void 0 ? void 0 : cliente.ftelefono) || '',
      celular: (cliente === null || cliente === void 0 ? void 0 : cliente.fcelular) || '',
      direccion: (cliente === null || cliente === void 0 ? void 0 : cliente.fdireccion) || '',
      fechaNacimiento: (cliente === null || cliente === void 0 ? void 0 : cliente.ffechaNacimiento) || '',
      tipoEntidad: (cliente === null || cliente === void 0 ? void 0 : cliente.ftipoEntidad) || 'F',
      // F = Física, J = Jurídica
      calle: (cliente === null || cliente === void 0 ? void 0 : cliente.fcalle) || '',
      limiteCredito: (cliente === null || cliente === void 0 ? void 0 : cliente.flimiteCredito) || 0,
      ubicacionGps: (cliente === null || cliente === void 0 ? void 0 : cliente.fubicaciongps) || '',
      idRuta: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidRuta) || null,
      idEstadoCivil: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidEstadoCivil) || null,
      idSector: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidSector) || null,
      idMunicipio: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidMunicipio) || null,
      idCiudad: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidCiudad) || null,
      idProvincia: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidProvincia) || null,
      idPais: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidPais) || 1,
      idNacionalidad: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidNacionalidad) || 1,
      idTipoCliente: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidTipoCliente) || null,
      idActividadComercial: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidActividadComercial) || null,
      idMoneda: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidMoneda) || null
      // Nota: El campo 'imagen' se maneja por separado en 'imagePreview' y 'handleImageChange'
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    form = _React$useState2[0],
    setForm = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    loading = _React$useState4[0],
    setLoading = _React$useState4[1];
  var _React$useState5 = React.useState({}),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    errors = _React$useState6[0],
    setErrors = _React$useState6[1];
  var _React$useState7 = React.useState((cliente === null || cliente === void 0 ? void 0 : cliente.imagen) || null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    imagePreview = _React$useState8[0],
    setImagePreview = _React$useState8[1];
  var fileInputRef = React.useRef(null);

  // === NUEVO ESTADO PARA LOS PASOS ===
  var _React$useState9 = React.useState(1),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    step = _React$useState0[0],
    setStep = _React$useState0[1];

  // Redux hooks para tema
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;

  // Estados para selects dependientes
  var _React$useState1 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    provinciasFiltradas = _React$useState10[0],
    setProvinciasFiltradas = _React$useState10[1];
  var _React$useState11 = React.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    municipiosFiltrados = _React$useState12[0],
    setMunicipiosFiltrados = _React$useState12[1];
  var _React$useState13 = React.useState([]),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    ciudadesFiltradas = _React$useState14[0],
    setCiudadesFiltradas = _React$useState14[1];
  React.useEffect(function () {
    if (form.idPais) {
      var _window$PROVINCIAS;
      setProvinciasFiltradas(((_window$PROVINCIAS = window.PROVINCIAS) === null || _window$PROVINCIAS === void 0 ? void 0 : _window$PROVINCIAS.filter(function (p) {
        return p.paisId === parseInt(form.idPais);
      })) || []);
    } else {
      setProvinciasFiltradas([]);
    }
  }, [form.idPais]);
  React.useEffect(function () {
    if (form.idProvincia) {
      var _window$MUNICIPIOS;
      setMunicipiosFiltrados(((_window$MUNICIPIOS = window.MUNICIPIOS) === null || _window$MUNICIPIOS === void 0 ? void 0 : _window$MUNICIPIOS.filter(function (m) {
        return m.provinciaId === parseInt(form.idProvincia);
      })) || []);
    } else {
      setMunicipiosFiltrados([]);
    }
  }, [form.idProvincia]);
  React.useEffect(function () {
    if (form.idMunicipio) {
      var _window$CIUDADES;
      setCiudadesFiltradas(((_window$CIUDADES = window.CIUDADES) === null || _window$CIUDADES === void 0 ? void 0 : _window$CIUDADES.filter(function (c) {
        return c.municipioId === parseInt(form.idMunicipio);
      })) || []);
    } else {
      setCiudadesFiltradas([]);
    }
  }, [form.idMunicipio]);
  var handleChange = function handleChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value,
      type = _e$target.type,
      checked = _e$target.checked;
    setForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, type === 'checkbox' ? checked : value));
    });
    if (errors[name]) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, null));
      });
    }
  };
  var handleImageChange = function handleImageChange(e) {
    var file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        var _window$ToastUtils;
        (_window$ToastUtils = window.ToastUtils) === null || _window$ToastUtils === void 0 || _window$ToastUtils.error('Por favor seleccione un archivo de imagen válido');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        var _window$ToastUtils2;
        // 5MB Límite
        (_window$ToastUtils2 = window.ToastUtils) === null || _window$ToastUtils2 === void 0 || _window$ToastUtils2.error('La imagen no puede superar los 5MB');
        return;
      }
      var reader = new FileReader();
      reader.onloadend = function () {
        setImagePreview(reader.result);
        setForm(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            imagen: file
          });
        }); // Guardar el archivo para el submit
      };
      reader.readAsDataURL(file);
    }
  };
  var handleImageClick = function handleImageClick() {
    var _fileInputRef$current;
    (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 || _fileInputRef$current.click();
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var newErrors, _window$ToastUtils3, clienteData, result, fieldErrorKeys;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            e.preventDefault();
            setLoading(true);
            setErrors({});

            // Validaciones (Tu lógica de validación existente)
            newErrors = {};
            if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
            if (form.nombre.length > 50) newErrors.nombre = 'El nombre no puede exceder 50 caracteres';
            if (form.cedulaRnc && form.cedulaRnc.length > 20) newErrors.cedulaRnc = 'La cédula/RNC no puede exceder 20 caracteres';
            if (form.telefono && form.telefono.length > 14) newErrors.telefono = 'El teléfono no puede exceder 14 caracteres';
            if (form.celular && form.celular.length > 14) newErrors.celular = 'El celular no puede exceder 14 caracteres';
            if (form.direccion && form.direccion.length > 400) newErrors.direccion = 'La dirección no puede exceder 400 caracteres';
            if (!(Object.keys(newErrors).length > 0)) {
              _context.n = 1;
              break;
            }
            setErrors(newErrors);
            // Si hay errores en campos de otros pasos, llevar al usuario a ese paso
            if (newErrors.nombre || newErrors.cedulaRnc || newErrors.telefono || newErrors.celular) {
              setStep(1);
            } else if (newErrors.direccion) {
              setStep(2);
            }
            (_window$ToastUtils3 = window.ToastUtils) === null || _window$ToastUtils3 === void 0 || _window$ToastUtils3.warning('Por favor, corrija los errores en el formulario');
            setLoading(false);
            return _context.a(2);
          case 1:
            // Preparar datos para enviar (Tu lógica existente)
            clienteData = {
              nombre: form.nombre,
              cedulaRnc: form.cedulaRnc || null,
              telefono: form.telefono || null,
              celular: form.celular || null,
              direccion: form.direccion || null,
              fechaNacimiento: form.fechaNacimiento || null,
              tipoEntidad: form.tipoEntidad,
              calle: form.calle || null,
              limiteCredito: parseFloat(form.limiteCredito) || 0,
              ubicacionGps: form.ubicacionGps || null,
              idRuta: form.idRuta ? parseInt(form.idRuta) : null,
              idEstadoCivil: form.idEstadoCivil ? parseInt(form.idEstadoCivil) : null,
              idSector: form.idSector ? parseInt(form.idSector) : null,
              idMunicipio: form.idMunicipio ? parseInt(form.idMunicipio) : null,
              idCiudad: form.idCiudad ? parseInt(form.idCiudad) : null,
              idProvincia: form.idProvincia ? parseInt(form.idProvincia) : null,
              idPais: form.idPais ? parseInt(form.idPais) : null,
              idNacionalidad: form.idNacionalidad ? parseInt(form.idNacionalidad) : null,
              idTipoCliente: form.idTipoCliente ? parseInt(form.idTipoCliente) : null,
              idActividadComercial: form.idActividadComercial ? parseInt(form.idActividadComercial) : null,
              idMoneda: form.idMoneda ? parseInt(form.idMoneda) : null
            }; // Aquí también deberías manejar el 'form.imagen' si se subió una nueva
            // y enviarla como FormData o como base64, según espere tu backend.
            // Este ejemplo se enfoca en la lógica de 'onSave' que ya tenías.
            console.log('Datos enviados al backend:', clienteData);
            if (!onSave) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return onSave(clienteData, form.imagen);
          case 2:
            result = _context.v;
            if (!(result && !result.success && result.fieldErrors)) {
              _context.n = 3;
              break;
            }
            setErrors(result.fieldErrors);
            // Detectar en qué paso está el error del servidor
            fieldErrorKeys = Object.keys(result.fieldErrors);
            if (fieldErrorKeys.some(function (key) {
              return ['nombre', 'cedulaRnc', 'telefono', 'celular'].includes(key);
            })) {
              setStep(1);
            } else if (fieldErrorKeys.some(function (key) {
              return ['direccion', 'calle', 'idPais', 'idProvincia'].includes(key);
            })) {
              setStep(2);
            } else {
              setStep(3);
            }
            setLoading(false);
            return _context.a(2);
          case 3:
            setLoading(false);
            // Si todo salió bien, cerramos el modal (onClose ya lo hace el 'onSave' wrapper)
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  // === FUNCIONES DE NAVEGACIÓN ===
  var nextStep = function nextStep() {
    return setStep(function (prev) {
      return Math.min(prev + 1, 3);
    });
  };
  var prevStep = function prevStep() {
    return setStep(function (prev) {
      return Math.max(prev - 1, 1);
    });
  };
  var goToStep = function goToStep(stepNum) {
    return setStep(stepNum);
  };

  // =================================================================
  // === RENDERIZADO DEL COMPONENTE (MODIFICADO) =====================
  // =================================================================
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop-custom ".concat(tema === 'dark' ? 'modal-backdrop-dark' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-ventana modal-ventana-cliente ".concat(tema === 'dark' ? 'modal-ventana-dark' : '')
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
  }), isEdit ? 'Editar Cliente' : 'Crear Nuevo Cliente'), /*#__PURE__*/React.createElement("div", {
    className: "step-progress-bar mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 1 ? 'active' : ''),
    onClick: function onClick() {
      return goToStep(1);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-number"
  }, "1"), "Datos Personales"), /*#__PURE__*/React.createElement("div", {
    className: "step-line ".concat(step > 1 ? 'active' : '')
  }), /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 2 ? 'active' : ''),
    onClick: function onClick() {
      return goToStep(2);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-number"
  }, "2"), "Ubicaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "step-line ".concat(step > 2 ? 'active' : '')
  }), /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 3 ? 'active' : ''),
    onClick: function onClick() {
      return goToStep(3);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-number"
  }, "3"), "Info Adicional")), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-8"
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "form-step-content"
  }, /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-vcard me-2"
  }), "Informaci\xF3n B\xE1sica"), /*#__PURE__*/React.createElement("div", {
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
    disabled: loading,
    maxLength: 50
  }), errors.nombre && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.nombre)), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-card-text me-1"
  }), "C\xE9dula/RNC"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "cedulaRnc",
    className: "form-control ".concat(errors.cedulaRnc ? 'is-invalid' : ''),
    value: form.cedulaRnc,
    onChange: handleChange,
    placeholder: "001-1234567-8",
    disabled: loading,
    maxLength: 20
  }), errors.cedulaRnc && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.cedulaRnc)), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-people me-1"
  }), "Tipo de Entidad *"), /*#__PURE__*/React.createElement("select", {
    name: "tipoEntidad",
    className: "form-control",
    value: form.tipoEntidad,
    onChange: handleChange,
    disabled: loading,
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "F"
  }, "F\xEDsica"), /*#__PURE__*/React.createElement("option", {
    value: "J"
  }, "Jur\xEDdica"))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-calendar me-1"
  }), "Fecha Nacimiento"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "fechaNacimiento",
    className: "form-control",
    value: form.fechaNacimiento,
    onChange: handleChange,
    disabled: loading
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-telephone me-1"
  }), "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "telefono",
    className: "form-control ".concat(errors.telefono ? 'is-invalid' : ''),
    value: form.telefono,
    onChange: handleChange,
    placeholder: "809-555-1234",
    disabled: loading,
    maxLength: 14
  }), errors.telefono && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.telefono)), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-phone me-1"
  }), "Celular"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "celular",
    className: "form-control ".concat(errors.celular ? 'is-invalid' : ''),
    value: form.celular,
    onChange: handleChange,
    placeholder: "829-555-5678",
    disabled: loading,
    maxLength: 14
  }), errors.celular && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.celular))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-heart me-1"
  }), "Estado Civil"), /*#__PURE__*/React.createElement("select", {
    name: "idEstadoCivil",
    className: "form-control",
    value: form.idEstadoCivil || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.ESTADOS_CIVILES && window.ESTADOS_CIVILES.map(function (estado) {
    return /*#__PURE__*/React.createElement("option", {
      key: estado.id,
      value: estado.id
    }, estado.nombre);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-passport me-1"
  }), "Nacionalidad"), /*#__PURE__*/React.createElement("select", {
    name: "idNacionalidad",
    className: "form-control",
    value: form.idNacionalidad || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.NACIONALIDADES && window.NACIONALIDADES.map(function (nacionalidad) {
    return /*#__PURE__*/React.createElement("option", {
      key: nacionalidad.id,
      value: nacionalidad.id
    }, nacionalidad.nombre);
  }))))), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "form-step-content"
  }, /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-geo-alt me-2"
  }), "Direcci\xF3n y Ubicaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-house me-1"
  }), "Direcci\xF3n Completa"), /*#__PURE__*/React.createElement("textarea", {
    name: "direccion",
    className: "form-control ".concat(errors.direccion ? 'is-invalid' : ''),
    value: form.direccion,
    onChange: handleChange,
    placeholder: "Ej: Calle Principal #123",
    disabled: loading,
    rows: 2,
    maxLength: 400
  }), errors.direccion && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), errors.direccion)), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-signpost me-1"
  }), "Calle"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "calle",
    className: "form-control",
    value: form.calle,
    onChange: handleChange,
    placeholder: "Ej: Calle 5",
    disabled: loading,
    maxLength: 50
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-houses me-1"
  }), "Sector"), /*#__PURE__*/React.createElement("select", {
    name: "idSector",
    className: "form-control",
    value: form.idSector || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.SECTORES && window.SECTORES.map(function (sector) {
    return /*#__PURE__*/React.createElement("option", {
      key: sector.id,
      value: sector.id
    }, sector.nombre);
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-pin-map me-1"
  }), "Ubicaci\xF3n GPS"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "ubicacionGps",
    className: "form-control",
    value: form.ubicacionGps,
    onChange: handleChange,
    placeholder: "Ej: 18.4861,-69.9312",
    disabled: loading,
    maxLength: 60
  })), /*#__PURE__*/React.createElement("h5", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-geo me-2"
  }), "Ubicaci\xF3n Geogr\xE1fica"), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-globe me-1"
  }), "Pa\xEDs"), /*#__PURE__*/React.createElement("select", {
    name: "idPais",
    className: "form-control",
    value: form.idPais || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.PAISES && window.PAISES.map(function (pais) {
    return /*#__PURE__*/React.createElement("option", {
      key: pais.id,
      value: pais.id
    }, pais.nombre);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-flag me-1"
  }), "Provincia"), /*#__PURE__*/React.createElement("select", {
    name: "idProvincia",
    className: "form-control",
    value: form.idProvincia || '',
    onChange: handleChange,
    disabled: loading || provinciasFiltradas.length === 0
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), provinciasFiltradas.map(function (provincia) {
    return /*#__PURE__*/React.createElement("option", {
      key: provincia.id,
      value: provincia.id
    }, provincia.nombre);
  })))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-map me-1"
  }), "Municipio"), /*#__PURE__*/React.createElement("select", {
    name: "idMunicipio",
    className: "form-control",
    value: form.idMunicipio || '',
    onChange: handleChange,
    disabled: loading || municipiosFiltrados.length === 0
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), municipiosFiltrados.map(function (municipio) {
    return /*#__PURE__*/React.createElement("option", {
      key: municipio.id,
      value: municipio.id
    }, municipio.nombre);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-building me-1"
  }), "Ciudad"), /*#__PURE__*/React.createElement("select", {
    name: "idCiudad",
    className: "form-control",
    value: form.idCiudad || '',
    onChange: handleChange,
    disabled: loading || ciudadesFiltradas.length === 0
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), ciudadesFiltradas.map(function (ciudad) {
    return /*#__PURE__*/React.createElement("option", {
      key: ciudad.id,
      value: ciudad.id
    }, ciudad.nombre);
  }))))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "form-step-content"
  }, /*#__PURE__*/React.createElement("h5", null, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-info-circle me-2"
  }), "Informaci\xF3n Adicional"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-cash-coin me-1"
  }), "L\xEDmite de Cr\xE9dito"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "limiteCredito",
    className: "form-control",
    value: form.limiteCredito,
    onChange: handleChange,
    placeholder: "0.00",
    disabled: loading,
    step: "0.01",
    min: "0"
  })), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-badge me-1"
  }), "Tipo de Cliente"), /*#__PURE__*/React.createElement("select", {
    name: "idTipoCliente",
    className: "form-control",
    value: form.idTipoCliente || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.TIPOS_CLIENTE && window.TIPOS_CLIENTE.map(function (tipo) {
    return /*#__PURE__*/React.createElement("option", {
      key: tipo.id,
      value: tipo.id
    }, tipo.nombre);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-currency-exchange me-1"
  }), "Moneda"), /*#__PURE__*/React.createElement("select", {
    name: "idMoneda",
    className: "form-control",
    value: form.idMoneda || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.MONEDAS && window.MONEDAS.map(function (moneda) {
    return /*#__PURE__*/React.createElement("option", {
      key: moneda.id,
      value: moneda.id
    }, moneda.nombre, " (", moneda.simbolo, ")");
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-briefcase me-1"
  }), "Actividad Comercial"), /*#__PURE__*/React.createElement("select", {
    name: "idActividadComercial",
    className: "form-control",
    value: form.idActividadComercial || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione"), window.ACTIVIDADES_COMERCIALES && window.ACTIVIDADES_COMERCIALES.map(function (actividad) {
    return /*#__PURE__*/React.createElement("option", {
      key: actividad.id,
      value: actividad.id
    }, actividad.nombre);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-truck me-1"
  }), "Ruta"), /*#__PURE__*/React.createElement("select", {
    name: "idRuta",
    className: "form-control",
    value: form.idRuta || '',
    onChange: handleChange,
    disabled: loading
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccione una ruta"), window.RUTAS && window.RUTAS.map(function (ruta) {
    return /*#__PURE__*/React.createElement("option", {
      key: ruta.id,
      value: ruta.id
    }, ruta.nombre);
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label d-block text-center mb-2"
  }, "Foto del Cliente"), /*#__PURE__*/React.createElement("div", {
    className: "image-upload-container ".concat(tema === 'dark' ? 'image-upload-dark' : ''),
    onClick: handleImageClick,
    style: {
      cursor: 'pointer',
      height: '180px',
      width: '180px',
      margin: '0 auto 1.5rem auto'
    }
  }, imagePreview ? /*#__PURE__*/React.createElement("img", {
    src: imagePreview,
    alt: "Preview",
    className: "image-preview"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "image-placeholder"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-camera-fill"
  }), /*#__PURE__*/React.createElement("p", null, "Subir Foto"))), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "image/*",
    onChange: handleImageChange,
    style: {
      display: 'none'
    },
    disabled: loading
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-summary-sidebar ".concat(tema === 'dark' ? 'form-summary-sidebar-dark' : '')
  }, /*#__PURE__*/React.createElement("h6", {
    className: "text-center"
  }, "Resumen del Cliente"), /*#__PURE__*/React.createElement("div", {
    className: "summary-item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person"
  }), /*#__PURE__*/React.createElement("span", null, form.nombre || 'Nombre no ingresado')), /*#__PURE__*/React.createElement("div", {
    className: "summary-item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-card-text"
  }), /*#__PURE__*/React.createElement("span", null, form.cedulaRnc || 'Cédula/RNC no ingresada')), /*#__PURE__*/React.createElement("div", {
    className: "summary-item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-phone"
  }), /*#__PURE__*/React.createElement("span", null, form.celular || 'Celular no ingresado')), /*#__PURE__*/React.createElement("div", {
    className: "summary-item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-house"
  }), /*#__PURE__*/React.createElement("span", null, form.direccion || 'Dirección no ingresada')), /*#__PURE__*/React.createElement("div", {
    className: "summary-item"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-cash-coin"
  }), /*#__PURE__*/React.createElement("span", null, "L\xEDmite Cr\xE9dito: ", form.limiteCredito || '0.00'))))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between align-items-center gap-2 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn atras-button",
    onClick: onClose,
    disabled: loading
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-x-circle me-1"
  }), "Cancelar"), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end gap-2"
  }, step > 1 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn atras-button",
    onClick: prevStep,
    disabled: loading
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-left-circle me-1"
  }), "Atr\xE1s"), step < 3 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn register-button",
    onClick: nextStep,
    disabled: loading
  }, "Siguiente", /*#__PURE__*/React.createElement("i", {
    className: "bi bi-arrow-right-circle ms-1"
  })), step === 3 && /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn register-button",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "spinner-border spinner-border-sm me-2"
  }), "Guardando...") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-check-circle me-1"
  }), isEdit ? 'Guardar Cambios' : 'Crear Cliente')))))));
}
window.CreateClienteModal = CreateClienteModal;
console.log('✅ CreateClienteModal component (Multi-Step) loaded');