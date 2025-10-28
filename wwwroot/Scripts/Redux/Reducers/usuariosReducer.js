"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Reducer para la gestión de usuarios
 */

var usuariosReducer = function usuariosReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    lista: [],
    cargando: false,
    error: null,
    filtros: {
      busqueda: '',
      estado: 'todos'
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var TYPES = window.UsuariosActions.TYPES;
  switch (action.type) {
    case TYPES.SET_USUARIOS:
      return _objectSpread(_objectSpread({}, state), {}, {
        lista: action.payload,
        cargando: false,
        error: null
      });
    case TYPES.AGREGAR_USUARIO:
      return _objectSpread(_objectSpread({}, state), {}, {
        lista: [].concat(_toConsumableArray(state.lista), [action.payload])
      });
    case TYPES.ACTUALIZAR_USUARIO:
      return _objectSpread(_objectSpread({}, state), {}, {
        lista: state.lista.map(function (u) {
          return u.id === action.payload.id ? _objectSpread(_objectSpread({}, u), action.payload) : u;
        })
      });
    case TYPES.ELIMINAR_USUARIO:
      return _objectSpread(_objectSpread({}, state), {}, {
        lista: state.lista.filter(function (u) {
          return u.id !== action.payload;
        })
      });
    case TYPES.SET_CARGANDO:
      return _objectSpread(_objectSpread({}, state), {}, {
        cargando: action.payload
      });
    case TYPES.SET_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        error: action.payload,
        cargando: false
      });
    case TYPES.SET_FILTROS:
      return _objectSpread(_objectSpread({}, state), {}, {
        filtros: _objectSpread(_objectSpread({}, state.filtros), action.payload)
      });
    default:
      return state;
  }
};

// Hacer disponible globalmente
window.UsuariosReducer = usuariosReducer;
console.log('👥 Usuarios Reducer cargado correctamente');