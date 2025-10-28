"use strict";

/**
 * Componente de Toasts usando Redux y SweetAlert2
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
  };
  return null; // Este componente no renderiza nada visible
};

// Mantener compatibilidad con la API anterior
window.Toasts = Toasts;
window.ToastUtils = {
  show: function show(type, message) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var duracion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3000;
    if (window.ReduxProvider && window.ReduxProvider.useApp) {
      // Si Redux está disponible, usar el store
      var notificacion = {
        tipo: type,
        mensaje: message,
        titulo: title,
        duracion: duracion,
        autoClose: true,
        id: Date.now() + Math.random()
      };

      // Necesitamos acceso al dispatch desde fuera del componente
      if (window.ReduxStore && window.ReduxStore.store) {
        window.ReduxStore.store.dispatch(window.ReduxStore.app.agregarNotificacion(notificacion));
      }
    } else {
      // Fallback al método original
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
    }
  }
};