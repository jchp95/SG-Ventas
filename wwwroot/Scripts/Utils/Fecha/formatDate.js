"use strict";

// Fecha.jsx - Función global para formato de fechas

window.formatDate = function (fechaInput) {
  // Si la fecha es null, undefined o vacía, retornar string vacío
  if (!fechaInput) return '';
  try {
    // Convertir a objeto Date (maneja strings ISO, timestamps, objetos Date, etc.)
    var fecha = new Date(fechaInput);

    // Validar que sea una fecha válida
    if (isNaN(fecha.getTime())) {
      console.warn('Fecha inválida:', fechaInput);
      return '';
    }

    // Formatear a dd/mm/yyyy
    var dia = fecha.getDate().toString().padStart(2, '0');
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var anio = fecha.getFullYear();
    return "".concat(dia, "/").concat(mes, "/").concat(anio);
  } catch (error) {
    console.error('Error al formatear fecha:', error, 'Input:', fechaInput);
    return '';
  }
};