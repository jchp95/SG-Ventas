"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  }
};

// Hacer disponible globalmente
window.UsuariosActions = _objectSpread({
  TYPES: USUARIOS_ACTIONS
}, usuariosActions);
console.log('👥 Usuarios Actions cargadas correctamente');