"use strict";

/**
 * Componente de Toasts usando SweetAlert2
 * Sistema mejorado que funciona tanto con Redux como sin él
 */
var Toasts = function Toasts() {
  var _window$ReduxProvider = window.ReduxProvider.useApp(),
    notificaciones = _window$ReduxProvider.notificaciones,
    eliminarNotificacion = _window$ReduxProvider.eliminarNotificacion;
  React.useEffect(function () {
    // Procesar notificaciones pendientes
    notificaciones.forEach(function (notificacion) {
      if (!notificacion.mostrada) {
        mostrarToast(notificacion);

        // Eliminar después del timer si tiene autoClose
        if (notificacion.autoClose) {
          setTimeout(function () {
            eliminarNotificacion(notificacion.id);
          }, notificacion.duracion || 3000);
        }
      }
    });
  }, [notificaciones, eliminarNotificacion]);
  var mostrarToast = function mostrarToast(notificacion) {
    // Colores y títulos según tipo
    var config = {
      success: {
        icon: 'success',
        title: 'Éxito',
        color: '#198754'
      },
      warning: {
        icon: 'warning',
        title: 'Advertencia',
        color: '#ffc107'
      },
      info: {
        icon: 'info',
        title: 'Información',
        color: '#0dcaf0'
      },
      error: {
        icon: 'error',
        title: 'Error',
        color: '#dc3545'
      }
    };
    var c = config[notificacion.tipo] || config.info;
    if (window.Swal) {
      window.Swal.fire({
        toast: true,
        position: 'top-end',
        icon: c.icon,
        title: notificacion.titulo || c.title,
        text: notificacion.mensaje,
        showConfirmButton: false,
        timer: notificacion.duracion || 3000,
        timerProgressBar: true,
        background: '#fff',
        color: c.color,
        customClass: {
          popup: 'swal2-toast'
        },
        didClose: function didClose() {
          // Marcar como mostrada
          if (notificacion.autoClose) {
            eliminarNotificacion(notificacion.id);
          }
        }
      });
    } else {
      console.error('SweetAlert2 no está disponible');
    }
  };
  return null; // Este componente no renderiza nada visible
};

// Sistema de notificaciones mejorado con fallback directo a SweetAlert2
window.ToastUtils = {
  show: function show(type, message) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var duracion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3000;
    console.log('🔔 ToastUtils.show llamado:', {
      type: type,
      message: message,
      title: title
    });

    // Intentar usar SweetAlert2 directamente como fallback principal
    if (!window.Swal) {
      console.error('❌ SweetAlert2 no está disponible');
      // Fallback a alert nativo
      alert("".concat(title || type.toUpperCase(), ": ").concat(message));
      return;
    }
    var config = {
      success: {
        icon: 'success',
        title: 'Éxito',
        color: '#198754'
      },
      warning: {
        icon: 'warning',
        title: 'Advertencia',
        color: '#ffc107'
      },
      info: {
        icon: 'info',
        title: 'Información',
        color: '#0dcaf0'
      },
      error: {
        icon: 'error',
        title: 'Error',
        color: '#dc3545'
      }
    };
    var c = config[type] || config.info;

    // Mostrar directamente con SweetAlert2
    window.Swal.fire({
      toast: true,
      position: 'top-end',
      icon: c.icon,
      title: title || c.title,
      text: message,
      showConfirmButton: false,
      timer: duracion,
      timerProgressBar: true,
      background: '#fff',
      color: c.color,
      customClass: {
        popup: 'swal2-toast'
      }
    });

    // También intentar agregar a Redux si está disponible (para mantener historial)
    try {
      if (window.ReduxStore && window.ReduxStore.store && window.ReduxStore.app) {
        var notificacion = {
          tipo: type,
          mensaje: message,
          titulo: title,
          duracion: duracion,
          autoClose: true,
          id: Date.now() + Math.random(),
          mostrada: true // Marcar como ya mostrada para evitar duplicados
        };
        window.ReduxStore.store.dispatch(window.ReduxStore.app.agregarNotificacion(notificacion));
      }
    } catch (error) {
      console.warn('No se pudo agregar notificación a Redux:', error);
    }
  },
  // Método para mostrar errores específicos
  error: function error(message) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
    this.show('error', message, title);
  },
  // Método para mostrar éxitos específicos
  success: function success(message) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Éxito';
    this.show('success', message, title);
  },
  // Método para mostrar advertencias
  warning: function warning(message) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Advertencia';
    this.show('warning', message, title);
  },
  // Método para mostrar información
  info: function info(message) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Información';
    this.show('info', message, title);
  }
};

// Mantener compatibilidad
window.Toasts = Toasts;
console.log('✅ ToastUtils configurado correctamente');