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
/* jshint ignore:start */

/* global React, ReactDOM, App */

function Register() {
  var _React = React,
    useState = _React.useState;
  var _useState = useState({
      // Usuario
      name: '',
      username: '',
      email: '',
      password: '',
      confirm: '',
      // Empresa
      companyRnc: '',
      companyName: '',
      companyRazonSocial: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    form = _useState2[0],
    setForm = _useState2[1];
  var _useState3 = useState(1),
    _useState4 = _slicedToArray(_useState3, 2),
    step = _useState4[0],
    setStep = _useState4[1]; // 1 = usuario, 2 = empresa
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    submitting = _useState6[0],
    setSubmitting = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    message = _useState8[0],
    setMessage = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    fading = _useState0[0],
    setFading = _useState0[1]; // controla la animación de fade entre pasos
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    exiting = _useState10[0],
    setExiting = _useState10[1]; // controla la animación de salida global
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    errors = _useState12[0],
    setErrors = _useState12[1];
  var _useState13 = useState(true),
    _useState14 = _slicedToArray(_useState13, 2),
    loginMode = _useState14[0],
    setLoginMode = _useState14[1]; // controla si se muestra el login
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    loginFading = _useState16[0],
    setLoginFading = _useState16[1]; // animación de fade para login
  var _useState17 = useState({
      username: '',
      password: ''
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    loginForm = _useState18[0],
    setLoginForm = _useState18[1];
  var _useState19 = useState({}),
    _useState20 = _slicedToArray(_useState19, 2),
    loginErrors = _useState20[0],
    setLoginErrors = _useState20[1];
  var _useState21 = useState('scale-fade-in'),
    _useState22 = _slicedToArray(_useState21, 2),
    loginTransition = _useState22[0],
    setLoginTransition = _useState22[1];
  var _useState23 = useState('scale-fade-in'),
    _useState24 = _slicedToArray(_useState23, 2),
    imageTransition = _useState24[0],
    setImageTransition = _useState24[1];

  // Estado para animación entre pasos
  var _useState25 = useState('scale-fade-in'),
    _useState26 = _slicedToArray(_useState25, 2),
    stepTransition = _useState26[0],
    setStepTransition = _useState26[1];
  function handleInput(e) {
    var name = e.target.name;
    var value = e.target.value;
    setForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
  }
  function handleLoginInput(e) {
    var name = e.target.name;
    var value = e.target.value;
    setLoginForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
  }
  function validateUser() {
    var newErrors = {};
    if (!form.name) newErrors.name = 'El nombre es obligatorio.';
    if (!form.username) newErrors.username = 'El nombre de usuario es obligatorio.';
    if (!form.email) newErrors.email = 'El email es obligatorio.';
    if (!form.password) newErrors.password = 'La contraseña es obligatoria.';
    if (form.password !== form.confirm) newErrors.confirm = 'Las contraseñas no coinciden.';
    return newErrors;
  }
  function validateCompany() {
    var newErrors = {};
    if (!form.companyRnc) newErrors.companyRnc = 'El RNC de la empresa es obligatorio.';
    if (!form.companyName) newErrors.companyName = 'El nombre comercial de la empresa es obligatorio.';
    // ...puedes agregar más validaciones si lo deseas...
    return newErrors;
  }
  function handleContinue(e) {
    e.preventDefault();
    var fieldErrors = validateUser();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    setMessage(null);
    setStepTransition('scale-fade-out');
    setTimeout(function () {
      setStep(2);
      setStepTransition('slide-fade-in');
    }, 450);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (step === 1) {
      return handleContinue(e);
    }
    var fieldErrors = validateCompany();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    setSubmitting(true);
    setMessage(null);

    // Simula llamada al servidor. Reemplaza por fetch real a tu API cuando exista.
    setTimeout(function () {
      setSubmitting(false);

      // Animación de fade out global antes de cambiar a App
      setExiting(true);
      setTimeout(function () {
        if (typeof App !== 'undefined') {
          try {
            var rootEl = document.getElementById('root');
            if (window.__APP_ROOT && typeof window.__APP_ROOT.render === 'function') {
              window.__APP_ROOT.render(React.createElement(App, {
                animateIn: true
              }));
            } else if (rootEl && typeof ReactDOM !== 'undefined' && typeof ReactDOM.createRoot === 'function') {
              window.__APP_ROOT = ReactDOM.createRoot(rootEl);
              window.__APP_ROOT.render(React.createElement(App, {
                animateIn: true
              }));
            } else {
              window.location.reload();
            }
          } catch (ex) {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      }, 400); // Espera a que termine el fade out
    }, 900);
  }
  function formatPhone(value) {
    // Solo números
    var v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 1) v = '(' + v;
    if (v.length >= 4) v = v.slice(0, 4) + ')-' + v.slice(4);
    if (v.length >= 9) v = v.slice(0, 9) + '-' + v.slice(9);
    return v;
  }
  function handlePhoneInput(e) {
    var value = e.target.value;
    setForm(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        companyPhone: formatPhone(value)
      });
    });
  }
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
  function handleLoginSubmit(e) {
    e.preventDefault();
    var errors = {};
    if (!loginForm.username) errors.username = 'El usuario es obligatorio.';
    if (!loginForm.password) errors.password = 'La contraseña es obligatoria.';
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // Aquí iría la lógica de autenticación
    // Simulación de éxito
    setSubmitting(true);
    setTimeout(function () {
      setSubmitting(false);
      // Aquí podrías redirigir o mostrar mensaje de éxito
    }, 900);
  }

  // clase de transición moderna
  var transitionClass = "".concat(fading ? 'fade-out' : 'fade-in', " fade-slide");

  // Estilo para fade out global
  var containerStyle = {
    transition: 'opacity .4s ease',
    opacity: exiting ? 0 : 1
  };
  var stepTitle = step === 1 ? 'Registro de usuario' : 'Registro de la empresa';
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
  }, stepTitle), /*#__PURE__*/React.createElement("form", {
    className: "mt-2",
    onSubmit: step === 1 ? handleContinue : handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "register-fields"
  }, step === 1 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "name",
    value: form.name,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "Nombre completo"
  }), errors.name !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.name) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nombre de usuario"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "username",
    value: form.username,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "usuario123"
  }), errors.username !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.username) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    value: form.email,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "mail@ejemplo.com"
  }), errors.email !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.email) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Contrase\xF1a"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password",
    value: form.password,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "*******"
  }), errors.password !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.password) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Confirmar contrase\xF1a"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "confirm",
    value: form.confirm,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "*******"
  }), errors.confirm !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.confirm) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "RNC"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "companyRnc",
    value: form.companyRnc,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "RNC de la empresa"
  }), errors.companyRnc !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.companyRnc) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nombre comercial"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "companyName",
    value: form.companyName,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "Nombre comercial"
  }), errors.companyName !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, errors.companyName) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Raz\xF3n social"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "companyRazonSocial",
    value: form.companyRazonSocial,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "Raz\xF3n social (opcional)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Direcci\xF3n"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "companyAddress",
    value: form.companyAddress,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "Direcci\xF3n"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "companyPhone",
    value: form.companyPhone,
    onChange: handlePhoneInput,
    className: "form-control input-light",
    placeholder: "(000)-000-0000",
    maxLength: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email de la empresa"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "companyEmail",
    value: form.companyEmail,
    onChange: handleInput,
    className: "form-control input-light",
    placeholder: "empresa@ejemplo.com"
  }))))), /*#__PURE__*/React.createElement("div", {
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
    onClick: step === 1 ? handleContinue : handleSubmit
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
    onSubmit: handleLoginSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "register-fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Usuario"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "username",
    value: loginForm.username,
    onChange: handleLoginInput,
    className: "form-control input-light",
    placeholder: "usuario123"
  }), loginErrors.username !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, loginErrors.username) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Contrase\xF1a"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "password",
    value: loginForm.password,
    onChange: handleLoginInput,
    className: "form-control input-light",
    placeholder: "*******"
  }), loginErrors.password !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small"
  }, loginErrors.password) : /*#__PURE__*/React.createElement("div", {
    className: "form-text text-danger small",
    style: {
      visibility: 'hidden'
    }
  }, "\xA0"))), /*#__PURE__*/React.createElement("div", {
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