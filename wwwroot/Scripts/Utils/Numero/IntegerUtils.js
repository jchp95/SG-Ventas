"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Utilidades para el manejo y formateo de números enteros (cantidades, contadores)
 * Autor: Sistema de Ventas
 * Fecha: Octubre 2025
 */
var IntegerUtils = /*#__PURE__*/function () {
  function IntegerUtils() {
    _classCallCheck(this, IntegerUtils);
  }
  return _createClass(IntegerUtils, null, [{
    key: "formatear",
    value:
    /**
     * Función para formatear números enteros con separador de miles (coma)
     * @param {number|string} numero - El número a formatear
     * @returns {string} - El número formateado con comas
     * 
     * @example
     * IntegerUtils.formatear(1000) // "1,000"
     * IntegerUtils.formatear(1000000) // "1,000,000"
     * IntegerUtils.formatear("1234567") // "1,234,567"
     * IntegerUtils.formatear("abc") // "0"
     */
    function formatear(numero) {
      try {
        // Procesar entrada
        var valorLimpio;
        if (typeof numero === 'string') {
          // Si es string, limpiar caracteres no numéricos excepto signo negativo
          valorLimpio = numero.replace(/[^\d-]/g, '');
          valorLimpio = valorLimpio ? parseInt(valorLimpio) : 0;
        } else {
          valorLimpio = numero;
        }

        // Validar que sea un número entero válido
        if (!Number.isInteger(valorLimpio) || isNaN(valorLimpio)) {
          valorLimpio = 0;
        }

        // Formatear con comas usando toLocaleString
        return valorLimpio.toLocaleString('en-US');
      } catch (error) {
        console.error('Error en IntegerUtils.formatear:', error);
        return '0';
      }
    }
  }]);
}(); // Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IntegerUtils;
}

// Hacer disponible globalmente
window.IntegerUtils = IntegerUtils;