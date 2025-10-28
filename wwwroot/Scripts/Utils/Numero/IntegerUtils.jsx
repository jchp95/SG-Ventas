/**
 * Utilidades para el manejo y formateo de números enteros (cantidades, contadores)
 * Autor: Sistema de Ventas
 * Fecha: Octubre 2025
 */

class IntegerUtils {
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
    static formatear(numero) {
        try {
            // Procesar entrada
            let valorLimpio;
            
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
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegerUtils;
}

// Hacer disponible globalmente
window.IntegerUtils = IntegerUtils;
