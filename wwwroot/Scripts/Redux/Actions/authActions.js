"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Actions para la gestión de autenticación
 */

// Action Types
var AUTH_ACTIONS = {
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  LOGOUT_REQUEST: 'auth/logoutRequest',
  LOGOUT_SUCCESS: 'auth/logoutSuccess',
  LOGOUT_FAILURE: 'auth/logoutFailure',
  REGISTER_REQUEST: 'auth/registerRequest',
  REGISTER_SUCCESS: 'auth/registerSuccess',
  REGISTER_FAILURE: 'auth/registerFailure',
  CHANGE_PASSWORD_REQUEST: 'auth/changePasswordRequest',
  CHANGE_PASSWORD_SUCCESS: 'auth/changePasswordSuccess',
  CHANGE_PASSWORD_FAILURE: 'auth/changePasswordFailure',
  SET_AUTH_LOADING: 'auth/setAuthLoading',
  CLEAR_AUTH_ERROR: 'auth/clearAuthError'
};

// Action Creators
var authActions = {
  // Login Actions (simples)
  loginRequest: function loginRequest() {
    return {
      type: AUTH_ACTIONS.LOGIN_REQUEST
    };
  },
  loginSuccess: function loginSuccess(payload) {
    return {
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: payload
    };
  },
  loginFailure: function loginFailure(error) {
    return {
      type: AUTH_ACTIONS.LOGIN_FAILURE,
      payload: error
    };
  },
  // Login Thunk (asíncrono)
  login: function login(credentials) {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(dispatch) {
        var response, result, redirectPath, userRole, roleCode, role, isAdminResult, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              dispatch(authActions.loginRequest());
              _context.p = 1;
              _context.n = 2;
              return fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
              });
            case 2:
              response = _context.v;
              _context.n = 3;
              return response.json();
            case 3:
              result = _context.v;
              if (!(response.ok && result.success)) {
                _context.n = 4;
                break;
              }
              console.log('================== INICIO DEBUG LOGIN ==================');
              console.log('📋 Token recibido:', result.data.token);

              // Obtener el rol directamente del token JWT ANTES de guardar
              redirectPath = '/home'; // Por defecto
              userRole = null;
              roleCode = null;
              console.log('🔍 Verificando disponibilidad de JwtUtils:', typeof window.JwtUtils !== 'undefined');
              if (window.JwtUtils) {
                console.log('✅ JwtUtils disponible');
                role = window.JwtUtils.getRoleFromToken(result.data.token);
                console.log('🎭 Rol extraído del token:', role);
                console.log('🎭 Tipo de dato del rol:', _typeof(role));
                if (role) {
                  userRole = role; // Guardar para Redux
                  console.log('🔍 Verificando RoleConstants:', typeof window.RoleConstants !== 'undefined');
                  if (window.RoleConstants) {
                    // Obtener el código del rol usando RoleConstants
                    roleCode = window.RoleConstants.getRoleCode(role);
                    console.log('🔐 Código del rol obtenido:', roleCode);
                    console.log('🔐 Códigos disponibles:', {
                      ADMIN_CODE: window.RoleConstants.ADMIN_CODE,
                      USER_CODE: window.RoleConstants.USER_CODE
                    });

                    // Verificar si es admin
                    isAdminResult = window.RoleConstants.isAdmin(roleCode);
                    console.log('👤 ¿Es administrador?:', isAdminResult);
                    console.log('👤 Comparación:', roleCode, '===', window.RoleConstants.ADMIN_CODE, '=', isAdminResult);

                    // Redirigir según el rol
                    if (isAdminResult) {
                      redirectPath = '/home';
                      console.log('✅ Usuario administrador detectado (rol:', role, ', código:', roleCode, ')');
                      console.log('➡️ Redirigiendo a:', redirectPath);
                    } else {
                      redirectPath = '/comun-home';
                      console.log('✅ Usuario común detectado (rol:', role, ', código:', roleCode, ')');
                      console.log('➡️ Redirigiendo a:', redirectPath);
                    }
                  } else {
                    console.error('❌ RoleConstants NO disponible');
                  }
                } else {
                  console.warn('⚠️ No se pudo extraer el rol del token, usando ruta por defecto');
                  console.warn('⚠️ Ruta por defecto:', redirectPath);
                }
              } else {
                console.warn('⚠️ JwtUtils no disponible, usando ruta por defecto');
                console.warn('⚠️ Ruta por defecto:', redirectPath);
              }

              // Guardar solo token y userName en localStorage (NO el rol por seguridad)
              localStorage.setItem('authToken', result.data.token);
              localStorage.setItem('userName', result.data.userName);
              console.log('💾 Token y userName guardados en localStorage');

              // Dispatch success con el rol incluido
              dispatch(authActions.loginSuccess({
                token: result.data.token,
                userName: result.data.userName,
                role: userRole,
                roleCode: roleCode,
                message: 'Login exitoso'
              }));
              console.log('🎯 REDIRECCIÓN FINAL:', redirectPath);
              console.log('================== FIN DEBUG LOGIN ==================');

              // Retornar éxito con la ruta de redirección
              return _context.a(2, {
                success: true,
                redirectPath: redirectPath
              });
            case 4:
              // Dispatch error
              dispatch(authActions.loginFailure(result.message || 'Error en login'));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', result.message || 'Error en login', 'Error');
              }
              return _context.a(2, {
                success: false,
                error: result.message
              });
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              console.error('Error inesperado en login:', _t);

              // Dispatch error
              dispatch(authActions.loginFailure('Error de conexión'));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado durante el login', 'Error');
              }
              return _context.a(2, {
                success: false,
                error: 'Error de conexión'
              });
            case 7:
              return _context.a(2);
          }
        }, _callee, null, [[1, 6]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  },
  // Register Actions (simples)
  registerRequest: function registerRequest() {
    return {
      type: AUTH_ACTIONS.REGISTER_REQUEST
    };
  },
  registerSuccess: function registerSuccess(payload) {
    return {
      type: AUTH_ACTIONS.REGISTER_SUCCESS,
      payload: payload
    };
  },
  registerFailure: function registerFailure(error) {
    return {
      type: AUTH_ACTIONS.REGISTER_FAILURE,
      payload: error
    };
  },
  // Register Thunk (asíncrono)
  register: function register(userData) {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(dispatch) {
        var response, result, userInfoResponse, redirectPath, userInfo, roleCode, errorMessage, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              dispatch(authActions.registerRequest());
              _context2.p = 1;
              _context2.n = 2;
              return fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
              });
            case 2:
              response = _context2.v;
              _context2.n = 3;
              return response.json();
            case 3:
              result = _context2.v;
              if (!(response.ok && result.success)) {
                _context2.n = 7;
                break;
              }
              // Guardar en localStorage
              localStorage.setItem('authToken', result.data.token);
              localStorage.setItem('userName', result.data.userName);

              // Dispatch success
              dispatch(authActions.registerSuccess({
                token: result.data.token,
                userName: result.data.userName,
                message: 'Registro exitoso'
              }));

              // Mostrar notificación
              if (window.ToastUtils) {
                window.ToastUtils.show('success', 'Registro exitoso', 'Éxito');
              }

              // Obtener información del usuario para determinar el rol
              _context2.n = 4;
              return fetch('/api/usuario/me', {
                method: 'GET',
                headers: {
                  'Authorization': "Bearer ".concat(result.data.token),
                  'Content-Type': 'application/json'
                }
              });
            case 4:
              userInfoResponse = _context2.v;
              redirectPath = '/home'; // Por defecto
              if (!userInfoResponse.ok) {
                _context2.n = 6;
                break;
              }
              _context2.n = 5;
              return userInfoResponse.json();
            case 5:
              userInfo = _context2.v;
              if (userInfo.success && userInfo.data) {
                // Obtener el código del rol usando RoleConstants
                roleCode = window.RoleConstants.getUserRoleCode(userInfo.data); // Redirigir según el rol
                if (window.RoleConstants.isAdmin(roleCode)) {
                  redirectPath = '/home';
                  console.log('🔑 Usuario administrador detectado, redirigiendo a dashboard admin');
                } else {
                  redirectPath = '/comun-home';
                  console.log('🔑 Usuario común detectado, redirigiendo a dashboard usuario');
                }
              }
            case 6:
              // Redirigir después de un breve delay
              setTimeout(function () {
                window.location.href = redirectPath;
              }, 1000);
              return _context2.a(2, {
                success: true
              });
            case 7:
              // Manejar diferentes códigos de error
              errorMessage = result.message || 'Error en registro'; // Si es un 409 (Conflict), personalizar el mensaje
              if (response.status === 409) {
                errorMessage = result.message || 'El usuario o email ya existe';
              }

              // Si es un 400 (Bad Request) con detalles
              if (response.status === 400 && result.details) {
                console.error('Detalles de validación:', result.details);
                errorMessage = result.message || 'Datos inválidos';
              }

              // Dispatch error
              dispatch(authActions.registerFailure(errorMessage));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', errorMessage, 'Error');
              }
              return _context2.a(2, {
                success: false,
                error: errorMessage
              });
            case 8:
              _context2.n = 10;
              break;
            case 9:
              _context2.p = 9;
              _t2 = _context2.v;
              console.error('Error inesperado en registro:', _t2);

              // Dispatch error
              dispatch(authActions.registerFailure('Error de conexión'));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado durante el registro', 'Error');
              }
              return _context2.a(2, {
                success: false,
                error: 'Error de conexión'
              });
            case 10:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 9]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  // Logout Actions (simples)
  logoutRequest: function logoutRequest() {
    return {
      type: AUTH_ACTIONS.LOGOUT_REQUEST
    };
  },
  logoutSuccess: function logoutSuccess() {
    // Limpiar localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    console.log('🧹 [AuthActions] LocalStorage limpiado (token, userName)');
    return {
      type: AUTH_ACTIONS.LOGOUT_SUCCESS
    };
  },
  logoutFailure: function logoutFailure(error) {
    return {
      type: AUTH_ACTIONS.LOGOUT_FAILURE,
      payload: error
    };
  },
  // Logout Thunk (asíncrono)
  logout: function logout() {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(dispatch) {
        var token, response, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              dispatch(authActions.logoutRequest());
              _context3.p = 1;
              token = localStorage.getItem('authToken'); // Llamar al endpoint de logout
              _context3.n = 2;
              return fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? "Bearer ".concat(token) : ''
                }
              });
            case 2:
              response = _context3.v;
              if (response.ok) {
                dispatch(authActions.logoutSuccess());

                // Agregar notificación de éxito
                if (window.AppActions) {
                  dispatch(window.AppActions.agregarNotificacion({
                    tipo: 'success',
                    mensaje: 'Sesión cerrada correctamente',
                    autoClose: true
                  }));
                }

                // Redirigir al login después de un breve delay
                setTimeout(function () {
                  window.location.href = '/';
                }, 1000);
              } else {
                // Aunque falle el backend, igual cerramos sesión localmente
                dispatch(authActions.logoutSuccess());
                window.location.href = '/';
              }
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              console.error('Error en logout:', _t3);
              // Aunque falle, igual cerramos sesión localmente
              dispatch(authActions.logoutSuccess());
              window.location.href = '/';
            case 4:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 3]]);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  },
  // Change Password Actions (simples)
  changePasswordRequest: function changePasswordRequest() {
    return {
      type: AUTH_ACTIONS.CHANGE_PASSWORD_REQUEST
    };
  },
  changePasswordSuccess: function changePasswordSuccess(message) {
    return {
      type: AUTH_ACTIONS.CHANGE_PASSWORD_SUCCESS,
      payload: message
    };
  },
  changePasswordFailure: function changePasswordFailure(error) {
    return {
      type: AUTH_ACTIONS.CHANGE_PASSWORD_FAILURE,
      payload: error
    };
  },
  // Change Password Thunk (asíncrono)
  changePassword: function changePassword(passwordData) {
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(dispatch) {
        var token, response, result, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              dispatch(authActions.changePasswordRequest());
              _context4.p = 1;
              token = localStorage.getItem('authToken');
              _context4.n = 2;
              return fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? "Bearer ".concat(token) : ''
                },
                body: JSON.stringify(passwordData)
              });
            case 2:
              response = _context4.v;
              _context4.n = 3;
              return response.json();
            case 3:
              result = _context4.v;
              if (!(response.ok && result.success)) {
                _context4.n = 4;
                break;
              }
              // Dispatch success
              dispatch(authActions.changePasswordSuccess('Contraseña cambiada exitosamente'));

              // Mostrar notificación
              if (window.ToastUtils) {
                window.ToastUtils.show('success', 'Contraseña cambiada exitosamente', 'Éxito');
              }
              return _context4.a(2, {
                success: true
              });
            case 4:
              // Dispatch error
              dispatch(authActions.changePasswordFailure(result.message || 'Error al cambiar contraseña'));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', result.message || 'Error al cambiar contraseña', 'Error');
              }
              return _context4.a(2, {
                success: false,
                error: result.message
              });
            case 5:
              _context4.n = 7;
              break;
            case 6:
              _context4.p = 6;
              _t4 = _context4.v;
              console.error('Error inesperado en cambio de contraseña:', _t4);

              // Dispatch error
              dispatch(authActions.changePasswordFailure('Error de conexión'));

              // Mostrar notificación de error
              if (window.ToastUtils) {
                window.ToastUtils.show('error', 'Error inesperado al cambiar contraseña', 'Error');
              }
              return _context4.a(2, {
                success: false,
                error: 'Error de conexión'
              });
            case 7:
              return _context4.a(2);
          }
        }, _callee4, null, [[1, 6]]);
      }));
      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }();
  },
  // Utility Actions
  setAuthLoading: function setAuthLoading(loading) {
    return {
      type: AUTH_ACTIONS.SET_AUTH_LOADING,
      payload: loading
    };
  },
  clearAuthError: function clearAuthError() {
    return {
      type: AUTH_ACTIONS.CLEAR_AUTH_ERROR
    };
  },
  // Action que verifica token y hace login automático
  checkAuthToken: function checkAuthToken() {
    var token = localStorage.getItem('authToken');
    var userName = localStorage.getItem('userName');
    if (token && userName) {
      return {
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          token: token,
          userName: userName,
          message: 'Sesión restaurada'
        }
      };
    }
    return {
      type: 'auth/noToken'
    };
  }
};

// Hacer disponible globalmente
window.AuthActions = authActions;
window.AuthActions.TYPES = AUTH_ACTIONS;
console.log('🔐 Auth Actions cargadas correctamente con Thunks');