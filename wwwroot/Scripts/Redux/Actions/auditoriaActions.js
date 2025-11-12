"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Actions para la gestión de auditorías
 */

// Action Types
var AUDITORIA_ACTIONS = {
  SET_AUDITORIAS: 'auditoria/setAuditorias',
  SET_CARGANDO: 'auditoria/setCargando',
  SET_ERROR: 'auditoria/setError',
  CLEAR_ERROR: 'auditoria/clearError',
  SET_FILTROS: 'auditoria/setFiltros',
  SET_PAGINACION: 'auditoria/setPaginacion',
  LIMPIAR_FILTROS: 'auditoria/limpiarFiltros',
  // Action types para auditoría de usuarios
  SET_AUDITORIAS_USUARIOS: 'auditoria/setAuditoriasUsuarios',
  SET_CARGANDO_USUARIOS: 'auditoria/setCargandoUsuarios',
  SET_ERROR_USUARIOS: 'auditoria/setErrorUsuarios'
};

// Action Creators
var auditoriaActions = {
  // Acciones síncronas
  setAuditorias: function setAuditorias(auditorias) {
    return {
      type: AUDITORIA_ACTIONS.SET_AUDITORIAS,
      payload: auditorias
    };
  },
  setCargando: function setCargando(cargando) {
    return {
      type: AUDITORIA_ACTIONS.SET_CARGANDO,
      payload: cargando
    };
  },
  setError: function setError(error) {
    return {
      type: AUDITORIA_ACTIONS.SET_ERROR,
      payload: error
    };
  },
  clearError: function clearError() {
    return {
      type: AUDITORIA_ACTIONS.CLEAR_ERROR
    };
  },
  setFiltros: function setFiltros(filtros) {
    return {
      type: AUDITORIA_ACTIONS.SET_FILTROS,
      payload: filtros
    };
  },
  setPaginacion: function setPaginacion(paginacion) {
    return {
      type: AUDITORIA_ACTIONS.SET_PAGINACION,
      payload: paginacion
    };
  },
  limpiarFiltros: function limpiarFiltros() {
    return {
      type: AUDITORIA_ACTIONS.LIMPIAR_FILTROS
    };
  },
  // Acciones síncronas para auditoría de usuarios
  setAuditoriasUsuarios: function setAuditoriasUsuarios(auditorias) {
    return {
      type: AUDITORIA_ACTIONS.SET_AUDITORIAS_USUARIOS,
      payload: auditorias
    };
  },
  setCargandoUsuarios: function setCargandoUsuarios(cargando) {
    return {
      type: AUDITORIA_ACTIONS.SET_CARGANDO_USUARIOS,
      payload: cargando
    };
  },
  setErrorUsuarios: function setErrorUsuarios(error) {
    return {
      type: AUDITORIA_ACTIONS.SET_ERROR_USUARIOS,
      payload: error
    };
  },
  // ============================================
  // Acciones asíncronas (Thunks)
  // ============================================

  // Acción asíncrona para cargar auditorías desde la API
  fetchAuditorias: function fetchAuditorias() {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(dispatch, getState) {
        var _state$auth, state, token, response, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              dispatch(auditoriaActions.setCargando(true));
              _context.p = 1;
              // Obtener el token del state de Redux
              state = getState();
              token = ((_state$auth = state.auth) === null || _state$auth === void 0 ? void 0 : _state$auth.token) || localStorage.getItem('authToken');
              if (token) {
                _context.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación disponible');
            case 2:
              _context.n = 3;
              return fetch('/api/Auditoria', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(token)
                }
              });
            case 3:
              response = _context.v;
              if (response.ok) {
                _context.n = 4;
                break;
              }
              throw new Error('Error al cargar auditorías');
            case 4:
              _context.n = 5;
              return response.json();
            case 5:
              data = _context.v;
              dispatch(auditoriaActions.setAuditorias(data));
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              console.error('Error al cargar auditorías:', _t);
              dispatch(auditoriaActions.setError(_t.message));
            case 7:
              _context.p = 7;
              dispatch(auditoriaActions.setCargando(false));
              return _context.f(7);
            case 8:
              return _context.a(2);
          }
        }, _callee, null, [[1, 6, 7, 8]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  },
  // Acción para filtrar auditorías con parámetros
  fetchAuditoriasByFilter: function fetchAuditoriasByFilter(filtros) {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(dispatch, getState) {
        var _state$auth2, state, token, params, response, data, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              dispatch(auditoriaActions.setCargando(true));
              _context2.p = 1;
              // Obtener el token del state de Redux
              state = getState();
              token = ((_state$auth2 = state.auth) === null || _state$auth2 === void 0 ? void 0 : _state$auth2.token) || localStorage.getItem('authToken');
              if (token) {
                _context2.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación disponible');
            case 2:
              params = new URLSearchParams();
              if (filtros.tipo) params.append('tipo', filtros.tipo);
              if (filtros.usuario) params.append('usuario', filtros.usuario);
              if (filtros.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
              if (filtros.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);
              if (filtros.busqueda) params.append('busqueda', filtros.busqueda);
              _context2.n = 3;
              return fetch("/api/Auditoria?".concat(params.toString()), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(token)
                }
              });
            case 3:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 4;
                break;
              }
              throw new Error('Error al cargar auditorías');
            case 4:
              _context2.n = 5;
              return response.json();
            case 5:
              data = _context2.v;
              dispatch(auditoriaActions.setAuditorias(data));
              _context2.n = 7;
              break;
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              console.error('Error al cargar auditorías con filtros:', _t2);
              dispatch(auditoriaActions.setError(_t2.message));
            case 7:
              _context2.p = 7;
              dispatch(auditoriaActions.setCargando(false));
              return _context2.f(7);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 6, 7, 8]]);
      }));
      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  // Acción asíncrona para cargar auditorías de usuarios desde la API
  fetchUsuariosAuditoria: function fetchUsuariosAuditoria() {
    var filtros = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(dispatch, getState) {
        var _state$auth3, state, token, params, usuarioId, queryString, response, errorText, data, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              dispatch(auditoriaActions.setCargandoUsuarios(true));
              _context3.p = 1;
              // Obtener el token del state de Redux
              state = getState();
              token = ((_state$auth3 = state.auth) === null || _state$auth3 === void 0 ? void 0 : _state$auth3.token) || localStorage.getItem('authToken');
              if (token) {
                _context3.n = 2;
                break;
              }
              throw new Error('No hay token de autenticación disponible');
            case 2:
              // Construir query string con filtros - debe coincidir con los parámetros del endpoint
              params = new URLSearchParams(); // Solo agregar parámetros si tienen valores válidos
              if (filtros.busqueda && filtros.busqueda.trim()) {
                params.append('busqueda', filtros.busqueda.trim());
              }
              if (filtros.tipo && filtros.tipo.trim()) {
                params.append('accion', filtros.tipo.trim());
              }
              if (filtros.fechaDesde && filtros.fechaDesde.trim()) {
                params.append('fechaDesde', filtros.fechaDesde.trim());
              }
              if (filtros.fechaHasta && filtros.fechaHasta.trim()) {
                params.append('fechaHasta', filtros.fechaHasta.trim());
              }
              if (filtros.usuario) {
                // Asegurarse de que sea un número válido
                usuarioId = parseInt(filtros.usuario);
                if (!isNaN(usuarioId)) {
                  params.append('usuarioId', usuarioId.toString());
                }
              }
              queryString = params.toString() ? "?".concat(params.toString()) : '';
              console.log('📋 Fetching auditorías de usuarios con URL:', "/api/Auditoria/usuarios".concat(queryString));
              _context3.n = 3;
              return fetch("/api/Auditoria/usuarios".concat(queryString), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer ".concat(token)
                }
              });
            case 3:
              response = _context3.v;
              if (response.ok) {
                _context3.n = 5;
                break;
              }
              _context3.n = 4;
              return response.text();
            case 4:
              errorText = _context3.v;
              console.error('❌ Error response:', errorText);
              throw new Error("Error ".concat(response.status, ": ").concat(response.statusText));
            case 5:
              _context3.n = 6;
              return response.json();
            case 6:
              data = _context3.v;
              console.log('✅ Auditorías de usuarios cargadas:', data.length, 'registros');
              dispatch(auditoriaActions.setAuditoriasUsuarios(data));
              _context3.n = 8;
              break;
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              console.error('❌ Error al cargar auditorías de usuarios:', _t3);
              dispatch(auditoriaActions.setErrorUsuarios(_t3.message));
            case 8:
              _context3.p = 8;
              dispatch(auditoriaActions.setCargandoUsuarios(false));
              return _context3.f(8);
            case 9:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 7, 8, 9]]);
      }));
      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }();
  }
};

// Hacer disponible globalmente
window.AuditoriaActions = auditoriaActions;
window.AuditoriaActions.TYPES = AUDITORIA_ACTIONS;
console.log('📋 Auditoria Actions cargadas correctamente con Thunks');