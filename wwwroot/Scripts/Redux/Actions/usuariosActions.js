"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Actions para la gestión de usuarios
 */

// Action Types
var USUARIOS_ACTIONS = {
  SET_USUARIOS: 'usuarios/setUsuarios',
  AGREGAR_USUARIO: 'usuarios/agregarUsuario',
  ACTUALIZAR_USUARIO: 'usuarios/actualizarUsuario',
  ELIMINAR_USUARIO: 'usuarios/eliminarUsuario',
  SET_CARGANDO: 'usuarios/setCargando',
  SET_ERROR: 'usuarios/setError',
  SET_FILTROS: 'usuarios/setFiltros'
};

// Action Creators
var usuariosActions = {
  setUsuarios: function setUsuarios(usuarios) {
    return {
      type: USUARIOS_ACTIONS.SET_USUARIOS,
      payload: usuarios
    };
  },
  agregarUsuario: function agregarUsuario(usuario) {
    return {
      type: USUARIOS_ACTIONS.AGREGAR_USUARIO,
      payload: usuario
    };
  },
  actualizarUsuario: function actualizarUsuario(usuario) {
    return {
      type: USUARIOS_ACTIONS.ACTUALIZAR_USUARIO,
      payload: usuario
    };
  },
  eliminarUsuario: function eliminarUsuario(id) {
    return {
      type: USUARIOS_ACTIONS.ELIMINAR_USUARIO,
      payload: id
    };
  },
  setCargando: function setCargando(cargando) {
    return {
      type: USUARIOS_ACTIONS.SET_CARGANDO,
      payload: cargando
    };
  },
  setError: function setError(error) {
    return {
      type: USUARIOS_ACTIONS.SET_ERROR,
      payload: error
    };
  },
  setFiltros: function setFiltros(filtros) {
    return {
      type: USUARIOS_ACTIONS.SET_FILTROS,
      payload: filtros
    };
  },
  // Acciones asíncronas (Thunks)
  fetchUsuarios: function fetchUsuarios() {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(dispatch) {
        var token, response, result, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              dispatch(usuariosActions.setCargando(true));
              dispatch(usuariosActions.setError(null));
              _context.p = 1;
              token = localStorage.getItem('authToken');
              if (token) {
                _context.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación');
            case 2:
              _context.n = 3;
              return fetch('/api/usuario', {
                method: 'GET',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 3:
              response = _context.v;
              if (response.ok) {
                _context.n = 4;
                break;
              }
              throw new Error('Error al obtener usuarios');
            case 4:
              _context.n = 5;
              return response.json();
            case 5:
              result = _context.v;
              if (!(result.success && result.data)) {
                _context.n = 6;
                break;
              }
              dispatch(usuariosActions.setUsuarios(result.data));
              _context.n = 7;
              break;
            case 6:
              throw new Error(result.message || 'Error al obtener usuarios');
            case 7:
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              console.error('Error al obtener usuarios:', _t);
              dispatch(usuariosActions.setError(_t.message));
              if (window.Toats) {
                window.Toats.show('danger', 'Error al cargar usuarios');
              }
            case 9:
              _context.p = 9;
              dispatch(usuariosActions.setCargando(false));
              return _context.f(9);
            case 10:
              return _context.a(2);
          }
        }, _callee, null, [[1, 8, 9, 10]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  },
  crearUsuario: function crearUsuario(usuarioData) {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(dispatch) {
        var token, response, errorData, result, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              dispatch(usuariosActions.setCargando(true));
              dispatch(usuariosActions.setError(null));
              _context2.p = 1;
              token = localStorage.getItem('authToken');
              if (token) {
                _context2.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación');
            case 2:
              _context2.n = 3;
              return fetch('/api/usuario', {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
              });
            case 3:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 5;
                break;
              }
              _context2.n = 4;
              return response.json();
            case 4:
              errorData = _context2.v;
              throw new Error(errorData.message || 'Error al crear usuario');
            case 5:
              _context2.n = 6;
              return response.json();
            case 6:
              result = _context2.v;
              if (!(result.success && result.data)) {
                _context2.n = 7;
                break;
              }
              dispatch(usuariosActions.agregarUsuario(result.data));
              return _context2.a(2, {
                success: true,
                data: result.data
              });
            case 7:
              throw new Error(result.message || 'Error al crear usuario');
            case 8:
              _context2.n = 10;
              break;
            case 9:
              _context2.p = 9;
              _t2 = _context2.v;
              console.error('Error al crear usuario:', _t2);
              dispatch(usuariosActions.setError(_t2.message));
              return _context2.a(2, {
                success: false,
                error: _t2.message
              });
            case 10:
              _context2.p = 10;
              dispatch(usuariosActions.setCargando(false));
              return _context2.f(10);
            case 11:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 9, 10, 11]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  editarUsuario: function editarUsuario(usuarioData) {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(dispatch) {
        var token, response, errorData, result, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              dispatch(usuariosActions.setCargando(true));
              dispatch(usuariosActions.setError(null));
              _context3.p = 1;
              token = localStorage.getItem('authToken');
              if (token) {
                _context3.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación');
            case 2:
              _context3.n = 3;
              return fetch("/api/usuario/".concat(usuarioData.fidUsuario), {
                method: 'PUT',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
              });
            case 3:
              response = _context3.v;
              if (response.ok) {
                _context3.n = 5;
                break;
              }
              _context3.n = 4;
              return response.json();
            case 4:
              errorData = _context3.v;
              throw new Error(errorData.message || 'Error al actualizar usuario');
            case 5:
              _context3.n = 6;
              return response.json();
            case 6:
              result = _context3.v;
              if (!(result.success && result.data)) {
                _context3.n = 7;
                break;
              }
              dispatch(usuariosActions.actualizarUsuario(result.data));
              return _context3.a(2, {
                success: true,
                data: result.data
              });
            case 7:
              throw new Error(result.message || 'Error al actualizar usuario');
            case 8:
              _context3.n = 10;
              break;
            case 9:
              _context3.p = 9;
              _t3 = _context3.v;
              console.error('Error al actualizar usuario:', _t3);
              dispatch(usuariosActions.setError(_t3.message));
              return _context3.a(2, {
                success: false,
                error: _t3.message
              });
            case 10:
              _context3.p = 10;
              dispatch(usuariosActions.setCargando(false));
              return _context3.f(10);
            case 11:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 9, 10, 11]]);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  },
  eliminarUsuarioById: function eliminarUsuarioById(usuarioId) {
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(dispatch) {
        var token, response, errorData, result, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              dispatch(usuariosActions.setCargando(true));
              dispatch(usuariosActions.setError(null));
              _context4.p = 1;
              token = localStorage.getItem('authToken');
              if (token) {
                _context4.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación');
            case 2:
              _context4.n = 3;
              return fetch("/api/usuario/".concat(usuarioId), {
                method: 'DELETE',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 3:
              response = _context4.v;
              if (response.ok) {
                _context4.n = 5;
                break;
              }
              _context4.n = 4;
              return response.json();
            case 4:
              errorData = _context4.v;
              throw new Error(errorData.message || 'Error al eliminar usuario');
            case 5:
              _context4.n = 6;
              return response.json();
            case 6:
              result = _context4.v;
              if (!result.success) {
                _context4.n = 7;
                break;
              }
              dispatch(usuariosActions.eliminarUsuario(usuarioId));
              return _context4.a(2, {
                success: true
              });
            case 7:
              throw new Error(result.message || 'Error al eliminar usuario');
            case 8:
              _context4.n = 10;
              break;
            case 9:
              _context4.p = 9;
              _t4 = _context4.v;
              console.error('Error al eliminar usuario:', _t4);
              dispatch(usuariosActions.setError(_t4.message));
              return _context4.a(2, {
                success: false,
                error: _t4.message
              });
            case 10:
              _context4.p = 10;
              dispatch(usuariosActions.setCargando(false));
              return _context4.f(10);
            case 11:
              return _context4.a(2);
          }
        }, _callee4, null, [[1, 9, 10, 11]]);
      }));
      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }();
  },
  activarUsuario: function activarUsuario(usuarioId) {
    return /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(dispatch) {
        var token, response, errorData, result, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              dispatch(usuariosActions.setCargando(true));
              dispatch(usuariosActions.setError(null));
              _context5.p = 1;
              token = localStorage.getItem('authToken');
              if (token) {
                _context5.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación');
            case 2:
              _context5.n = 3;
              return fetch("/api/usuario/".concat(usuarioId, "/activate"), {
                method: 'POST',
                headers: {
                  'Authorization': "Bearer ".concat(token),
                  'Content-Type': 'application/json'
                }
              });
            case 3:
              response = _context5.v;
              if (response.ok) {
                _context5.n = 5;
                break;
              }
              _context5.n = 4;
              return response.json();
            case 4:
              errorData = _context5.v;
              throw new Error(errorData.message || 'Error al activar usuario');
            case 5:
              _context5.n = 6;
              return response.json();
            case 6:
              result = _context5.v;
              if (!result.success) {
                _context5.n = 7;
                break;
              }
              // Recargar la lista de usuarios
              dispatch(usuariosActions.fetchUsuarios());
              return _context5.a(2, {
                success: true
              });
            case 7:
              throw new Error(result.message || 'Error al activar usuario');
            case 8:
              _context5.n = 10;
              break;
            case 9:
              _context5.p = 9;
              _t5 = _context5.v;
              console.error('Error al activar usuario:', _t5);
              dispatch(usuariosActions.setError(_t5.message));
              return _context5.a(2, {
                success: false,
                error: _t5.message
              });
            case 10:
              _context5.p = 10;
              dispatch(usuariosActions.setCargando(false));
              return _context5.f(10);
            case 11:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 9, 10, 11]]);
      }));
      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }();
  }
};

// Hacer disponible globalmente
window.UsuariosActions = _objectSpread({
  TYPES: USUARIOS_ACTIONS
}, usuariosActions);
console.log('👥 Usuarios Actions cargadas correctamente');