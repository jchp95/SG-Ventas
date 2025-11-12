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

function Register() {
  var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;
  var useHistory = window.ReactRouterDOM.useHistory;
  var history = useHistory();

  /// Redux hooks
  var useAuth = window.ReduxProvider.useAuth;
  var _useAuth = useAuth(),
    isAuthenticated = _useAuth.isAuthenticated,
    authLoading = _useAuth.loading,
    authError = _useAuth.error,
    authMessage = _useAuth.message,
    login = _useAuth.login,
    register = _useAuth.register,
    clearError = _useAuth.clearError;

  /// React Hook Form SEPARADO para cada step
  var _window$HookFormUtils = window.HookFormUtils.useForm({
      mode: 'onChange'
    }),
    userRegister = _window$HookFormUtils.register,
    handleUserSubmit = _window$HookFormUtils.handleSubmit,
    userErrors = _window$HookFormUtils.formState.errors,
    triggerUser = _window$HookFormUtils.trigger,
    watchUser = _window$HookFormUtils.watch;
  var _window$HookFormUtils2 = window.HookFormUtils.useForm({
      mode: 'onChange'
    }),
    companyRegister = _window$HookFormUtils2.register,
    handleCompanySubmit = _window$HookFormUtils2.handleSubmit,
    companyErrors = _window$HookFormUtils2.formState.errors,
    triggerCompany = _window$HookFormUtils2.trigger;

  // React Hook Form para login
  var _window$HookFormUtils3 = window.HookFormUtils.useForm({
      mode: 'onChange'
    }),
    loginRegister = _window$HookFormUtils3.register,
    handleLoginSubmit = _window$HookFormUtils3.handleSubmit,
    loginErrors = _window$HookFormUtils3.formState.errors;
  var _useState = useState(1),
    _useState2 = _slicedToArray(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    submitting = _useState4[0],
    setSubmitting = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    message = _useState6[0],
    setMessage = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    fading = _useState8[0],
    setFading = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    exiting = _useState0[0],
    setExiting = _useState0[1];
  var _useState1 = useState(true),
    _useState10 = _slicedToArray(_useState1, 2),
    loginMode = _useState10[0],
    setLoginMode = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    loginFading = _useState12[0],
    setLoginFading = _useState12[1];
  var _useState13 = useState('scale-fade-in'),
    _useState14 = _slicedToArray(_useState13, 2),
    loginTransition = _useState14[0],
    setLoginTransition = _useState14[1];
  var _useState15 = useState('scale-fade-in'),
    _useState16 = _slicedToArray(_useState15, 2),
    imageTransition = _useState16[0],
    setImageTransition = _useState16[1];
  var _useState17 = useState('scale-fade-in'),
    _useState18 = _slicedToArray(_useState17, 2),
    stepTransition = _useState18[0],
    setStepTransition = _useState18[1];
  var _useState19 = useState(false),
    _useState20 = _slicedToArray(_useState19, 2),
    hasRedirected = _useState20[0],
    setHasRedirected = _useState20[1]; // Para evitar múltiples redirecciones

  // Watch para validación de confirmación de password (del step 1)
  var watchPassword = watchUser("password");

  // Datos combinados para enviar al servidor
  var _useState21 = useState({
      user: {},
      company: {}
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    formData = _useState22[0],
    setFormData = _useState22[1];

  // Continuar al step 2 - Guardar datos del usuario y avanzar 
  var onUserSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userData) {
      var isValid;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            console.log('Datos recibidos en onUserSubmit:', userData);
            if (!(!userData.name || userData.name.trim() === "")) {
              _context.n = 1;
              break;
            }
            window.ToastUtils.show('error', 'El nombre completo es obligatorio.', 'Error');
            return _context.a(2);
          case 1:
            _context.n = 2;
            return triggerUser(['name', 'userName', 'email', 'password', 'confirmPassword']);
          case 2:
            isValid = _context.v;
            if (isValid) {
              setFormData(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  user: _objectSpread(_objectSpread({}, userData), {}, {
                    name: userData.name
                  })
                });
              });
              setMessage(null);
              setStepTransition('scale-fade-out');
              setTimeout(function () {
                setStep(2);
                setStepTransition('slide-fade-in');
              }, 450);
            }
          case 3:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function onUserSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Enviar formulario completo - Combinar datos de usuario y empresa
  var onCompanySubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(companyData) {
      var isValid, completeData;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return triggerCompany(['companyRnc', 'companyName']);
          case 1:
            isValid = _context2.v;
            if (!isValid) {
              _context2.n = 2;
              break;
            }
            setMessage(null);

            // Limpiar errores previos
            if (clearError) {
              clearError();
            }

            // Combinar datos de usuario y empresa
            completeData = {
              name: formData.user.name,
              userName: formData.user.userName,
              email: formData.user.email,
              password: formData.user.password,
              confirmPassword: formData.user.confirmPassword,
              // Datos de la empresa
              companyRnc: companyData.companyRnc,
              companyName: companyData.companyName,
              companyRazonSocial: companyData.companyRazonSocial || null,
              companyAddress: companyData.companyAddress || null,
              companyPhone: companyData.companyPhone || null,
              companyEmail: companyData.companyEmail || null
            };
            console.log('Datos completos para enviar:', completeData);

            // Usar el thunk de register directamente
            _context2.n = 2;
            return register(completeData);
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function onCompanySubmit(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
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
  };
  function showLogin() {
    setStepTransition('scale-fade-out');
    setLoginTransition('scale-fade-out');
    setImageTransition('scale-fade-out');
    setTimeout(function () {
      setLoginMode(true);
      setStepTransition('scale-fade-in');
      setLoginTransition('scale-fade-in');
      setImageTransition('scale-fade-in');
    }, 450);
  }
  function hideLogin() {
    setStepTransition('scale-fade-out');
    setLoginTransition('scale-fade-out');
    setImageTransition('scale-fade-out');
    setTimeout(function () {
      setLoginMode(false);
      setStepTransition('scale-fade-in');
      setLoginTransition('scale-fade-in');
      setImageTransition('scale-fade-in');
    }, 450);
  }

  // Login submit con React Hook Form - Usando el thunk de Redux
  var onLoginSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
      var loginData, result;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            setMessage(null);

            // Limpiar errores previos
            if (clearError) {
              clearError();
            }

            // Preparar datos de login
            loginData = {
              userName: data.username,
              password: data.password,
              rememberMe: false
            };
            console.log("Datos enviados al servidor", loginData);

            // Usar el thunk de login directamente
            _context3.n = 1;
            return login(loginData);
          case 1:
            result = _context3.v;
            // Si el login es exitoso, redirigir usando React Router
            if (result && result.success && result.redirectPath) {
              console.log('🚀 [Register] Redirigiendo a:', result.redirectPath);
              setHasRedirected(true); // Marcar que ya redirigimos para evitar el useEffect
              setTimeout(function () {
                history.push(result.redirectPath);
              }, 500);
            }
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function onLoginSubmit(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  var transitionClass = "".concat(fading ? 'fade-out' : 'fade-in', " fade-slide");
  var containerStyle = {
    transition: 'opacity .4s ease',
    opacity: exiting ? 0 : 1
  };
  var stepTitle = step === 1 ? 'Registro de usuario' : 'Registro de la empresa';

  // Effects para manejo de autenticación
  useEffect(function () {
    // Verificar si ya hay token guardado al cargar
    if (window.AuthActions) {
      var tokenAction = window.AuthActions.checkAuthToken();
      if (tokenAction && tokenAction.type !== 'auth/noToken') {
        window.ReduxStore.store.dispatch(tokenAction);
      }
    }
  }, []);
  useEffect(function () {
    // Si ya está autenticado AL CARGAR LA PÁGINA (no después de login), redirigir según el rol
    if (isAuthenticated && !hasRedirected) {
      var token = localStorage.getItem('authToken');
      if (token && window.JwtUtils && window.RoleConstants) {
        var role = window.JwtUtils.getRoleFromToken(token);
        console.log('🔄 [Register] Usuario autenticado detectado al cargar, rol:', role);
        if (role) {
          var roleCode = window.RoleConstants.getRoleCode(role);
          var isAdmin = window.RoleConstants.isAdmin(roleCode);
          var redirectPath = isAdmin ? '/home' : '/comun-home';
          console.log('🚀 [Register] Redirigiendo al cargar a:', redirectPath);
          setHasRedirected(true);
          setTimeout(function () {
            history.push(redirectPath);
          }, 300);
        } else {
          // Si no se puede extraer el rol, redirigir a home por defecto
          console.warn('⚠️ [Register] No se pudo extraer el rol al cargar, redirigiendo a /home');
          setHasRedirected(true);
          history.push('/home');
        }
      } else {
        // Si no hay JwtUtils, redirigir a home por defecto
        console.warn('⚠️ [Register] JwtUtils no disponible al cargar, redirigiendo a /home');
        setHasRedirected(true);
        window.location.href = '/home';
      }
    }
  }, [isAuthenticated, history, hasRedirected]);
  useEffect(function () {
    // Sincronizar el estado local de submitting con authLoading
    setSubmitting(authLoading);
  }, [authLoading]);
  return /*#__PURE__*/React.createElement("div", {
    className: "register-container d-flex justify-content-center align-items-center position-relative",
    style: containerStyle
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "register-button login-button ".concat(loginFading ? 'fade-out fade-slide' : 'fade-in fade-slide'),
    style: {
      position: 'absolute',
      top: 24,
      right: 32,
      zIndex: 10
    },
    onClick: loginMode ? hideLogin : showLogin
  }, loginMode ? 'Registrar' : 'Acceder'), /*#__PURE__*/React.createElement("div", {
    className: "row justify-content-center w-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-12 col-lg-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card shadow-sm register-card glassmorphism-effect register-card-min-height"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body d-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, !loginMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 ".concat(stepTransition)
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-inner-container w-100"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "card-title d-flex justify-content-center"
  }, stepTitle), step === 1 && /*#__PURE__*/React.createElement("form", {
    className: "mt-2",
    onSubmit: handleUserSubmit(onUserSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: "register-fields"
  }, /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Nombre",
    name: "name",
    type: "text",
    register: userRegister,
    errors: userErrors,
    validation: {
      required: 'El nombre es obligatorio',
      minLength: {
        value: 2,
        message: 'Mínimo 2 caracteres'
      }
    },
    placeholder: "Nombre completo"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Nombre de usuario",
    name: "userName",
    type: "text",
    register: userRegister,
    errors: userErrors,
    validation: {
      required: 'El nombre de usuario es obligatorio',
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: 'Solo letras, números y guiones bajos'
      }
    },
    placeholder: "usuario123"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Email",
    name: "email",
    type: "email",
    register: userRegister,
    errors: userErrors,
    validation: {
      required: 'El email es obligatorio',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ingrese un email válido'
      }
    },
    placeholder: "mail@ejemplo.com"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Contrase\xF1a",
    name: "password",
    type: "password",
    register: userRegister,
    errors: userErrors,
    validation: {
      required: 'La contraseña es obligatoria',
      minLength: {
        value: 6,
        message: 'Mínimo 6 caracteres'
      }
    },
    placeholder: "*******"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Confirmar contrase\xF1a",
    name: "confirmPassword",
    type: "password",
    register: userRegister,
    errors: userErrors,
    validation: {
      required: 'Confirme la contraseña',
      validate: function validate(value) {
        return value === watchPassword || 'Las contraseñas no coinciden';
      }
    },
    placeholder: "*******"
  }))), step === 2 && /*#__PURE__*/React.createElement("form", {
    className: "mt-2",
    onSubmit: handleCompanySubmit(onCompanySubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: "register-fields"
  }, /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "RNC",
    name: "companyRnc",
    type: "text",
    register: companyRegister,
    errors: companyErrors,
    validation: {
      required: 'El RNC es requerido',
      pattern: {
        value: /^\d{9}$|^\d{11}$/,
        message: 'El RNC debe tener 9 o 11 dígitos'
      }
    },
    placeholder: "RNC de la empresa"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Nombre comercial",
    name: "companyName",
    type: "text",
    register: companyRegister,
    errors: companyErrors,
    validation: {
      required: 'El nombre comercial de la empresa es obligatorio'
    },
    placeholder: "Nombre comercial"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Raz\xF3n social",
    name: "companyRazonSocial",
    type: "text",
    register: companyRegister,
    placeholder: "Raz\xF3n social (opcional)"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.OptionalField, {
    label: "Direcci\xF3n",
    name: "companyAddress",
    type: "text",
    register: companyRegister,
    placeholder: "Direcci\xF3n"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control input-light",
    placeholder: "(000)-000-0000",
    maxLength: 14,
    onInput: handlePhoneInput
  }, companyRegister("companyPhone")))), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Email de la empresa",
    name: "companyEmail",
    type: "email",
    register: companyRegister,
    errors: companyErrors,
    validation: {
      required: false,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ingrese un email válido'
      }
    },
    placeholder: "empresa@ejemplo.com"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "register-btn-container d-flex gap-2"
  }, step === 2 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "atras-button",
    disabled: submitting,
    onClick: function onClick() {
      setStepTransition('slide-fade-out');
      setTimeout(function () {
        setStep(1);
        setStepTransition('scale-fade-in');
      }, 450);
    }
  }, "Atr\xE1s"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "register-button",
    disabled: submitting,
    onClick: step === 1 ? handleUserSubmit(onUserSubmit) : handleCompanySubmit(onCompanySubmit)
  }, step === 1 ? 'Continuar' : submitting ? 'Registrando...' : 'Registrar')))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 d-flex align-items-center justify-content-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/img/register.jpg",
    alt: "Ilustraci\xF3n registro",
    className: "image ".concat(imageTransition),
    style: {
      maxWidth: '100%',
      boxShadow: '0 8px 30px rgba(36,37,38,0.06)'
    }
  }))), loginMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 ".concat(loginTransition)
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-inner-container w-100"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "card-title d-flex justify-content-center"
  }, "Iniciar sesi\xF3n"), /*#__PURE__*/React.createElement("form", {
    className: "mt-2",
    onSubmit: handleLoginSubmit(onLoginSubmit)
  }, /*#__PURE__*/React.createElement("div", {
    className: "register-fields"
  }, /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Usuario",
    name: "username",
    type: "text",
    register: loginRegister,
    errors: loginErrors,
    validation: {
      required: 'El usuario es obligatorio'
    },
    placeholder: "usuario123"
  }), /*#__PURE__*/React.createElement(window.HookFormUtils.InputField, {
    label: "Contrase\xF1a",
    name: "password",
    type: "password",
    register: loginRegister,
    errors: loginErrors,
    validation: {
      required: 'La contraseña es obligatoria'
    },
    placeholder: "*******"
  })), /*#__PURE__*/React.createElement("div", {
    className: "register-btn-container d-flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "register-button",
    disabled: submitting
  }, submitting ? 'Accediendo...' : 'Acceder'))))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-6 d-flex align-items-center justify-content-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/img/login.jpg",
    alt: "Ilustraci\xF3n login",
    className: "image ".concat(imageTransition),
    style: {
      maxWidth: '100%',
      boxShadow: '0 8px 30px rgba(36,37,38,0.06)'
    }
  })))))))));
}
window.Register = Register;

/* jshint ignore:end */