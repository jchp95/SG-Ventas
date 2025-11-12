/**
 * Componente de Toasts usando SweetAlert2
 * Sistema mejorado que funciona tanto con Redux como sin él
 */
const Toasts = () => {
    const {notificaciones, eliminarNotificacion} = window.ReduxProvider.useApp();

    React.useEffect(() => {
        // Procesar notificaciones pendientes
        notificaciones.forEach((notificacion) => {
            if (!notificacion.mostrada) {
                mostrarToast(notificacion);

                // Eliminar después del timer si tiene autoClose
                if (notificacion.autoClose) {
                    setTimeout(() => {
                        eliminarNotificacion(notificacion.id);
                    }, notificacion.duracion || 3000);
                }
            }
        });
    }, [notificaciones, eliminarNotificacion]);

    const mostrarToast = (notificacion) => {
        // Colores y títulos según tipo
        const config = {
            success: {icon: 'success', title: 'Éxito', color: '#198754'},
            warning: {icon: 'warning', title: 'Advertencia', color: '#ffc107'},
            info: {icon: 'info', title: 'Información', color: '#0dcaf0'},
            error: {icon: 'error', title: 'Error', color: '#dc3545'}
        };

        const c = config[notificacion.tipo] || config.info;

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
                didClose: () => {
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
    show: function (type, message, title = null, duracion = 3000) {
        console.log('🔔 ToastUtils.show llamado:', {type, message, title});

        // Intentar usar SweetAlert2 directamente como fallback principal
        if (!window.Swal) {
            console.error('❌ SweetAlert2 no está disponible');
            // Fallback a alert nativo
            alert(`${title || type.toUpperCase()}: ${message}`);
            return;
        }

        const config = {
            success: {icon: 'success', title: 'Éxito', color: '#198754'},
            warning: {icon: 'warning', title: 'Advertencia', color: '#ffc107'},
            info: {icon: 'info', title: 'Información', color: '#0dcaf0'},
            error: {icon: 'error', title: 'Error', color: '#dc3545'}
        };

        const c = config[type] || config.info;

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
                const notificacion = {
                    tipo: type,
                    mensaje: message,
                    titulo: title,
                    duracion: duracion,
                    autoClose: true,
                    id: Date.now() + Math.random(),
                    mostrada: true // Marcar como ya mostrada para evitar duplicados
                };

                window.ReduxStore.store.dispatch(
                    window.ReduxStore.app.agregarNotificacion(notificacion)
                );
            }
        } catch (error) {
            console.warn('No se pudo agregar notificación a Redux:', error);
        }
    },

    // Método para mostrar errores específicos
    error: function (message, title = 'Error') {
        this.show('error', message, title);
    },

    // Método para mostrar éxitos específicos
    success: function (message, title = 'Éxito') {
        this.show('success', message, title);
    },

    // Método para mostrar advertencias
    warning: function (message, title = 'Advertencia') {
        this.show('warning', message, title);
    },

    // Método para mostrar información
    info: function (message, title = 'Información') {
        this.show('info', message, title);
    }
};

// Mantener compatibilidad
window.Toasts = Toasts;

console.log('✅ ToastUtils configurado correctamente');
