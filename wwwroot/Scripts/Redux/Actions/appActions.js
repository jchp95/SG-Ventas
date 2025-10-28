"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Actions para la gestión del estado global de la aplicación
 */

// Action Types
var APP_ACTIONS = {
  TOGGLE_SIDEBAR: 'app/toggleSidebar',
  SET_SIDEBAR_ABIERTO: 'app/setSidebarAbierto',
  SET_TEMA: 'app/setTema',
  SET_USUARIO: 'app/setUsuario',
  AGREGAR_NOTIFICACION: 'app/agregarNotificacion',
  ELIMINAR_NOTIFICACION: 'app/eliminarNotificacion',
  SET_CARGANDO_GLOBAL: 'app/setCargandoGlobal'
};

// Action Creators
var appActions = {
  toggleSidebar: function toggleSidebar() {
    return {
      type: APP_ACTIONS.TOGGLE_SIDEBAR
    };
  },
  setSidebarAbierto: function setSidebarAbierto(abierto) {
    return {
      type: APP_ACTIONS.SET_SIDEBAR_ABIERTO,
      payload: abierto
    };
  },
  setTema: function setTema(tema) {
    return {
      type: APP_ACTIONS.SET_TEMA,
      payload: tema
    };
  },
  setUsuario: function setUsuario(usuario) {
    return {
      type: APP_ACTIONS.SET_USUARIO,
      payload: usuario
    };
  },
  agregarNotificacion: function agregarNotificacion(notificacion) {
    return {
      type: APP_ACTIONS.AGREGAR_NOTIFICACION,
      payload: notificacion
    };
  },
  eliminarNotificacion: function eliminarNotificacion(id) {
    return {
      type: APP_ACTIONS.ELIMINAR_NOTIFICACION,
      payload: id
    };
  },
  setCargandoGlobal: function setCargandoGlobal(cargando) {
    return {
      type: APP_ACTIONS.SET_CARGANDO_GLOBAL,
      payload: cargando
    };
  }
};

// Hacer disponible globalmente
window.AppActions = _objectSpread({
  TYPES: APP_ACTIONS
}, appActions);
console.log('⚙️ App Actions cargadas correctamente');