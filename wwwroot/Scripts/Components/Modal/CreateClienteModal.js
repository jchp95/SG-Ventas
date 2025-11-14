"use strict";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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

  // React Hook Form configurado con util global
  var _window$HookFormUtils = window.HookFormUtils.useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        nombre: (cliente === null || cliente === void 0 ? void 0 : cliente.fnombre) || '',
        cedulaRnc: (cliente === null || cliente === void 0 ? void 0 : cliente.fcedulaRnc) || '',
        telefono: (cliente === null || cliente === void 0 ? void 0 : cliente.ftelefono) || '',
        celular: (cliente === null || cliente === void 0 ? void 0 : cliente.fcelular) || '',
        direccion: (cliente === null || cliente === void 0 ? void 0 : cliente.fdireccion) || '',
        fechaNacimiento: (cliente === null || cliente === void 0 ? void 0 : cliente.ffechaNacimiento) || '',
        tipoEntidad: (cliente === null || cliente === void 0 ? void 0 : cliente.ftipoEntidad) || 'F',
        calle: (cliente === null || cliente === void 0 ? void 0 : cliente.fcalle) || '',
        limiteCredito: (cliente === null || cliente === void 0 ? void 0 : cliente.flimiteCredito) || 0,
        ubicacionGps: (cliente === null || cliente === void 0 ? void 0 : cliente.fubicaciongps) || '',
        idRuta: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidRuta) || '',
        idEstadoCivil: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidEstadoCivil) || '',
        idSector: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidSector) || '',
        idMunicipio: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidMunicipio) || '',
        idCiudad: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidCiudad) || '',
        idProvincia: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidProvincia) || '',
        idPais: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidPais) || 1,
        idNacionalidad: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidNacionalidad) || 1,
        idTipoCliente: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidTipoCliente) || '',
        idActividadComercial: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidActividadComercial) || '',
        idMoneda: (cliente === null || cliente === void 0 ? void 0 : cliente.fkidMoneda) || '',
        imagen: null
      }
    }),
    register = _window$HookFormUtils.register,
    handleSubmit = _window$HookFormUtils.handleSubmit,
    errors = _window$HookFormUtils.formState.errors,
    trigger = _window$HookFormUtils.trigger,
    watch = _window$HookFormUtils.watch,
    setValue = _window$HookFormUtils.setValue;
  var form = watch();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    loading = _React$useState2[0],
    setLoading = _React$useState2[1];
  var _React$useState3 = React.useState({}),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    serverErrors = _React$useState4[0],
    setServerErrors = _React$useState4[1];
  var _React$useState5 = React.useState((cliente === null || cliente === void 0 ? void 0 : cliente.imagen) || null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    imagePreview = _React$useState6[0],
    setImagePreview = _React$useState6[1];
  var fileInputRef = React.useRef(null);
  var _React$useState7 = React.useState(1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    step = _React$useState8[0],
    setStep = _React$useState8[1];
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    tema = _window$ReduxProvider.tema;
  var _React$useState9 = React.useState([]),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    provinciasFiltradas = _React$useState0[0],
    setProvinciasFiltradas = _React$useState0[1];
  var _React$useState1 = React.useState([]),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    municipiosFiltrados = _React$useState10[0],
    setMunicipiosFiltrados = _React$useState10[1];
  var _React$useState11 = React.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    ciudadesFiltradas = _React$useState12[0],
    setCiudadesFiltradas = _React$useState12[1];

  // Helper para obtener error combinando RHF + servidor
  var getError = function getError(field) {
    var _errors$field;
    if ((_errors$field = errors[field]) !== null && _errors$field !== void 0 && _errors$field.message) return errors[field].message;
    if (serverErrors[field]) return serverErrors[field];
    return null;
  };
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
        setValue('imagen', file);
      };
      reader.readAsDataURL(file);
    }
  };
  var handleImageClick = function handleImageClick() {
    var _fileInputRef$current;
    (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 || _fileInputRef$current.click();
  };

  // Campos por paso para validación al avanzar
  var stepFieldGroups = {
    1: ['nombre', 'cedulaRnc', 'telefono', 'celular', 'tipoEntidad', 'fechaNacimiento'],
    2: ['direccion', 'calle', 'idSector', 'idPais', 'idProvincia', 'idMunicipio', 'idCiudad', 'ubicacionGps'],
    3: ['limiteCredito', 'idTipoCliente', 'idMoneda', 'idActividadComercial', 'idRuta']
  };
  var validateCurrentStep = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var fields, isValid, _window$ToastUtils3;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            fields = stepFieldGroups[step] || [];
            if (!(fields.length === 0)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, true);
          case 1:
            _context.n = 2;
            return trigger(fields);
          case 2:
            isValid = _context.v;
            if (!isValid) {
              (_window$ToastUtils3 = window.ToastUtils) === null || _window$ToastUtils3 === void 0 || _window$ToastUtils3.warning('Por favor, corrija los errores antes de continuar');
            }
            return _context.a(2, isValid);
        }
      }, _callee);
    }));
    return function validateCurrentStep() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleNextStep = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var ok;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return validateCurrentStep();
          case 1:
            ok = _context2.v;
            if (ok) {
              setStep(function (prev) {
                return Math.min(prev + 1, 3);
              });
            }
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function handleNextStep() {
      return _ref3.apply(this, arguments);
    };
  }();
  var prevStep = function prevStep() {
    return setStep(function (prev) {
      return Math.max(prev - 1, 1);
    });
  };
  var handleGoToStep = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(targetStep) {
      var tmpStep, fields, ok, _window$ToastUtils4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(targetStep === step)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            if (!(targetStep < step)) {
              _context3.n = 2;
              break;
            }
            setStep(targetStep);
            return _context3.a(2);
          case 2:
            // Ir hacia adelante: validar pasos intermedios
            tmpStep = step;
          case 3:
            if (!(tmpStep < targetStep)) {
              _context3.n = 6;
              break;
            }
            fields = stepFieldGroups[tmpStep] || [];
            if (!(fields.length > 0)) {
              _context3.n = 5;
              break;
            }
            _context3.n = 4;
            return trigger(fields);
          case 4:
            ok = _context3.v;
            if (ok) {
              _context3.n = 5;
              break;
            }
            setStep(tmpStep);
            (_window$ToastUtils4 = window.ToastUtils) === null || _window$ToastUtils4 === void 0 || _window$ToastUtils4.warning('Por favor, corrija los errores antes de continuar');
            return _context3.a(2);
          case 5:
            tmpStep++;
            _context3.n = 3;
            break;
          case 6:
            setStep(targetStep);
          case 7:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleGoToStep(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  // Envío del formulario (solo se dispara si TODO es válido según RHF)
  var onSubmitForm = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(data) {
      var _window$RUTAS, _window$ESTADOS_CIVIL, _window$SECTORES, _window$MUNICIPIOS2, _window$CIUDADES2, _window$PROVINCIAS2, _window$PAISES, _window$NACIONALIDADE, _window$TIPOS_CLIENTE, _window$ACTIVIDADES_C, _window$MONEDAS, formData, rutaSeleccionada, estadoCivilSel, sectorSel, municipioSel, ciudadSel, provinciaSel, paisSel, nacionalidadSel, tipoClienteSel, actividadSel, monedaSel, result, fieldErrorKeys, _t;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            setLoading(true);
            setServerErrors({});
            formData = new FormData(); // Campos simples
            formData.append('Nombre', data.nombre);
            formData.append('CedulaRnc', data.cedulaRnc || '');
            formData.append('Telefono', data.telefono || '');
            formData.append('Celular', data.celular || '');
            formData.append('Direccion', data.direccion || '');
            formData.append('FechaNacimiento', data.fechaNacimiento || '');
            formData.append('TipoEntidad', data.tipoEntidad);
            formData.append('Calle', data.calle || '');
            formData.append('LimiteCredito', parseFloat(data.limiteCredito || 0) || 0);
            formData.append('UbicacionGps', data.ubicacionGps || '');

            // Nombres relacionados (para crear si no existe)
            rutaSeleccionada = (_window$RUTAS = window.RUTAS) === null || _window$RUTAS === void 0 ? void 0 : _window$RUTAS.find(function (r) {
              return r.id == data.idRuta;
            });
            formData.append('Ruta', (rutaSeleccionada === null || rutaSeleccionada === void 0 ? void 0 : rutaSeleccionada.nombre) || '');
            estadoCivilSel = (_window$ESTADOS_CIVIL = window.ESTADOS_CIVILES) === null || _window$ESTADOS_CIVIL === void 0 ? void 0 : _window$ESTADOS_CIVIL.find(function (e) {
              return e.id == data.idEstadoCivil;
            });
            formData.append('EstadoCivil', (estadoCivilSel === null || estadoCivilSel === void 0 ? void 0 : estadoCivilSel.nombre) || '');
            sectorSel = (_window$SECTORES = window.SECTORES) === null || _window$SECTORES === void 0 ? void 0 : _window$SECTORES.find(function (s) {
              return s.id == data.idSector;
            });
            formData.append('Sector', (sectorSel === null || sectorSel === void 0 ? void 0 : sectorSel.nombre) || '');
            municipioSel = (_window$MUNICIPIOS2 = window.MUNICIPIOS) === null || _window$MUNICIPIOS2 === void 0 ? void 0 : _window$MUNICIPIOS2.find(function (m) {
              return m.id == data.idMunicipio;
            });
            formData.append('Municipio', (municipioSel === null || municipioSel === void 0 ? void 0 : municipioSel.nombre) || '');
            ciudadSel = (_window$CIUDADES2 = window.CIUDADES) === null || _window$CIUDADES2 === void 0 ? void 0 : _window$CIUDADES2.find(function (c) {
              return c.id == data.idCiudad;
            });
            formData.append('Ciudad', (ciudadSel === null || ciudadSel === void 0 ? void 0 : ciudadSel.nombre) || '');
            provinciaSel = (_window$PROVINCIAS2 = window.PROVINCIAS) === null || _window$PROVINCIAS2 === void 0 ? void 0 : _window$PROVINCIAS2.find(function (p) {
              return p.id == data.idProvincia;
            });
            formData.append('Provincia', (provinciaSel === null || provinciaSel === void 0 ? void 0 : provinciaSel.nombre) || '');
            paisSel = (_window$PAISES = window.PAISES) === null || _window$PAISES === void 0 ? void 0 : _window$PAISES.find(function (p) {
              return p.id == data.idPais;
            });
            formData.append('Pais', (paisSel === null || paisSel === void 0 ? void 0 : paisSel.nombre) || '');
            nacionalidadSel = (_window$NACIONALIDADE = window.NACIONALIDADES) === null || _window$NACIONALIDADE === void 0 ? void 0 : _window$NACIONALIDADE.find(function (n) {
              return n.id == data.idNacionalidad;
            });
            formData.append('Nacionalidad', (nacionalidadSel === null || nacionalidadSel === void 0 ? void 0 : nacionalidadSel.nombre) || '');
            tipoClienteSel = (_window$TIPOS_CLIENTE = window.TIPOS_CLIENTE) === null || _window$TIPOS_CLIENTE === void 0 ? void 0 : _window$TIPOS_CLIENTE.find(function (t) {
              return t.id == data.idTipoCliente;
            });
            formData.append('TipoCliente', (tipoClienteSel === null || tipoClienteSel === void 0 ? void 0 : tipoClienteSel.nombre) || '');
            actividadSel = (_window$ACTIVIDADES_C = window.ACTIVIDADES_COMERCIALES) === null || _window$ACTIVIDADES_C === void 0 ? void 0 : _window$ACTIVIDADES_C.find(function (a) {
              return a.id == data.idActividadComercial;
            });
            formData.append('ActividadComercial', (actividadSel === null || actividadSel === void 0 ? void 0 : actividadSel.nombre) || '');
            monedaSel = (_window$MONEDAS = window.MONEDAS) === null || _window$MONEDAS === void 0 ? void 0 : _window$MONEDAS.find(function (m) {
              return m.id == data.idMoneda;
            });
            formData.append('Moneda', (monedaSel === null || monedaSel === void 0 ? void 0 : monedaSel.nombre) || '');

            // IDs relacionados (el backend los acepta y prioriza)
            formData.append('IdRuta', data.idRuta ? parseInt(data.idRuta) : 0);
            formData.append('IdEstadoCivil', data.idEstadoCivil ? parseInt(data.idEstadoCivil) : 0);
            formData.append('IdSector', data.idSector ? parseInt(data.idSector) : 0);
            formData.append('IdMunicipio', data.idMunicipio ? parseInt(data.idMunicipio) : 0);
            formData.append('IdCiudad', data.idCiudad ? parseInt(data.idCiudad) : 0);
            formData.append('IdProvincia', data.idProvincia ? parseInt(data.idProvincia) : 0);
            formData.append('IdPais', data.idPais ? parseInt(data.idPais) : 0);
            formData.append('IdNacionalidad', data.idNacionalidad ? parseInt(data.idNacionalidad) : 0);
            formData.append('IdTipoCliente', data.idTipoCliente ? parseInt(data.idTipoCliente) : 0);
            formData.append('IdActividadComercial', data.idActividadComercial ? parseInt(data.idActividadComercial) : 0);
            formData.append('IdMoneda', data.idMoneda ? parseInt(data.idMoneda) : 0);

            // Imagen
            if (data.imagen) {
              formData.append('Imagen', data.imagen);
            }
            console.log('Datos enviados al backend (FormData):', formData);
            if (!onSave) {
              _context4.n = 2;
              break;
            }
            _context4.n = 1;
            return onSave(formData);
          case 1:
            result = _context4.v;
            if (!(result && !result.success && result.fieldErrors)) {
              _context4.n = 2;
              break;
            }
            setServerErrors(result.fieldErrors);
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
            return _context4.a(2);
          case 2:
            setLoading(false);
            // El cierre del modal lo maneja quien llama (onSave wrapper)
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t = _context4.v;
            console.error(_t);
            setLoading(false);
          case 4:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 3]]);
    }));
    return function onSubmitForm(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();

  // Manejo cuando hay errores de validación de RHF al enviar
  var onInvalid = function onInvalid(formErrors) {
    var _window$ToastUtils5;
    var fieldErrorKeys = Object.keys(formErrors);
    if (fieldErrorKeys.length === 0) return;
    if (fieldErrorKeys.some(function (key) {
      return ['nombre', 'cedulaRnc', 'telefono', 'celular', 'tipoEntidad', 'fechaNacimiento', 'idEstadoCivil', 'idNacionalidad'].includes(key);
    })) {
      setStep(1);
    } else if (fieldErrorKeys.some(function (key) {
      return ['direccion', 'calle', 'idSector', 'idPais', 'idProvincia', 'idMunicipio', 'idCiudad', 'ubicacionGps'].includes(key);
    })) {
      setStep(2);
    } else {
      setStep(3);
    }
    (_window$ToastUtils5 = window.ToastUtils) === null || _window$ToastUtils5 === void 0 || _window$ToastUtils5.warning('Por favor, corrija los errores en el formulario');
  };
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
    onSubmit: handleSubmit(onSubmitForm, onInvalid),
    className: "create-user-form ".concat(tema === 'dark' ? 'create-user-form-dark' : '')
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement("i", {
    className: "bi ".concat(isEdit ? 'bi-pencil-square' : 'bi-person-plus', " me-2")
  }), isEdit ? 'Editar Cliente' : 'Crear Nuevo Cliente'), /*#__PURE__*/React.createElement("div", {
    className: "step-progress-bar mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 1 ? 'active' : ''),
    onClick: function onClick() {
      return handleGoToStep(1);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-number"
  }, "1"), "Datos Personales"), /*#__PURE__*/React.createElement("div", {
    className: "step-line ".concat(step > 1 ? 'active' : '')
  }), /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 2 ? 'active' : ''),
    onClick: function onClick() {
      return handleGoToStep(2);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "step-number"
  }, "2"), "Ubicaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "step-line ".concat(step > 2 ? 'active' : '')
  }), /*#__PURE__*/React.createElement("div", {
    className: "step ".concat(step >= 3 ? 'active' : ''),
    onClick: function onClick() {
      return handleGoToStep(3);
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
  }), "Nombre Completo *"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control ".concat(getError('nombre') ? 'is-invalid' : ''),
    placeholder: "Ej: Juan P\xE9rez",
    disabled: loading,
    maxLength: 50
  }, register('nombre', {
    required: 'El nombre es requerido',
    maxLength: {
      value: 50,
      message: 'El nombre no puede exceder 50 caracteres'
    }
  }))), getError('nombre') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('nombre'))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-card-text me-1"
  }), "C\xE9dula/RNC"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control ".concat(getError('cedulaRnc') ? 'is-invalid' : ''),
    placeholder: "001-1234567-8",
    disabled: loading,
    maxLength: 20
  }, register('cedulaRnc', {
    maxLength: {
      value: 20,
      message: 'La cédula/RNC no puede exceder 20 caracteres'
    }
  }))), getError('cedulaRnc') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('cedulaRnc'))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-people me-1"
  }), "Tipo de Entidad *"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('tipoEntidad', {
    required: 'El tipo de entidad es requerido'
  })), /*#__PURE__*/React.createElement("option", {
    value: "F"
  }, "F\xEDsica"), /*#__PURE__*/React.createElement("option", {
    value: "J"
  }, "Jur\xEDdica")), getError('tipoEntidad') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('tipoEntidad'))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-calendar me-1"
  }), "Fecha Nacimiento"), /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    className: "form-control",
    disabled: loading
  }, register('fechaNacimiento'))))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-telephone me-1"
  }), "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control ".concat(getError('telefono') ? 'is-invalid' : ''),
    placeholder: "809-555-1234",
    disabled: loading,
    maxLength: 14
  }, register('telefono', {
    maxLength: {
      value: 14,
      message: 'El teléfono no puede exceder 14 caracteres'
    }
  }))), getError('telefono') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('telefono'))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-phone me-1"
  }), "Celular"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control ".concat(getError('celular') ? 'is-invalid' : ''),
    placeholder: "829-555-5678",
    disabled: loading,
    maxLength: 14
  }, register('celular', {
    maxLength: {
      value: 14,
      message: 'El celular no puede exceder 14 caracteres'
    }
  }))), getError('celular') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('celular')))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-heart me-1"
  }), "Estado Civil"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idEstadoCivil')), /*#__PURE__*/React.createElement("option", {
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
  }), "Nacionalidad"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idNacionalidad')), /*#__PURE__*/React.createElement("option", {
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
  }), "Direcci\xF3n Completa"), /*#__PURE__*/React.createElement("textarea", _extends({
    className: "form-control ".concat(getError('direccion') ? 'is-invalid' : ''),
    placeholder: "Ej: Calle Principal #123",
    disabled: loading,
    rows: 2,
    maxLength: 400
  }, register('direccion', {
    maxLength: {
      value: 400,
      message: 'La dirección no puede exceder 400 caracteres'
    }
  }))), getError('direccion') && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback d-block"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-exclamation-circle me-1"
  }), getError('direccion'))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-signpost me-1"
  }), "Calle"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control",
    placeholder: "Ej: Calle 5",
    disabled: loading,
    maxLength: 50
  }, register('calle')))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-houses me-1"
  }), "Sector"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idSector')), /*#__PURE__*/React.createElement("option", {
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
  }), "Ubicaci\xF3n GPS"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control",
    placeholder: "Ej: 18.4861,-69.9312",
    disabled: loading,
    maxLength: 60
  }, register('ubicacionGps')))), /*#__PURE__*/React.createElement("h5", {
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
  }), "Pa\xEDs"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idPais')), /*#__PURE__*/React.createElement("option", {
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
  }), "Provincia"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading || provinciasFiltradas.length === 0
  }, register('idProvincia')), /*#__PURE__*/React.createElement("option", {
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
  }), "Municipio"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading || municipiosFiltrados.length === 0
  }, register('idMunicipio')), /*#__PURE__*/React.createElement("option", {
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
  }), "Ciudad"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading || ciudadesFiltradas.length === 0
  }, register('idCiudad')), /*#__PURE__*/React.createElement("option", {
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
  }), "L\xEDmite de Cr\xE9dito"), /*#__PURE__*/React.createElement("input", _extends({
    type: "number",
    className: "form-control",
    placeholder: "0.00",
    disabled: loading,
    step: "0.01",
    min: "0"
  }, register('limiteCredito')))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-person-badge me-1"
  }), "Tipo de Cliente"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idTipoCliente')), /*#__PURE__*/React.createElement("option", {
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
  }), "Moneda"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idMoneda')), /*#__PURE__*/React.createElement("option", {
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
  }), "Actividad Comercial"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idActividadComercial')), /*#__PURE__*/React.createElement("option", {
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
  }), "Ruta"), /*#__PURE__*/React.createElement("select", _extends({
    className: "form-control",
    disabled: loading
  }, register('idRuta')), /*#__PURE__*/React.createElement("option", {
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
    onClick: handleNextStep,
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