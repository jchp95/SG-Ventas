"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Reducer para la gestión de auditoría
 */

var auditoriaReducer = function auditoriaReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    lista: [],
    cargando: false,
    error: null,
    filtros: {
      tipo: '',
      usuario: '',
      fechaDesde: '',
      fechaHasta: '',
      busqueda: ''
    },
    paginacion: {
      paginaActual: 0,
      elementosPorPagina: 15,
      totalElementos: 0
    },
    // Estado para auditoría de usuarios
    usuarios: {
      lista: [],
      cargando: false,
      error: null
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var TYPES = window.AuditoriaActions.TYPES;
  switch (action.type) {
    case TYPES.SET_AUDITORIAS:
      return _objectSpread(_objectSpread({}, state), {}, {
        lista: action.payload,
        cargando: false,
        error: null,
        paginacion: _objectSpread(_objectSpread({}, state.paginacion), {}, {
          totalElementos: action.payload.length
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
        filtros: _objectSpread(_objectSpread({}, state.filtros), action.payload),
        paginacion: _objectSpread(_objectSpread({}, state.paginacion), {}, {
          paginaActual: 0 // Resetear página al cambiar filtros
        })
      });
    case TYPES.SET_PAGINACION:
      return _objectSpread(_objectSpread({}, state), {}, {
        paginacion: _objectSpread(_objectSpread({}, state.paginacion), action.payload)
      });
    case TYPES.LIMPIAR_FILTROS:
      return _objectSpread(_objectSpread({}, state), {}, {
        filtros: {
          tipo: '',
          usuario: '',
          fechaDesde: '',
          fechaHasta: '',
          busqueda: ''
        },
        paginacion: _objectSpread(_objectSpread({}, state.paginacion), {}, {
          paginaActual: 0
        })
      });

    // Casos para auditoría de usuarios
    case TYPES.SET_AUDITORIAS_USUARIOS:
      return _objectSpread(_objectSpread({}, state), {}, {
        usuarios: _objectSpread(_objectSpread({}, state.usuarios), {}, {
          lista: action.payload,
          cargando: false,
          error: null
        })
      });
    case TYPES.SET_CARGANDO_USUARIOS:
      return _objectSpread(_objectSpread({}, state), {}, {
        usuarios: _objectSpread(_objectSpread({}, state.usuarios), {}, {
          cargando: action.payload
        })
      });
    case TYPES.SET_ERROR_USUARIOS:
      return _objectSpread(_objectSpread({}, state), {}, {
        usuarios: _objectSpread(_objectSpread({}, state.usuarios), {}, {
          error: action.payload,
          cargando: false
        })
      });
    default:
      return state;
  }
};

// Hacer disponible globalmente
window.AuditoriaReducer = auditoriaReducer;
console.log('📋 Auditoria Reducer cargado correctamente');
// FIN: Reducer de Auditoría

// Nota: Las Actions de Auditoría se definen en ~/Scripts/Redux/Actions/auditoriaActions.js
// para evitar duplicación y garantizar el envío del token en los headers.