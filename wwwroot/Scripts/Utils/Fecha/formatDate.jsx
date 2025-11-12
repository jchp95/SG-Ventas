// En Fecha.jsx - Modificar la función
window.formatDate = function(fechaInput, horaInput = '') {
    if (!fechaInput) return '';
    try {
        let dia, mes, anio, hora = '';
        let fechaStr = fechaInput;
        // Si viene en formato yyyy-MM-dd o yyyy-MM-ddTHH:mm:ss
        let match = fechaStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}):(\d{2}))?/);
        if (match) {
            anio = match[1];
            mes = match[2];
            dia = match[3];
            if (match[4] && match[5] && match[6]) {
                hora = `${match[4]}:${match[5]}:${match[6]}`;
            }
        } else {
            // Fallback: usar Date para otros formatos
            const fecha = new Date(fechaInput);
            if (isNaN(fecha.getTime())) {
                console.warn('Fecha inválida:', fechaInput);
                return '';
            }
            dia = fecha.getDate().toString().padStart(2, '0');
            mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            anio = fecha.getFullYear();
        }
        let fechaFormateada = `${dia}/${mes}/${anio}`;
        // Prioridad: si horaInput viene de la BD, úsalo; si no, usa el extraído
        if (horaInput) {
            fechaFormateada += ` ${horaInput}`;
        } else if (hora) {
            fechaFormateada += ` ${hora}`;
        }
        return fechaFormateada.trim();
    } catch (error) {
        console.error('Error al formatear fecha:', error, 'Input:', fechaInput);
        return '';
    }
};