
window.formatCurrency = function(monto) {
    // Si el monto es null, undefined, vacío o no es número, retornar string vacío
    if (monto === null || monto === undefined || monto === '') return '';
    
    try {
        // Convertir a número
        const numero = typeof monto === 'string' ? parseFloat(monto) : Number(monto);
        
        // Validar que sea un número válido
        if (isNaN(numero)) {
            console.warn('Monto inválido para formatear:', monto);
            return '';
        }
        
        // Formatear el número: 1,000.00
        return numero.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
    } catch (error) {
        console.error('Error al formatear moneda:', error, 'Input:', monto);
        return '';
    }
};