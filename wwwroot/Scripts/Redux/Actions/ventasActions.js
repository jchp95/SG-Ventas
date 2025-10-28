"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Actions para la gestión de ventas
 */

// Action Types
var VENTAS_ACTIONS = {
  SET_VENTAS: 'ventas/setVentas',
  AGREGAR_VENTA: 'ventas/agregarVenta',
  SET_RESUMEN: 'ventas/setResumen',
  SET_CARGANDO: 'ventas/setCargando',
  SET_ERROR: 'ventas/setError'
};

// Action Creators
var ventasActions = {
  setVentas: function setVentas(ventas) {
    return {
      type: VENTAS_ACTIONS.SET_VENTAS,
      payload: ventas
    };
  },
  agregarVenta: function agregarVenta(venta) {
    return {
      type: VENTAS_ACTIONS.AGREGAR_VENTA,
      payload: venta
    };
  },
  setResumen: function setResumen(resumen) {
    return {
      type: VENTAS_ACTIONS.SET_RESUMEN,
      payload: resumen
    };
  },
  setCargando: function setCargando(cargando) {
    return {
      type: VENTAS_ACTIONS.SET_CARGANDO,
      payload: cargando
    };
  },
  setError: function setError(error) {
    return {
      type: VENTAS_ACTIONS.SET_ERROR,
      payload: error
    };
  }
};

// Hacer disponible globalmente
window.VentasActions = _objectSpread({
  TYPES: VENTAS_ACTIONS
}, ventasActions);
console.log('💰 Ventas Actions cargadas correctamente');